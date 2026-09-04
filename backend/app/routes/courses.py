from fastapi import APIRouter, Depends
from typing import List
from ..db import get_db
from ..models.course import Course

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/", response_model=List[Course])
async def list_courses():
    db = get_db()
    # Return seed data for now
    import json, os
    path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "courses_seed.json")
    with open(path, 'r') as f:
        return json.load(f)
