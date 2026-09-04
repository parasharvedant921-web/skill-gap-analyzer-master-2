from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from ..db import get_db
from ..services.matcher import analyze_gap
import json
import os

router = APIRouter(prefix="/analysis", tags=["analysis"])

@router.get("/")
async def get_skill_gap_analysis(district: str = None):
    """
    Performs skill gap analysis for a specific district or all districts.
    """
    db = get_db()

    # In a real app, we'd query MongoDB. For the scaffold, we'll load from JSON seed data.
    # This ensures the demo works even if Mongo isn't running yet.
    courses_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "courses_seed.json")
    demands_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "job_postings_seed.json")

    with open(courses_path, 'r') as f:
        courses = json.load(f)
    with open(demands_path, 'r') as f:
        demands = json.load(f)

    if district:
        courses = [c for c in courses if c['district'].lower() == district.lower()]
        demands = [d for d in demands if d['district'].lower() == district.lower()]

    if not courses:
        raise HTTPException(status_code=404, detail=f"No courses found for district: {district}")

    analysis = analyze_gap(courses, demands)
    return {
        "district": district or "All",
        "analysis": analysis
    }
