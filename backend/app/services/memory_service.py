import json
import os
from datetime import datetime
from uuid import uuid4

MEMORY_FILE = "data/memories.json"


class MemoryService:

    def __init__(self):
        os.makedirs("data", exist_ok=True)

        if not os.path.exists(MEMORY_FILE):
            with open(MEMORY_FILE, "w") as f:
                json.dump([], f)

    def add(self, content: str):

        with open(MEMORY_FILE, "r") as f:
            memories = json.load(f)

        memories.insert(
            0,
            {
                "id": str(uuid4()),
                "content": content,
                "created_at": datetime.utcnow().isoformat(),
            },
        )

        with open(MEMORY_FILE, "w") as f:
            json.dump(memories, f, indent=2)

    def delete(self, memory_id: str):

        with open(MEMORY_FILE, "r") as f:
            memories = json.load(f)

        memories = [
            m
            for m in memories
            if m["id"] != memory_id
        ]

        with open(MEMORY_FILE, "w") as f:
            json.dump(memories, f, indent=2)

        return True


    def load(self):

        with open(MEMORY_FILE, "r") as f:
            return json.load(f)


memory_service = MemoryService()