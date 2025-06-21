import asyncio
import csv
import os
import weave
from weave import Dataset
from pathlib import Path
import json
import sys

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    # Look for .env in parent directory (backend root)
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        load_dotenv(env_path)
    else:
        # Try current working directory
        load_dotenv()
except ImportError:
    pass


# TODO: Maybe use this for finetuning
async def flowbite():
    weave.init(os.getenv("WANDB_PROJECT", "default_project"))

    data_dir = Path(__file__).parent / "components"

    ds = []
    for file in sorted(data_dir.glob("*.json")):
        with open(file, "r") as f:
            data = json.load(f)
        abort = False
        category = file.name.split(".")[0]
        if category == "avatar":
            print("Skipped ", category)
            continue
        for row in data:
            if not row.get("names"):
                abort = True
                print("Aborting!")
                break
            source = row["name"].lower().replace(" ", "-")
            for i, name in enumerate(row["names"]):
                ds.append(
                    {
                        "name": name,
                        # hack for weirdly named folders.
                        "id": f"flowbite/{category.replace(' ', '-')}/{source}/{i}",
                        "emoji": row["emojis"][i],
                        "prompt": row["prompts"][i],
                        "desktop_img": f"{category}/{source}.combined.png",
                        "mobile_img": f"{category}/{source}.combined.mobile.png",
                    }
                )
        if abort:
            break

    dataset = Dataset(ds)
    print("Created dataset of ", len(ds))
    dataset_ref = weave.publish(dataset, "flowbite")
    print("Published dataset:", dataset_ref)


async def publish(model):
    weave.init(os.getenv("WANDB_PROJECT", "default_project"))

    ds_dir = Path(__file__).parent / "datasets"

    if model:
        with open(ds_dir / f"{model}.json", "r") as f:
            ds = json.load(f)
    else:
        ds = []
        with open(ds_dir / "eval.csv", "r") as f:
            reader = csv.DictReader(f)
            for row in reader:
                ds.append(row)

    dataset = Dataset(name=model or 'eval', rows=ds)
    print("Created dataset of ", len(ds))
    dataset_ref = weave.publish(dataset)
    print("Published dataset:", dataset_ref)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        model = sys.argv[1]
    else:
        model = None
    asyncio.run(publish(model))
