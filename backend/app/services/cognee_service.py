import backend.app.services.cognee_service as cognee_service

from app.config import settings


class CogneeService:
    def __init__(self):
        self.connected = False

    async def connect(self):
        if not self.connected:
            await cognee_service.serve(
                url=settings.COGNEE_SERVICE_URL,
                api_key=settings.COGNEE_API_KEY,
            )
            self.connected = True

    async def disconnect(self):
        if self.connected:
            await cognee_service.disconnect()
            self.connected = False

    async def remember(self, content: str):
        await self.connect()

        await cognee_service.remember(
            content,
            dataset_name=settings.MEMZEE_DATASET,
        )

        return True


cognee_service = CogneeService()