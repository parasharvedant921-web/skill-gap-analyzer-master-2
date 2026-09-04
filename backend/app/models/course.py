from pydantic import BaseModel
from typing import List

class Course(BaseModel):
    id: str
    name: str
    skills_taught: List[str]
    district: str

class CourseCreate(BaseModel):
    name: str
    skills_taught: List[str]
    district: str
