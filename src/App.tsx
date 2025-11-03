
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ClassesPage from './pages/ClassesPage';
import SchedulePage from './pages/SchedulePage';
import GradesPage from './pages/GradesPage';
import AttendancePage from './pages/AttendancePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;