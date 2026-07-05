from youtube_transcript_api import YouTubeTranscriptApi
import re


class YouTubeService:

    def get_video_id(self, url: str):
        match = re.search(
            r"(?:v=|youtu\.be/)([^&?/]+)",
            url,
        )

        if not match:
            raise Exception("Invalid YouTube URL")

        return match.group(1)

    def fetch_transcript(self, url: str):

        video_id = self.get_video_id(url)

        ytt_api = YouTubeTranscriptApi()

        transcript = ytt_api.fetch(video_id)

        return " ".join(
            snippet.text for snippet in transcript.snippets
        )


youtube_service = YouTubeService()