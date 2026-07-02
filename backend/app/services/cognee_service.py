import cognee

from app.config import settings


class CogneeService:
    def __init__(self):
        self.connected = False

    async def connect(self):
        if not self.connected:
            await cognee.serve(
                url=settings.COGNEE_SERVICE_URL,
                api_key=settings.COGNEE_API_KEY,
            )
            self.connected = True

    async def remember(self, content: str):
        await self.connect()

        await cognee.remember(
            content,
            dataset_name=settings.MEMZEE_DATASET,
        )

        return {
            "success": True,
            "message": "Memory stored successfully",
        }

    async def recall(self, query: str):
        await self.connect()

        results = await cognee.recall(
            query_text=query,
        )

        return results


cognee_service = CogneeService()