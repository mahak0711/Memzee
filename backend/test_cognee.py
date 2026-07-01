import asyncio
import cognee
from dotenv import load_dotenv

load_dotenv()

async def main():
    await cognee.forget(everything=True)

    await cognee.remember(
        "Memzee is an observability platform for AI memory. It helps developers inspect, debug, and evolve memory."
    )

    results = await cognee.recall(
        query_text="What is Memzee?"
    )

    for result in results:
        print(result.text)

if __name__ == "__main__":
    asyncio.run(main())