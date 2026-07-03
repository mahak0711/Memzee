import asyncio
from pprint import pprint

import cognee

from app.config import settings


async def main():
    await cognee.serve(
        url=settings.COGNEE_SERVICE_URL,
        api_key=settings.COGNEE_API_KEY,
    )

    print("=" * 60)
    print("REMEMBER")
    print("=" * 60)

    await cognee.remember(
        "Mahak has an OpenAI interview tomorrow at 2 PM.",
        dataset_name=settings.MEMZEE_DATASET,
    )

    print("Done.\n")

    print("=" * 60)
    print("DATASETS")
    print("=" * 60)

    datasets = await cognee.datasets.list_datasets()

    print(f"Total datasets: {len(datasets)}\n")

    for ds in datasets:
        print(type(ds))

        if hasattr(ds, "model_dump"):
            pprint(ds.model_dump())

        elif hasattr(ds, "__dict__"):
            pprint(ds.__dict__)

        else:
            print(dir(ds))
            print(ds)

        print("-" * 60)

    await cognee.disconnect()


asyncio.run(main())