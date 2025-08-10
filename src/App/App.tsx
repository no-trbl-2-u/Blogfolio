import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@Pages/Layout';

// Pages
import LandingPage from '@Pages/LandingPage';
import BlogPage from '@Pages/BlogPage';
import WorkPage from '@Pages/WorkPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
