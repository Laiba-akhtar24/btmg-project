import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseInquiries.css";

function CourseInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const API = "http://localhost:5000/api";

  // Fetch all inquiries
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await axios.delete(`${API}/course-inquiries/${id}`);
      setInquiries(inquiries.filter((inq) => inq._id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete inquiry");
    }
  };
  const handleSendReply = async () => {
    if (!replyMessage.trim()) return alert("Reply message cannot be empty");

    try {
      // Replace this route with your backend route for sending reply
     await axios.post(`${API}/course-inquiries/${selectedInquiry._id}/reply`, {
  replyMessage: replyMessage,
});
      alert("Reply sent successfully");
      setReplyMessage("");
      setSelectedInquiry(null);
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply");
    }
  };
  const handleView = async (inq) => {
  // open modal immediately
  setSelectedInquiry({ ...inq, viewed: true });

  // update UI immediately without waiting for backend
  setInquiries((prev) =>
    prev.map((item) =>
      item._id === inq._id ? { ...item, viewed: true } : item
    )
  );

  try {
    await axios.patch(`${API}/course-inquiries/${inq._id}/viewed`);
  } catch (err) {
    console.error("Error updating viewed status:", err);
  }
};

  return (
    <div className="course-inquiries-page">
      <h1>Course Inquiries</h1>
      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <table className="inquiries-table">
          <thead>
            <tr>
              <th>For Course</th>
              <th>Name</th>
              <th>Email</th>
              <th>Submitted Date</th>
              <th>Replied</th>
              <th>Viewed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id}>
                <td>{inq.course_name || "N/A"}</td>
                <td>{inq.name}</td>
                <td>{inq.email}</td>
                <td>
                  {new Date(inq.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>{inq.replied ? "Replied" : "Pending"}</td>
                <td>{inq.viewed ? "Viewed" : "—"}</td>
                <td>
            <button
  className="btn view-btn"
  onClick={() => handleView(inq)}
>
  View
</button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(inq._id)}
                  >
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedInquiry(null)}
            >
              ×
            </button>
            <h2>Inquiry Details</h2>
            <p><strong>Course:</strong> {selectedInquiry.course_name}</p>
            <p><strong>Name:</strong> {selectedInquiry.name}</p>
            <p><strong>Email:</strong> {selectedInquiry.email}</p>
            <p><strong>Phone:</strong> {selectedInquiry.phone || "—"}</p>
            <p><strong>Message:</strong> {selectedInquiry.message}</p>

            <div className="reply-section">
              <label><strong>Reply Message</strong></label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply..."
              />
              <button className="btn send-reply-btn" onClick={handleSendReply}>
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseInquiries;