from supadata import Supadata, SupadataError
from app.config import settings


class YouTubeService:

    def __init__(self):
        self.client = Supadata(
            api_key=settings.SUPADATA_API_KEY
        )

    def fetch_transcript(self, url: str) -> str:
        try:
            transcript = self.client.transcript(
                url=url,
                text=True,
                mode="auto",
            )

            if hasattr(transcript, "content"):
                return transcript.content

            raise Exception(
                "Transcript is still processing."
            )

        except SupadataError as e:
            raise Exception(e.message)


youtube_service = YouTubeService()