import json
import os
from datetime import datetime
from uuid import uuid4


class MemoryService:

    def _file(self, dataset: str):
        folder = os.path.join("data", dataset)
        os.makedirs(folder, exist_ok=True)

        file = os.path.join(folder, "memories.json")

        if not os.path.exists(file):
            with open(file, "w") as f:
                json.dump([], f)

        return file

    def add(self, content: str, dataset: str):
        file = self._file(dataset)

        with open(file, "r") as f:
            memories = json.load(f)

        memories.insert(
            0,
            {
                "id": str(uuid4()),
                "content": content,
                "created_at": datetime.utcnow().isoformat(),
            },
        )

        with open(file, "w") as f:
            json.dump(memories, f, indent=2)

    def delete(self, memory_id: str, dataset: str):
        file = self._file(dataset)

        with open(file, "r") as f:
            memories = json.load(f)

        memories = [
            m for m in memories
            if m["id"] != memory_id
        ]

        with open(file, "w") as f:
            json.dump(memories, f, indent=2)

    def load(self, dataset: str):
        file = self._file(dataset)

        with open(file, "r") as f:
            return json.load(f)


memory_service = MemoryService()