import cognee
from fastapi import HTTPException
from app.config import settings
from app.services.knowledge_extractor import knowledge_extractor
from app.services.triple_service import triple_service
from app.services.memory_service import memory_service
class CogneeService:
    def __init__(self):
        self.connected = False

    async def connect(self):
        if self.connected:
            return

        await cognee.serve(
            url=settings.COGNEE_SERVICE_URL,
            api_key=settings.COGNEE_API_KEY,
        )

        self.connected = True

    async def remember(self, content: str,
                       dataset: str):
        await self.connect()

        try:
            # remember() already performs the ingestion pipeline
            # (graph building + indexing + improve)
            await cognee.remember(
            content,
            dataset_name=dataset,
            )
            memory_service.add(content,dataset)

            triples = await knowledge_extractor.extract(content)

            print("Extracted Triples:")
            print(triples)

            triple_service.save(triples["triples"],dataset)

            return {
                "success": True,
                "message": "Memory stored successfully",
            }
        except Exception as e:
            print("Cognee remember failed:")
            print(repr(e))

            raise HTTPException(
                status_code=502,
                detail=str(e),
            )

    async def recall(self, query: str,dataset:str):
        await self.connect()

        try:
            results = await cognee.recall(
                query_text=query,
                datasets=[dataset],
            )

        except Exception as e:
            raise HTTPException(
                status_code=502,
                detail=str(e),
            )

        if not results:
            return {
                "answer": "I couldn't find anything related to that.",
                "kind": "",
                "search_type": "",
                "dataset": dataset,
                "source": "",
            }

        result = results[0]

        if isinstance(result, dict):
            return {
                "answer": result.get("text", ""),
                "kind": result.get("kind", ""),
                "search_type": result.get("search_type", ""),
                "dataset": result.get("dataset_name", ""),
                "source": result.get("source", ""),
            }

        return {
            "answer": getattr(result, "text", ""),
            "kind": getattr(result, "kind", ""),
            "search_type": getattr(result, "search_type", ""),
            "dataset": getattr(result, "dataset_name", ""),
            "source": getattr(result, "source", ""),
        }

    async def list_memories(self):
        await self.connect()
        return []

    async def graph(self,dataset:str):
        triples = triple_service.load(dataset)

        nodes = {}
        edges = []

        def node_id(name: str):
            return name.lower().strip().replace(" ", "-")

        for index, triple in enumerate(triples):
            subject = triple["subject"]["name"]
            subject_type = triple["subject"]["type"]

            obj = triple["object"]["name"]
            obj_type = triple["object"]["type"] 
            relation = triple["relation"]

            subject_id = node_id(subject)
            object_id = node_id(obj)

            if subject_id not in nodes:
                nodes[subject_id] = {
                    "id": subject_id,
                    "title": subject,
                    "category": subject_type,
                }

            if object_id not in nodes:
                nodes[object_id] = {
                    "id": object_id,
                    "title": obj,
                    "category": obj_type,
                }

            edges.append({
                "id": f"edge-{index}",
                "source": subject_id,
                "target": object_id,
                "relation": relation,
            })

        return {
            "nodes": list(nodes.values()),
            "edges": edges,
        }


    async def forget(
        self,
        memory_id: str,
        dataset: str,
    ):
        memory_service.delete(
            memory_id,
            dataset,
        )

        triple_service.clear(dataset)

        memories = memory_service.load(dataset)

        for m in memories:
            await self.remember(
                m["content"],
                dataset,
            )

        return {"success": True}
    
cognee_service = CogneeService()