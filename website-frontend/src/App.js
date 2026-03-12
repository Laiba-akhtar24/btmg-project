import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import InquiryPage from "./pages/InquiryPage";
import CourseInquiries from './pages/CourseInquiries'; 
import EnrollmentFormWrapper from './components/EnrollmentFormWrapper';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar on all pages */}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
           <Route path="/course/:id/inquiry" element={<InquiryPage />} /> 
            <Route path="/course-inquiries" element={<CourseInquiries />} />
        <Route path="/course/:id/enroll" element={<EnrollmentFormWrapper />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;