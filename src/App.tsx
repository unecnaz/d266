import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Courses from './pages/Courses.tsx'
import CourseDetail from './pages/CourseDetail.tsx'
import PythonPractice from './pages/PythonPractice.tsx'
import PythonTraining from './pages/PythonTraining.tsx'
import SqlPractice from './pages/SqlPractice.tsx'
import BiPractice from './pages/BiPractice.tsx'
import ScrapingPractice from './pages/ScrapingPractice.tsx'
import Datasets from './pages/Datasets.tsx'
import Projects from './pages/Projects.tsx'
import Profile from './pages/Profile.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:category" element={<Courses />} />
          <Route path="/courses/:category/:courseId" element={<CourseDetail />} />
          <Route path="/python-training" element={<PythonTraining />} />
          <Route path="/learning/python" element={<PythonPractice />} />
          <Route path="/learning/sql" element={<SqlPractice />} />
          <Route path="/learning/bi" element={<BiPractice />} />
          <Route path="/learning/scraping" element={<ScrapingPractice />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App