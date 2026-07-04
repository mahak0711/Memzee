import base64
import requests


class GitHubService:

    def fetch_readme(self, repo_url: str) -> str:
        """
        Fetch README.md content from a public GitHub repository.
        """

        parts = repo_url.rstrip("/").split("/")

        if len(parts) < 5:
            raise ValueError("Invalid GitHub repository URL.")

        owner = parts[-2]
        repo = parts[-1]

        api_url = f"https://api.github.com/repos/{owner}/{repo}/readme"

        response = requests.get(
            api_url,
            headers={
                "Accept": "application/vnd.github+json"
            },
            timeout=20,
        )

        if response.status_code != 200:
            raise ValueError("Unable to fetch README.")

        data = response.json()

        content = base64.b64decode(
            data["content"]
        ).decode("utf-8")

        return content


github_service = GitHubService()