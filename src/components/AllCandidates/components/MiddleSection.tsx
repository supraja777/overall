import React, { useState } from 'react';

const MiddleSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    portfolio: '',
    leetcode: '',
    resume: null,
    photo: null
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Candidate Information</h2>
      <form style={styles.form}>
        <label style={styles.label}>Full Name</label>
        <input type="text" placeholder="John Doe" style={styles.input} />

        <label style={styles.label}>Portfolio URL</label>
        <input type="url" placeholder="https://portfolio.com" style={styles.input} />

        <label style={styles.label}>LeetCode URL</label>
        <input type="url" placeholder="https://leetcode.com/u/user" style={styles.input} />

        <label style={styles.label}>Resume (PDF)</label>
        <input type="file" accept=".pdf" style={styles.fileInput} />

        <label style={styles.label}>Photo</label>
        <input type="file" accept="image/*" style={styles.fileInput} />

        <button type="button" style={styles.submitBtn}>Save Candidate</button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    padding: '40px',
    borderLeft: '1px solid #edf2f7',
    borderRight: '1px solid #edf2f7',
    overflowY: 'auto'
  },
  title: { fontSize: '24px', marginBottom: '24px', color: '#1a202c' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' },
  label: { fontSize: '14px', fontWeight: 'bold', color: '#4a5568' },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '16px'
  },
  fileInput: {
    padding: '8px 0',
    fontSize: '14px'
  },
  submitBtn: {
    marginTop: '10px',
    padding: '14px',
    backgroundColor: '#1a202c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default MiddleSection;