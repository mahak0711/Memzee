import json
import re

import google.generativeai as genai

from app.config import settings

genai.configure(api_key=settings.LLM_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


SYSTEM_PROMPT = """
You are a Knowledge Graph Extraction engine.

Extract ALL knowledge triples.

For every entity assign a semantic type.

Allowed types:

Person
Project
Framework
Technology
Database
Platform
Organization
Language
Company
Tool
Library
API
Concept
Location
Event
Other

Return ONLY JSON.

{
  "triples":[
    {
      "subject":{
        "name":"",
        "type":""
      },
      "relation":"",
      "object":{
        "name":"",
        "type":""
      }
    }
  ]
}
"""


class KnowledgeExtractor:

    async def extract(self, text: str):

        response = model.generate_content(
            SYSTEM_PROMPT + "\n\n" + text
        )

        output = response.text.strip()

        output = re.sub(r"```json", "", output)
        output = re.sub(r"```", "", output)

        return json.loads(output)


knowledge_extractor = KnowledgeExtractor()