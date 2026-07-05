import json
import os


class TripleService:

    def _file(self, dataset: str):
        folder = os.path.join("data", dataset)
        os.makedirs(folder, exist_ok=True)

        file = os.path.join(folder, "triples.json")

        if not os.path.exists(file):
            with open(file, "w") as f:
                json.dump([], f)

        return file

    def save(self, triples, dataset: str):
        file = self._file(dataset)

        with open(file, "r") as f:
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

        with open(file, "w") as f:
            json.dump(unique, f, indent=2)

    def load(self, dataset: str):
        file = self._file(dataset)

        with open(file, "r") as f:
            return json.load(f)

    def clear(self, dataset: str):
        file = self._file(dataset)

        with open(file, "w") as f:
            json.dump([], f)


triple_service = TripleService()