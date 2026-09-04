from fastapi import APIRouter, Depends
from typing import List
from ..db import get_db
from ..models.job_demand import JobDemand

router = APIRouter(prefix="/demand", tags=["demand"])

@router.get("/", response_model=List[JobDemand])
async def list_demand():
    db = get_db()
    # Return seed data for now
    import json, os
    path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "job_postings_seed.json")
    with open(path, 'r') as f:
        return json.load(f)
