import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// PDF Worker Config
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MiddleSection = ({ onSave }: any) => {
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [leetcode, setLeetcode] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null); // For Image Preview
  const [isExtracting, setIsExtracting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Handle Photo Upload & Preview
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;

    const blobUrl = URL.createObjectURL(file);
    setResumeUrl(blobUrl);

    setIsExtracting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const typedarray = new Uint8Array(event.target?.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
      }
      setResumeText(fullText);
      setIsExtracting(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = () => {
    if (!name) return alert("Please enter a name.");
    
    onSave({
      id: Math.random().toString(36).substring(7),
      name,
      portfolio,
      leetcode,
      resumeText,
      resumeUrl,
      photo // Saving the Base64 photo string
    });

    // Reset Form
    setName(''); setPortfolio(''); setLeetcode('');
    setResumeText(''); setResumeUrl(null); setPhoto(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register New Candidate</h2>
      
      <div style={styles.form}>
        {/* PHOTO UPLOAD SECTION */}
        <div style={styles.photoUploadContainer}>
          <label style={styles.label}>Profile Picture</label>
          <div 
            style={{
              ...styles.photoPreview, 
              backgroundImage: photo ? `url(${photo})` : 'none',
              border: photo ? '2px solid #10b981' : '2px dashed #cbd5e1'
            }} 
            onClick={() => photoInputRef.current?.click()}
          >
            {!photo && <span style={styles.plusIcon}>+</span>}
          </div>
          <input 
            type="file" 
            ref={photoInputRef} 
            hidden 
            accept="image/*" 
            onChange={handlePhotoUpload} 
          />
          <p style={styles.hint}>Click to upload .jpg or .png</p>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jane Doe" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Portfolio URL</label>
          <input style={styles.input} value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="https://..." />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>LeetCode URL</label>
          <input style={styles.input} value={leetcode} onChange={e => setLeetcode(e.target.value)} placeholder="leetcode.com/u/..." />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Technical Resume</label>
          <button 
            type="button" 
            style={resumeUrl ? styles.uploadedBtn : styles.uploadBtn} 
            onClick={() => fileInputRef.current?.click()}
          >
            {isExtracting ? "ANALYZING PDF..." : resumeUrl ? "✅ PDF ATTACHED" : "UPLOAD RESUME (.PDF)"}
          </button>
          <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={handleResumeUpload} />
        </div>

        <button style={styles.saveBtn} onClick={handleSubmit}>CREATE CANDIDATE PROFILE</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { flex: 1, padding: '60px', background: '#fff', overflowY: 'auto' },
  title: { fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '40px' },
  form: { maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '24px' },
  
  // Photo UI
  photoUploadContainer: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' },
  photoPreview: { 
    width: '100px', 
    height: '100px', 
    borderRadius: '16px', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundColor: '#f8fafc', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  plusIcon: { fontSize: '32px', color: '#94a3b8', fontWeight: 300 },
  hint: { fontSize: '11px', color: '#94a3b8' },

  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' },
  input: { padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' },
  
  uploadBtn: { padding: '14px', borderRadius: '10px', border: '2px dashed #cbd5e1', background: '#f8fafc', color: '#64748b', fontWeight: 600, cursor: 'pointer' },
  uploadedBtn: { padding: '14px', borderRadius: '10px', border: '2px solid #10b981', background: '#ecfdf5', color: '#059669', fontWeight: 700, cursor: 'pointer' },
  
  saveBtn: { marginTop: '20px', padding: '18px', borderRadius: '12px', border: 'none', background: '#0f172a', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }
};

export default MiddleSection;