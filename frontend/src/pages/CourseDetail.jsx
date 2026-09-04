import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourses, getAnalysis } from '../api/client';
import { SkillTag, MatchScoreBadge } from '../components/Badges';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getCourses();
        const courseData = courses.find(c => c.id === id);
        if (!courseData) return;
        setCourse(courseData);

        const analysisData = await getAnalysis(courseData.district);
        const courseAnalysis = analysisData.analysis.find(a => a.course_id === id);
        setAnalysis(courseAnalysis);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading course details...</div>;
  if (!course) return <div style={{ textAlign: 'center', padding: '4rem' }}>Course not found.</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ color: 'var(--primary-blue)', fontSize: '0.9rem' }}>← Back to Dashboard</Link>
        <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary-dark)' }}>{course.name}</h1>
      </header>

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        border: '1px solid var(--border-color)',
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Alignment Score</p>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
            {Math.round((analysis?.match_score || 0) * 100)}%
          </div>
        </div>
        <MatchScoreBadge score={analysis?.match_score || 0} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
          <h3 style={{ marginTop: 0, color: 'var(--primary-dark)' }}>Skills Taught</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {course.skills_taught.map(s => <SkillTag key={s} skill={s} />)}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
          <h3 style={{ marginTop: 0, color: 'var(--primary-dark)' }}>Skills in Demand</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(analysis?.matched_skills || []).map(s => <SkillTag key={s} skill={s} />)}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff5f5', padding: '1.5rem', border: '1px solid #feb2b2', borderRadius: '2px' }}>
        <h3 style={{ marginTop: 0, color: '#c53030' }}>Recommended Curriculum Additions</h3>
        <p style={{ color: '#742a2a', marginBottom: '1rem' }}>To improve alignment with current market trends, consider adding:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {(analysis?.missing_skills || []).map(s => (
            <span key={s} style={{
              backgroundColor: 'white',
              border: '1px solid #feb2b2',
              padding: '0.25rem 0.5rem',
              borderRadius: '2px',
              fontSize: '0.85rem',
              color: '#c53030'
            }}>
              + {s}
            </span>
          ))}
          {(!analysis?.missing_skills || analysis.missing_skills.length === 0) && <span>No gaps found. Course is perfectly aligned!</span>}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
