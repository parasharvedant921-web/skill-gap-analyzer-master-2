from fastapi import APIRouter, Depends
from ..db import get_db
from ..models.employer import EmployerSurveyCreate, EmployerSurvey

router = APIRouter(prefix="/survey", tags=["survey"])

@router.post("/")
async def submit_survey(survey: EmployerSurveyCreate):
    db = get_db()
    # TODO: Save to MongoDB
    return {"message": "Survey submitted successfully", "data": survey}

@router.get("/")
async def get_surveys():
    db = get_db()
    # TODO: Fetch from MongoDB
    return []
