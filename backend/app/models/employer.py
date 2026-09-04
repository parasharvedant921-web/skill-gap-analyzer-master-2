from pydantic import BaseModel
from typing import List, Optional

class EmployerSurvey(BaseModel):
    id: str
    employer_name: str
    industry: str
    district: str
    top_missing_skills: List[str]
    comments: Optional[str] = None

class EmployerSurveyCreate(BaseModel):
    employer_name: str
    industry: str
    district: str
    top_missing_skills: List[str]
    comments: Optional[str] = None
