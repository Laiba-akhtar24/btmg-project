import React, { useEffect, useState } from "react";
import axios from "axios";
import InquiryForm from "../components/InquiryForm"; // ✅ default import

import "./CourseDetails.css"; // optional, ya apne liye CourseInquiries.css bana lo

function CourseInquiries() { // ✅ component name match with file
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null); // modal open state

  const API = "http://localhost:5000/api";

  // Fetch all course inquiries from backend
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get(`${API}/course-inquiries`);
        setInquiries(res.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div className="course-inquiries-page">
      <h1>All Course Inquiries</h1>

      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <table className="inquiries-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id}>
                <td>{inq.course_name}</td>
                <td>{inq.name}</td>
                <td>{inq.email}</td>
                <td>{inq.phone}</td>
                <td>{inq.message.substring(0, 30)}...</td>
                <td>
                  <button
                    className="btn inquiry-btn"
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal to view inquiry */}
      {selectedInquiry && (
        <InquiryForm
          course={{ name: selectedInquiry.course_name }}
          onClose={() => setSelectedInquiry(null)}
        />
      )}
    </div>
  );
}

export default CourseInquiries; // ✅ default export matches component