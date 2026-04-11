import React, { useState, useRef } from 'react';
import { Candidate } from '../../../App';
import * as pdfjsLib from 'pdfjs-dist';

// VITE-SPECIFIC WORKER CONFIG
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface MiddleSectionProps {
  onSave: (c: Candidate) => void;
}

const MiddleSection = ({ onSave }: MiddleSectionProps) => {
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [leetcode, setLeetcode] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;

    setIsExtracting(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const typedarray = new Uint8Array(event.target?.result as ArrayBuffer);
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
        }
        setResumeText(fullText);
      } catch (err) {
        console.error("PDF extraction failed", err);
        alert("Failed to read resume. Please try a different text-based PDF.");
      } finally {
        setIsExtracting(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = () => {
    if (!name) return alert("Name is required");
    
    const newCandidate: Candidate = {
      id: Math.random().toString(36).substring(7),
      name,
      portfolio,
      leetcode,
      resumeText: resumeText, // This passes the extracted string to App.tsx
      photo: null
    };

    onSave(newCandidate);
    
    // Reset Form
    setName('');
    setPortfolio('');
    setLeetcode('');
    setResumeText('');
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Candidate</h2>
      
      <div style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Enter name..." />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Portfolio URL</label>
          <input style={styles.input} value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="https://portfolio.me" />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>LeetCode URL</label>
          <input style={styles.input} value={leetcode} onChange={e => setLeetcode(e.target.value)} placeholder="https://leetcode.com/u/..." />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Resume (PDF)</label>
          <button 
            type="button"
            style={resumeText ? styles.uploadedBtn : styles.uploadBtn} 
            onClick={() => fileInputRef.current?.click()}
          >
            {isExtracting ? "ANALYZING PDF..." : resumeText ? "✅ RESUME LOADED" : "UPLOAD RESUME"}
          </button>
          <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={handleResumeUpload} />
        </div>

        <button style={styles.saveBtn} onClick={handleSubmit}>Save Candidate</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { flex: 1, padding: '60px', background: '#fff', height: '100vh', overflowY: 'auto' },
  title: { fontSize: '24px', fontWeight: 800, marginBottom: '40px', color: '#0f172a' },
  form: { maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' },
  uploadBtn: { padding: '14px', borderRadius: '8px', border: '2px dashed #cbd5e1', background: '#f8fafc', color: '#64748b', cursor: 'pointer', fontWeight: 700, fontSize: '11px' },
  uploadedBtn: { padding: '14px', borderRadius: '8px', border: '2px solid #10b981', background: '#ecfdf5', color: '#059669', cursor: 'pointer', fontWeight: 700, fontSize: '11px' },
  saveBtn: { marginTop: '10px', padding: '16px', borderRadius: '8px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 800, cursor: 'pointer', letterSpacing: '1px' }
};

export default MiddleSection;