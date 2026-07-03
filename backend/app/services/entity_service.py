import json
import os
import re

ENTITY_FILE = "entities.json"


class EntityService:
    def __init__(self):
        if not os.path.exists(ENTITY_FILE):
            with open(ENTITY_FILE, "w") as f:
                json.dump([], f)

    def extract_entities(self, text: str):
        entities = set()

        patterns = [
            # Multi-word names first
            r"\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)+\b",

            # Technologies like Next.js, FastAPI, TypeScript
            r"\b[A-Z][A-Za-z0-9.+#-]*\b",
        ]

        for pattern in patterns:
            entities.update(re.findall(pattern, text))

        # Remove duplicates while keeping longest match
        entities = sorted(entities, key=len, reverse=True)

        filtered = []

        for entity in entities:
            entity = entity.strip()

            if not entity:
                continue

            # Skip if already contained in a longer entity
            if any(entity.lower() in existing.lower() for existing in filtered):
                continue

            filtered.append(entity)

        return sorted(filtered)

    def save(self, entities):
            with open(ENTITY_FILE, "r") as f:
                existing = set(json.load(f))

            existing.update(entities)

            with open(ENTITY_FILE, "w") as f:
                json.dump(sorted(existing), f, indent=2)

    def load(self):
        with open(ENTITY_FILE, "r") as f:
            return json.load(f)


entity_service = EntityService()