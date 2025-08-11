import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@Pages/Layout';
import './App.css';

// Pages
import LandingPage from '@Pages/LandingPage';
import BlogPage from '@Pages/BlogPage';
import WorkPage from '@Pages/WorkPage';
import BlogDetailPage from '@Pages/BlogPage/BlogDetailPage/BlogDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
