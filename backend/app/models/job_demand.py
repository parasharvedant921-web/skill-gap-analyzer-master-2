from pydantic import BaseModel
from typing import List

class JobDemand(BaseModel):
    id: str
    role: str
    required_skills: List[str]
    district: str
    source: str

class JobDemandCreate(BaseModel):
    role: str
    required_skills: List[str]
    district: str
    source: str
