import React, { useState, useEffect } from "react";
import axios from "axios";

function AddLaunchDate(){

  const [courses, setCourses] = useState([]);
  const [course_id, setCourseId] = useState("");
  const [launch_date, setLaunchDate] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  const submit = async (e) => {

    e.preventDefault();

    await axios.post("http://localhost:5000/api/launch-dates", {
      course_id,
      launch_date
    });

    window.location.href="/";
  };

  return (

    <div style={{padding:"30px"}}>

      <h2>Add Launch Date</h2>

      <form onSubmit={submit}>

        <select
          required
          onChange={(e)=>setCourseId(e.target.value)}
        >

          <option value="">Select Course</option>

          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name} - {course.level}
            </option>
          ))}

        </select>

        <br/><br/>

        <input
          type="date"
          required
          onChange={(e)=>setLaunchDate(e.target.value)}
        />

        <br/><br/>

        <button>Add Launch Date</button>

      </form>

    </div>

  );
}

export default AddLaunchDate;