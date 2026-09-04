// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import CourseDetail from './pages/CourseDetail';
// import EmployerForm from './pages/EmployerForm';
// import DistrictReport from './pages/DistrictReport';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />
//         <main style={{ padding: '2rem' }}>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/course/:id" element={<CourseDetail />} />
//             <Route path="/survey" element={<EmployerForm />} />
//             <Route path="/report/:district" element={<DistrictReport />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import WhatIfSimulator from './components/WhatIfSimulator';
import ThreeWayComparison from './components/ThreeWayComparison';

export default function App() {
  const [district, setDistrict] = useState('Pune');

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Government of Maharashtra Header */}
      <header style={dashboardStyles.header}>
        <div style={dashboardStyles.headerContent}>
          <div>
            <span style={dashboardStyles.govtLabel}>
              DIRECTORATE OF VOCATIONAL EDUCATION & TRAINING • GOVT. OF MAHARASHTRA
            </span>
            <h1 style={dashboardStyles.platformTitle}>Skill Gap Analyzer & Labour Market Intelligence</h1>
          </div>
          <div style={dashboardStyles.filterGroup}>
            <label style={dashboardStyles.filterLabel}>Target District:</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={dashboardStyles.select}
            >
              <option value="Pune">Pune District</option>
              <option value="Mumbai">Mumbai Metropolitan</option>
              <option value="Nagpur">Nagpur Region</option>
              <option value="Nashik">Nashik Region</option>
              <option value="Chhatrapati Sambhaji Nagar">Chh. Sambhaji Nagar</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* KPI Summary Cards */}
        <div style={dashboardStyles.kpiGrid}>
          <div style={dashboardStyles.kpiCard}>
            <span style={dashboardStyles.kpiLabel}>Current Alignment</span>
            <span style={dashboardStyles.kpiVal}>54.2%</span>
            <span style={{ fontSize: '0.8rem', color: '#ea580c' }}>Status: Needs Modernization</span>
          </div>
          <div style={dashboardStyles.kpiCard}>
            <span style={dashboardStyles.kpiLabel}>Syllabi Analyzed</span>
            <span style={dashboardStyles.kpiVal}>18 Courses</span>
            <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>Coverage: Computer / IT</span>
          </div>
          <div style={dashboardStyles.kpiCard}>
            <span style={dashboardStyles.kpiLabel}>High-Priority Gaps</span>
            <span style={{ ...dashboardStyles.kpiVal, color: '#dc2626' }}>6 Skills</span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Cloud, Containers & Microservices</span>
          </div>
        </div>

        {/* 3-Way Comparison Component */}
        <ThreeWayComparison district={district} />

        {/* What-If Simulator Component */}
        <WhatIfSimulator baseScore={54} />
      </main>
    </div>
  );
}

const dashboardStyles = {
  header: { backgroundColor: '#0f172a', color: '#ffffff', padding: '16px 24px', borderBottom: '4px solid #f97316' },
  headerContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  govtLabel: { fontSize: '0.7rem', letterSpacing: '0.08em', color: '#fb923c', fontWeight: '700' },
  platformTitle: { margin: '4px 0 0 0', fontSize: '1.4rem', fontWeight: '700' },
  filterGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  filterLabel: { fontSize: '0.85rem', color: '#cbd5e1' },
  select: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.9rem', cursor: 'pointer' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' },
  kpiCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  kpiLabel: { fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' },
  kpiVal: { fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '4px 0' }
};