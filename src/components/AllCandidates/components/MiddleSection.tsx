import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Note: Ensure your build environment supports this import style for the worker
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MiddleSection = ({ onSave }: any) => {
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [leetcode, setLeetcode] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [nameError, setNameError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setPhoto(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setResumeFileName(file.name);
    const blobUrl = URL.createObjectURL(file);
    setResumeUrl(blobUrl);
    setIsExtracting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const typedarray = new Uint8Array(event.target?.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
      }
      setResumeText(fullText);
      setIsExtracting(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    onSave({
      id: Math.random().toString(36).substring(7),
      name, portfolio, leetcode, resumeText, resumeUrl, photo,
    });
    setName(''); setPortfolio(''); setLeetcode('');
    setResumeText(''); setResumeUrl(null); setResumeFileName(null); setPhoto(null);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Register Applicant</h2>
       
      </div>

      {/* Profile Picture */}
      <div style={styles.card}>
        <p style={styles.cardLabel}>Upload Photo</p>
        <div style={styles.photoRow}>
          <div
            style={{
              ...styles.avatar,
              backgroundImage:  `url(${null})`,
              border: '2px solid #be185d' ,
              width: '100%'
            }}
            onClick={() => photoInputRef.current?.click()}
          > 
            {photo != null && <span>Uploaded photo!</span>}
            {!photo && <span style={styles.avatarPlus}>+</span>}
          </div>
          < >
           <input 
              type="file" 
              ref={photoInputRef} 
              hidden 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              style={{ width: '100px' }} 
            />
          {/* <input type="file" ref={photoInputRef} hidden accept="image/*" onChange={handlePhotoUpload} /> */}
          </>
        </div>
       
      </div>

      {/* Personal Info */}
      <div style={styles.card}>
        <p style={styles.cardLabel}>Candidate's Data</p>
        
        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            style={{ ...styles.input, borderColor: nameError ? '#be185d' : 'rgba(255,255,255,0.1)' }}
            value={name}
            onChange={e => { setName(e.target.value); setNameError(false); }}
            placeholder="e.g. Jane Doe"
          />
          {nameError && <span style={styles.errorText}>CRITICAL: Name Required</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Add links</label>
          <input
            style={styles.input}
            value={portfolio}
            onChange={e => setPortfolio(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div style={{ ...styles.field, marginBottom: 0 }}>
          <label style={styles.label}>Add links</label>
          <input
            style={styles.input}
            value={leetcode}
            onChange={e => setLeetcode(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Resume Upload */}
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <p style={{ ...styles.cardLabel, marginBottom: 0 }}>Add pdf</p>
          {resumeUrl && <span style={styles.badge}>SYNCED</span>}
        </div>

        <div
          style={{
            ...styles.uploadZone,
            borderColor: resumeUrl ? '#be185d' : 'rgba(255,255,255,0.1)',
            backgroundColor: resumeUrl ? 'rgba(190, 24, 93, 0.05)' : '#0f172a',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{ ...styles.uploadIcon, background: resumeUrl ? '#be185d' : 'rgba(255,255,255,0.03)' }}>
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
               <path d="M8 1v9M4.5 5.5L8 2l3.5 3.5M2 12h12v2H2z" stroke={resumeUrl ? "#fff" : "#475569"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: resumeUrl ? '#fff' : '#f1f5f9', margin: 0, fontFamily: 'var(--font-roboto)' }}>
              {isExtracting ? 'EXTRACTING_TEXT...' : resumeFileName || 'Upload Your Resume'}
            </p>
            
          </div>
        </div>
        <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={handleResumeUpload} />
      </div>

      {/* Submit */}
      <button style={styles.submitBtn} onClick={handleSubmit}>
        Create Profile
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#020617', // Match your dashboard
  },
  header: {
    marginBottom: '8px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#f1f5f9',
    margin: 0,
    fontFamily: 'var(--font-roboto)',
    letterSpacing: '1px',
  },
  subheading: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '6px',
  },
  card: {
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  cardLabel: {
    fontSize: '10px',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    marginBottom: '18px',
    fontFamily: 'var(--font-roboto)',
  },
  photoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '12px', // Square-ish like the rest of your UI
    backgroundColor: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'all 0.2s',
  },
  avatarPlus: {
    fontSize: '20px',
    color: '#334155',
  },
  photoHint: {
    fontSize: '11px',
    color: '#64748b',
    lineHeight: 1.5,
    margin: 0,
    fontFamily: 'var(--font-roboto)',
  },
  chooseBtn: {
    marginTop: '10px',
    fontSize: '9px',
    fontWeight: 800,
    color: '#be185d',
    background: 'rgba(190, 24, 93, 0.1)',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontFamily: 'var(--font-roboto)',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '18px',
  },
  label: {
    fontSize: '9px',
    fontWeight: 800,
    color: '#64748b',
    fontFamily: 'var(--font-roboto)',
    letterSpacing: '1px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '13px',
    color: '#f1f5f9',
    background: '#0f172a',
    outline: 'none',
    fontFamily: 'var(--font-roboto)',
  },
  errorText: {
    fontSize: '10px',
    color: '#be185d',
    fontWeight: 700,
  },
  uploadZone: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px dashed',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  uploadIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: '9px',
    fontWeight: 900,
    padding: '2px 8px',
    borderRadius: '4px',
    background: '#be185d',
    color: '#fff',
    fontFamily: 'var(--font-roboto)',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '8px',
    border: 'none',
    background: '#be185d',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'var(--font-roboto)',
    letterSpacing: '1px',
    boxShadow: '0 4px 20px rgba(190, 24, 93, 0.2)',
  },
};

export default MiddleSection;