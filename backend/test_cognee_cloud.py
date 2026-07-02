import asyncio
import os

from dotenv import load_dotenv
import cognee

load_dotenv()


async def main():

    client = await cognee.serve(
        url=os.getenv("COGNEE_SERVICE_URL"),
        api_key=os.getenv("COGNEE_API_KEY"),
    )

    print("Connected!")

    await client.remember(
        "Mahak likes building AI memory systems.",
        dataset_name="memzee",
    )

    print("Remember finished!")

    await cognee.disconnect()


asyncio.run(main())