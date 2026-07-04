import re


class RelationService:

    def extract(self, text: str):
        triples = []

        patterns = [
            (r"(.+?) uses (.+)", "uses"),
            (r"(.+?) is using (.+)", "uses"),
            (r"(.+?) builds (.+)", "builds"),
            (r"(.+?) is building (.+)", "builds"),
            (r"(.+?) will deploy (.+)", "will_deploy"),
            (r"(.+?) deploys (.+)", "deploys"),
            (r"(.+?) is hosted on (.+)", "hosted_on"),
            (r"(.+?) likes (.+)", "likes"),
            (r"(.+?) enjoys (.+)", "enjoys"),
        ]

        for pattern, relation in patterns:

            matches = re.findall(
                pattern,
                text,
                flags=re.IGNORECASE,
            )

            for subject, obj in matches:

                triples.append({
                    "subject": subject.strip(),
                    "relation": relation,
                    "object": obj.strip().rstrip("."),
                })

        return triples


relation_service = RelationService()