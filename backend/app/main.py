from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import courses, demand, analysis, survey
from .config import settings

app = FastAPI(title=settings.APP_NAME)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL (e.g., ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(courses.router)
app.include_router(demand.router)
app.include_router(analysis.router)
app.include_router(survey.router)

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME} API", "docs": "/docs"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
