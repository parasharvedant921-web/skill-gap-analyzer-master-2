import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysis } from '../api/client';

const DistrictReport = () => {
  const { district } = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalysis(district);
        setAnalysisData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district]);

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Generating district report...</div>;
  if (!analysisData) return <div style={{ textAlign: 'center', padding: '4rem' }}>Report not found.</div>;

  // Calculate aggregate metrics
  const totalCourses = analysisData.analysis.length;
  const avgMatchScore = analysisData.analysis.reduce((acc, curr) => acc + curr.match_score, 0) / totalCourses;

  // Identify top missing skills across all courses in the district
  const missingSkillsMap = {};
  analysisData.analysis.forEach(a => {
    (a.missing_skills || []).forEach(s => {
      missingSkillsMap[s] = (missingSkillsMap[s] || 0) + 1;
    });
  });
  const topMissingSkills = Object.entries(missingSkillsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ color: 'var(--primary-blue)', fontSize: '0.9rem' }}>← Back to Dashboard</Link>
        <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary-dark)', textTransform: 'capitalize' }}>{district} District Training Plan</h1>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem'
      }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '2px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Courses</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalCourses}</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '2px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Avg. Alignment</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(avgMatchScore * 100)}%</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '2px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Gap Severity</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: avgMatchScore < 0.5 ? 'var(--gap-red)' : 'var(--success-green)' }}>
            {avgMatchScore < 0.5 ? 'High' : 'Low'}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
        <h3 style={{ marginTop: 0, color: 'var(--primary-dark)', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', display: 'inline-block' }}>
          Strategic Recommendations
        </h3>
        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
          <li><strong>Immediate Curriculum Update</strong>: Prioritize the integration of <strong>{topMissingSkills[0]?.[0] || 'market-demanded'}</strong> across multiple courses.</li>
          <li><strong>New Course Development</strong>: There is a critical shortage of training for <strong>{topMissingSkills[1]?.[0] || 'emerging'}</strong> skills.</li>
          <li><strong>Trainer Capacity Building</strong>: Upgrade equipment and trainer certifications for the top 3 missing skill areas.</li>
          <li><strong>Industry Partnership</strong>: Establish a formal MOU with local employers in {district} to validate the revised curriculum.</li>
        </ul>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default DistrictReport;
