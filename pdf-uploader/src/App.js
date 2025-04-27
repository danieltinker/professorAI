import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setMsg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return setMsg("Please select a PDF first.");
    }

    const form = new FormData();
    form.append("pdf_file", file);

    try {
      // proxy kicks in here, so no need for full URL
      const res = await fetch("/professorAI/BuildCourse/", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (res.ok) {
        setMsg(`✅ Uploaded: ${data.filename}`);
      } else {
        setMsg(`❌ ${data.detail || data.message}`);
      }
    } catch (err) {
      setMsg(`❌ Network error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Upload a PDF</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept="application/pdf" onChange={onChange} />
        <button style={{ marginTop: "1rem" }}>Upload</button>
      </form>
      {msg && <p style={{ marginTop: "1rem" }}>{msg}</p>}
    </div>
  );
}

export default App;
