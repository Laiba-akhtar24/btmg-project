// frontend/admin-frontend/src/components/CourseEnrollments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseInquiries.css"; // reuse inquiry styling

function CourseEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const API = "http://localhost:5000/api";

  // Fetch all enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(`${API}/enrollments`);
        setEnrollments(res.data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };
    fetchEnrollments();
  }, []);

  // Delete enrollment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await axios.delete(`${API}/enrollments/${id}`);
      setEnrollments(enrollments.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting enrollment:", err);
      alert("Failed to delete enrollment");
    }
  };

  // Send reply to enrollment
  const handleSendReply = async () => {
    if (!replyMessage.trim()) return alert("Reply message cannot be empty");

    try {
      await axios.post(`${API}/enrollments/${selectedEnrollment._id}/reply`, {
        replyMessage: replyMessage,
      });

      alert("Reply sent successfully");
      setReplyMessage("");
      setSelectedEnrollment(null);

      // Update local state
      setEnrollments(enrollments.map(e =>
        e._id === selectedEnrollment._id ? { ...e, status: "Replied" } : e
      ));
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply");
    }
  };

  return (
    <div className="course-inquiries-page">
      <h1>Course Enrollments</h1>

      {enrollments.length === 0 ? (
        <p>No enrollments yet.</p>
      ) : (
        <table className="inquiries-table">
          <thead>
            <tr>
              <th>#</th>
              <th>For Course</th>
              <th>Type</th>
              <th>Name</th>
              <th>Submitted Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enroll, index) => (
              <tr key={enroll._id}>
                <td>{index + 1}</td>
                <td>{enroll.course_name}</td>
                <td>{enroll.registration_type}</td>
                <td>{enroll.student_name}</td>
                <td>{new Date(enroll.createdAt).toLocaleDateString("en-US", {
                  day:"2-digit", month:"short", year:"numeric"
                })}</td>
                <td>{enroll.status}</td>
                <td>
                  <button className="btn view-btn" onClick={() => setSelectedEnrollment(enroll)}>View Details</button>
                  <button className="btn delete-btn" onClick={() => handleDelete(enroll._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedEnrollment && (
        <div className="modal-overlay" onClick={() => setSelectedEnrollment(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedEnrollment(null)}>×</button>
            <h2>Enrollment Details</h2>
            <p><strong>Course:</strong> {selectedEnrollment.course_name}</p>
            <p><strong>Name:</strong> {selectedEnrollment.student_name}</p>
            <p><strong>Email:</strong> {selectedEnrollment.email}</p>
            <p><strong>Phone:</strong> {selectedEnrollment.phone || "—"}</p>
            <p><strong>Type:</strong> {selectedEnrollment.registration_type}</p>
            <p><strong>Message:</strong> {selectedEnrollment.message || "—"}</p>

            <div className="reply-section">
              <label><strong>Reply Message</strong></label>
              <textarea
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
              />
              <button className="btn send-reply-btn" onClick={handleSendReply}>Send Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollments;