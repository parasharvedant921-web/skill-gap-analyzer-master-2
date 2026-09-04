import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SkillGapChart = ({ data }) => {
  // Data should be: [{ skill: 'React', demand: 10, supply: 4 }, ...]

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      border: '1px solid var(--border-color)',
      borderRadius: '2px',
      height: '400px'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
        Skill Demand vs. Supply
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="skill" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: '2px',
              border: '1px solid var(--border-color)',
              backgroundColor: '#fff'
            }}
          />
          <Legend verticalAlign="top" align="right" height={36} />
          <Bar dataKey="demand" fill="#1d4ed8" name="Market Demand" radius={[2, 2, 0, 0]} />
          <Bar dataKey="supply" fill="#10b981" name="Course Coverage" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillGapChart;
