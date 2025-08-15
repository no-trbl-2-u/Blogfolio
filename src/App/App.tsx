import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

/* Pages */
import Layout from '@Pages/Layout';
import LandingPage from '@Pages/LandingPage';

/* Blog Pages */
import BlogPage from '@Pages/BlogPage';
import BlogDetailPage from '@Pages/BlogPage/BlogDetailPage/BlogDetailPage';
import WorkPage from '@Pages/WorkPage';
import OrbitalPage from '@Pages/WorkPage/OrbitalPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Blog Pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />

          {/* Work Pages */}
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/orbital" element={<OrbitalPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
