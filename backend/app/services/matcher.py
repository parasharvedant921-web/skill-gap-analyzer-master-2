from typing import List, Dict, Any
from sentence_transformers import SentenceTransformer, util

# Load model globally to avoid reloading on every request
# 'all-MiniLM-L6-v2' is small, fast, and good for skill similarity
model = SentenceTransformer('all-MiniLM-L6-v2')

def calculate_similarity(skill1: str, skill2: str) -> float:
    emb1 = model.encode(skill1, convert_to_tensor=True)
    emb2 = model.encode(skill2, convert_to_tensor=True)
    return util.cos_sim(emb1, emb2).item()

def match_skills(course_skills: List[str], demand_skills: List[str], threshold: float = 0.7) -> Dict[str, Any]:
    """
    Matches course skills against demand skills.
    Returns match score, matched skills, and missing skills.
    """
    matched_skills = []
    missing_skills = []

    # Simple exact match first for speed, then semantic match
    for d_skill in demand_skills:
        is_matched = False
        for c_skill in course_skills:
            if d_skill.lower() == c_skill.lower():
                matched_skills.append(d_skill)
                is_matched = True
                break

            # Semantic match
            if calculate_similarity(d_skill, c_skill) >= threshold:
                matched_skills.append(d_skill)
                is_matched = True
                break

        if not is_matched:
            missing_skills.append(d_skill)

    match_score = len(matched_skills) / len(demand_skills) if demand_skills else 0.0

    return {
        "match_score": match_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }

def analyze_gap(courses: List[Dict], demands: List[Dict]) -> List[Dict]:
    """
    Analyzes the skill gap for all courses in a region.
    """
    analysis_results = []

    # Aggregated demand skills for the region
    all_demand_skills = set()
    for d in demands:
        all_demand_skills.update(d.get('required_skills', []))

    demand_skills_list = list(all_demand_skills)

    for course in courses:
        skills_taught = course.get('skills_taught', [])
        match_data = match_skills(skills_taught, demand_skills_list)

        analysis_results.append({
            "course_id": course.get('id'),
            "course_name": course.get('name'),
            "match_score": match_data["match_score"],
            "matched_skills": match_data["matched_skills"],
            "missing_skills": match_data["missing_skills"],
            "obsolete_flag": match_data["match_score"] < 0.3,
            "oversupplied_flag": False # Simplified for scaffold
        })

    return analysis_results
