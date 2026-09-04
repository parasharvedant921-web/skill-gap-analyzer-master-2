# Skill Gap Analyzer

A comprehensive Labour Market Intelligence and Curriculum Alignment platform designed to identify and bridge the gap between vocational training programs and real-world industry requirements. Developed as a solution for the Smart India Hackathon (SIH) in collaboration with the Government of Maharashtra.

## Project Purpose

Educational institutions often design curricula based on historical data or broad occupational categories. However, the job market evolves rapidly due to emerging technologies and localized industry shifts. The Skill Gap Analyzer provides a data-driven approach to align course content with actual employer demand, ensuring trainees are job-ready and employers find qualified candidates.

## Key Capabilities

### 1. Regional Demand Intelligence
The platform aggregates job posting signals and employer data to create a "demand map" for specific districts (e.g., Pune, Mumbai, Nagpur). This allows policymakers to see exactly which skills are trending in which region.

### 2. Semantic Skill Matching
Unlike traditional keyword matching, the system uses Natural Language Processing (NLP) via the `all-MiniLM-L6-v2` transformer model. This enables the platform to understand that "React.js" and "React" are the same skill, providing a far more accurate alignment score.

### 3. Curriculum Alignment Analytics
For every course in the catalog, the system computes:
- **Alignment Score**: A percentage indicating how much of the current regional demand is covered by the course's syllabus.
- **Gap Identification**: A precise list of "missing skills" that should be integrated into the course to increase its market relevance.
- **Course Health Status**: Courses are flagged as *Aligned*, *Needs Update*, or *Obsolete* based on their alignment score.

### 4. Industry-Government Feedback Loop
A dedicated Employer Survey module allows industry leaders to provide direct, qualitative input on the skill deficiencies they observe in candidates, which serves as a validation layer for the automated NLP analysis.

### 5. District Strategic Planning
The platform generates high-level training plans for district administrators, suggesting priority areas for trainer capacity building and equipment upgrades.

## Technical Architecture

### Backend
- **Framework**: FastAPI (Python) for high-performance asynchronous API endpoints.
- **Database**: MongoDB for flexible storage of course catalogs and job demand data.
- **NLP Engine**: `sentence-transformers` for calculating cosine similarity between skill embeddings.

### Frontend
- **Framework**: React (JavaScript) with Vite.
- **Visualizations**: Recharts for rendering grouped bar charts of Demand vs. Supply.
- **Design**: A professional, data-dense "Government-grade" aesthetic using custom CSS Modules.

## Installation and Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the API server:
   ```bash
   python -m app.main
   ```
   The server will start at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`.

## Future Roadmap
- Integration of real-time job scraping from portals like LinkedIn and Indeed.
- Implementation of a full-scale administrative dashboard for course creators.
- Expanding the dataset to cover all districts of Maharashtra.
- Adding PDF export functionality for the District Training Plans.
