import cognee
from fastapi import HTTPException
from app.services.entity_service import entity_service
from app.config import settings

from pprint import pprint

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

    async def remember(self, content: str):
        await self.connect()

        try:
            # remember() already performs the ingestion pipeline
            # (graph building + indexing + improve)
            await cognee.remember(
            content,
            dataset_name=settings.MEMZEE_DATASET,
            )

            entities = entity_service.extract_entities(content)
            entity_service.save(entities)

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

    async def recall(self, query: str):
        await self.connect()

        try:
            results = await cognee.recall(
                query_text=query,
                datasets=[settings.MEMZEE_DATASET],
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
                "dataset": settings.MEMZEE_DATASET,
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

    async def graph(self):
        await self.connect()

        queries = entity_service.load()
        print(queries)

        nodes = {}
        edges = {}
        edge_count = 0
        queries = [
            q for q in queries
            if q not in {"My", "I", "Me"}
        ]

        for query in queries:
            try:
                results = await cognee.search(
                    query_text=query,
                    query_type=cognee.SearchType.GRAPH_COMPLETION,
                    datasets=[settings.MEMZEE_DATASET],
                    verbose=True,
                )

                if not results:
                    continue

                result = results[0]

                objects = (
                    result.get("objects_result")
                    if isinstance(result, dict)
                    else getattr(result, "objects_result", None)
                )

                if not objects:
                    print(f"No graph returned for '{query}'")
                    continue

                for relation in objects:

                    for key in ["node1", "node2"]:

                        node = relation[key]

                        node_id = node["node_id"]

                        if node_id not in nodes:

                            attrs = node["node_attributes"]

                            nodes[node_id] = {
                                "id": node_id,
                                "title": attrs.get("name")
                                or attrs.get("text")
                                or node_id,
                                "category": attrs.get("type", "Unknown"),
                            }

                    edge_key = (
                        relation["node1"]["node_id"],
                        relation["node2"]["node_id"],
                        relation["attributes"].get(
                            "relationship_name",
                            ""
                        ),
                    )

                    if edge_key not in edges:

                        edges[edge_key] = {
                            "id": f"edge-{edge_count}",
                            "source": relation["node1"]["node_id"],
                            "target": relation["node2"]["node_id"],
                            "relation": relation["attributes"].get(
                                "relationship_name",
                                "",
                            ),
                        }

                        edge_count += 1

            except Exception as e:
                print(f"Search '{query}' failed:", e)
            
        IGNORE = {
            "EntityType",
            "DocumentChunk",
            "TextSummary",
            "TextDocument",
        }

        filtered_nodes = {
            node["id"]: node
            for node in nodes.values()
            if node["category"] not in IGNORE
        }

        filtered_edges = [
            edge
            for edge in edges.values()
            if edge["source"] in filtered_nodes
            and edge["target"] in filtered_nodes
        ]

        return {
            "nodes": list(filtered_nodes.values()),
            "edges": filtered_edges,
        }

        

 
cognee_service = CogneeService()