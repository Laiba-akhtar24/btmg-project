import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactLeads.css";

export default function ContactLeads() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/admin/leads");
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const markViewed = async (lead) => {
    if (lead.viewed === "Viewed") return;
    try {
      await axios.post(`http://localhost:5000/api/contact/viewed/${lead._id}`);
      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? { ...l, viewed: "Viewed" } : l))
      );
    } catch (error) {
      console.error("Error marking viewed:", error);
    }
  };

  const sendReply = async (lead) => {
    if (!replyMessage) return alert("Please enter a reply message.");
    try {
      await axios.post(`http://localhost:5000/api/contact/reply/${lead._id}`, {
        message: replyMessage
      });

      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? { ...l, replied: "Yes" } : l))
      );

      alert("Reply sent successfully!");
      setReplyMessage("");
      setSelectedLead(null);
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Error sending reply.");
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Submissions</h2>

      {leads.length === 0 ? (
        <p className="no-leads">No contact submissions yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Replied</th>
                <th>Viewed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>{lead.replied}</td>
                  <td>{lead.viewed}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedLead(lead);
                        markViewed(lead);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedLead && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Contact Details</h3>
              <button className="close-btn" onClick={() => setSelectedLead(null)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <p><strong>Name:</strong> {selectedLead.name}</p>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Message:</strong> {selectedLead.message}</p>

              <hr />

              <div className="reply-section">
                <label><strong>Reply Message:</strong></label>
                <textarea
                  rows="4"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write your reply..."
                ></textarea>
                <button className="send-btn" onClick={() => sendReply(selectedLead)}>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}