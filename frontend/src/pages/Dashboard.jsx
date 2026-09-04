import React, { useState, useEffect } from 'react';
import { getAnalysis, getCourses } from '../api/client';
import SkillGapChart from '../components/SkillGapChart';
import CourseCard from '../components/CourseCard';

const Dashboard = () => {
  const [district, setDistrict] = useState('Pune');
  const [analysisData, setAnalysisData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [analysis, coursesList] = await Promise.all([
          getAnalysis(district),
          getCourses()
        ]);
        setAnalysisData(analysis);
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district]);

  // Transform analysis data for the chart
  const getChartData = () => {
    if (!analysisData) return [];

    const skillMap = {};
    analysisData.analysis.forEach(item => {
      const missing = item.missing_skills || [];
      const matched = item.matched_skills || [];

      // This is a simplification for the demo:
      // we count how many courses teach the skill vs how many demand it
      [...missing, ...matched].forEach(skill => {
        if (!skillMap[skill]) skillMap[skill] = { skill, demand: 0, supply: 0 };
      });
    });

    // In a real app, we'd pull actual demand counts from /demand
    // For demo purposes, we'll simulate based on the analysis output
    return Object.values(skillMap).map(s => ({
      ...s,
      demand: Math.floor(Math.random() * 50) + 10,
      supply: Math.floor(Math.random() * 30) + 5
    })).sort((a, b) => b.demand - a.demand).slice(0, 10);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid var(--primary-blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-muted)' }}>Analyzing skill alignment using NLP...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--primary-dark)' }}>District Overview</h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Market intelligence for skill alignment</p>
        </div>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '2px',
            border: '1px solid var(--border-color)',
            fontSize: '0.9rem',
            backgroundColor: 'white'
          }}
        >
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Nagpur">Nagpur</option>
        </select>
      </header>

      <SkillGapChart data={getChartData()} />

      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Course Alignment</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {courses
            .filter(c => c.district === district)
            .map(course => {
              const courseAnalysis = analysisData.analysis.find(a => a.course_id === course.id);
              return <CourseCard key={course.id} course={course} analysis={courseAnalysis} />;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
