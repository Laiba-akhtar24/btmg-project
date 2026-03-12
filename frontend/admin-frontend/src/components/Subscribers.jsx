import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Subscribers.css";

const Subscribers = () => {

  const [subscribers, setSubscribers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const editorRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/api/subscribers")
      .then(res => setSubscribers(res.data))
      .catch(err => console.log(err));
  }, []);

  const toggleCheckbox = (email) => {

    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter(e => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }

  };

  const selectAll = (e) => {

    if (e.target.checked) {
      setSelectedEmails(subscribers.map(sub => sub.email));
    } else {
      setSelectedEmails([]);
    }

  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const addLink = () => {

    const url = prompt("Enter URL");

    if (url) {
      document.execCommand("createLink", false, url);
    }

  };

  const sendMessage = async (e) => {

    e.preventDefault();

    if (selectedEmails.length === 0) {
      alert("Please select at least one subscriber.");
      return;
    }

    const message = editorRef.current.innerHTML;

    if(message.trim() === ""){
      alert("Message required");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/send-message", {
        emails: selectedEmails,
        message: message
      });

      alert("Message sent successfully");

      editorRef.current.innerHTML = "";
      setSelectedEmails([]);
      setShowModal(false);

    } catch (err) {

      console.log(err);
      alert("Error sending message");

    }

  };

  return (

    <div className="subscribers-container">

      {/* HEADER */}

      <div className="page-header">

        <h2>Subscribers</h2>

        <button
          className="btn-send"
          onClick={() => setShowModal(true)}
        >
          Send Message
        </button>

      </div>

      {/* MODAL */}

      {showModal && (

      <div className="message-modal-overlay">

        <div className="message-modal">

          <div className="modal-header">

            <div className="modal-header-left">

              <div className="icon-circle">✉</div>

              <div>
                <h3>Send Message</h3>
                <p>Send to selected subscribers</p>
              </div>

            </div>

            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

          </div>

          <div className="modal-body">

            <label className="message-label">MESSAGE</label>

            <div className="editor-toolbar">

              <select onChange={(e)=>formatText('formatBlock', e.target.value)}>
                <option value="p">Normal</option>
                <option value="h1">Heading</option>
                <option value="h2">Sub Heading</option>
              </select>

              <button onClick={()=>formatText('bold')}><b>B</b></button>
              <button onClick={()=>formatText('italic')}><i>I</i></button>
              <button onClick={()=>formatText('underline')}><u>U</u></button>
              <button onClick={addLink}>🔗</button>
              <button onClick={()=>formatText('insertUnorderedList')}>•</button>
              <button onClick={()=>formatText('insertOrderedList')}>1.</button>
              <button onClick={()=>formatText('removeFormat')}>Tₓ</button>

            </div>

            <div
              className="editor"
              contentEditable
              ref={editorRef}
              placeholder="Write your message here..."
            ></div>

            <button
              className="send-btn"
              onClick={sendMessage}
            >
              Send Message
            </button>

          </div>

        </div>

      </div>

      )}

      {/* TABLE */}

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Select</th>

              <th>
                <label className="select-all">
                  <input
                    type="checkbox"
                    onChange={selectAll}
                  />
                  Select All
                </label>
              </th>

            </tr>

          </thead>

          <tbody>

            {subscribers.length > 0 ? (

              subscribers.map((subscriber, index) => (

                <tr key={index}>

                  <td>{subscriber.email}</td>

                  <td>

                    {subscriber.status === "active" ? (

                      <span className="badge active">
                        Active
                      </span>

                    ) : (

                      <span className="badge inactive">
                        Inactive
                      </span>

                    )}

                  </td>

                  <td>

                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(subscriber.email)}
                      onChange={() => toggleCheckbox(subscriber.email)}
                    />

                  </td>

                  <td>---</td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="4" className="no-data">
                  No subscribers found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Subscribers;