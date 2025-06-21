"""W&B Project Configuration Utility"""

import os
from pathlib import Path
from dotenv import load_dotenv
import weave

# 🎨 W&B Precedence Order:

#   1. 🥇 weave.init(project="explicit") - Highest
#   precedence
#   2. 🥈 Environment Variables (WANDB_PROJECT) - High
#   precedence
#   3. 🥉 Local Config Files (./wandb/settings) - Medium
#   precedence
#   4. 🏅 Inference/Defaults - Lowest precedence
def init_weave_with_project(default: str = "default_project"):
    """Initialize Weave with project from .env file or environment variable."""
    
    # Load .env file (won't override existing environment variables)
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        load_dotenv(env_path, override=False)
    
    # Get project from environment (includes .env values now)
    project = os.getenv("WANDB_PROJECT", default)
    
    return weave.init(project)