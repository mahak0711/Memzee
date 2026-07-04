import json
import os

TRIPLE_FILE = "data/triples.json"


class TripleService:

    def __init__(self):
        os.makedirs("data", exist_ok=True)

        if not os.path.exists(TRIPLE_FILE):
            with open(TRIPLE_FILE, "w") as f:
                json.dump([], f)

    def save(self, triples):

        with open(TRIPLE_FILE, "r") as f:
            existing = json.load(f)

        existing.extend(triples)

        unique = []
        seen = set()

        for t in existing:

            key = (
                t["subject"]["name"].lower(),
                t["subject"]["type"],
                t["relation"].lower(),
                t["object"]["name"].lower(),
                t["object"]["type"],
            )

            if key not in seen:
                seen.add(key)
                unique.append(t)

        with open(TRIPLE_FILE, "w") as f:
            json.dump(unique, f, indent=2)

    def load(self):

        with open(TRIPLE_FILE, "r") as f:
            return json.load(f)


triple_service = TripleService()