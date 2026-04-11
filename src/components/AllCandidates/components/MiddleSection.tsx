import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

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
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Register candidate</h2>
        <p style={styles.subheading}>Fill in the details below to create a new candidate profile</p>
      </div>

      {/* Card 1 — Profile Picture */}
      <div style={styles.card}>
        <p style={styles.cardLabel}>Profile picture</p>
        <div style={styles.photoRow}>
          <div
            style={{
              ...styles.avatar,
              backgroundImage: photo ? `url(${photo})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: photo ? '2px solid #10b981' : '1px dashed #cbd5e1',
            }}
            onClick={() => photoInputRef.current?.click()}
          >
            {!photo && <span style={styles.avatarPlus}>+</span>}
          </div>
          <div>
            <p style={styles.photoHint}>Click to upload a photo<br />JPG or PNG, max 5MB</p>
            <button style={styles.chooseBtn} onClick={() => photoInputRef.current?.click()}>
              Choose file
            </button>
          </div>
        </div>
        <input type="file" ref={photoInputRef} hidden accept="image/*" onChange={handlePhotoUpload} />
      </div>

      {/* Card 2 — Personal Info */}
      <div style={styles.card}>
        <p style={styles.cardLabel}>Personal info</p>

        <div style={styles.field}>
          <label style={styles.label}>Full name</label>
          <input
            style={{ ...styles.input, borderColor: nameError ? '#f87171' : '#e2e8f0' }}
            value={name}
            onChange={e => { setName(e.target.value); setNameError(false); }}
            placeholder="e.g. Jane Doe"
          />
          {nameError && <span style={styles.errorText}>Name is required</span>}
        </div>

        <div style={styles.divider} />

        <div style={styles.field}>
          <label style={styles.label}>Portfolio URL</label>
          <input
            style={styles.input}
            value={portfolio}
            onChange={e => setPortfolio(e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div style={{ ...styles.field, marginBottom: 0 }}>
          <label style={styles.label}>LeetCode URL</label>
          <input
            style={styles.input}
            value={leetcode}
            onChange={e => setLeetcode(e.target.value)}
            placeholder="leetcode.com/u/handle"
          />
        </div>
      </div>

      {/* Card 3 — Resume */}
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <p style={{ ...styles.cardLabel, marginBottom: 0 }}>Technical resume</p>
          {resumeUrl && (
            <span style={styles.badge}>Attached</span>
          )}
        </div>

        <div
          style={{
            ...styles.uploadZone,
            borderColor: resumeUrl ? '#10b981' : '#cbd5e1',
            borderStyle: resumeUrl ? 'solid' : 'dashed',
            background: resumeUrl ? '#ecfdf5' : '#f8fafc',
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{ ...styles.uploadIcon, background: resumeUrl ? '#d1fae5' : '#f1f5f9' }}>
            {resumeUrl ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M4.5 5.5L8 2l3.5 3.5M2 12h12v2H2z" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: resumeUrl ? '#059669' : '#1e293b', margin: 0 }}>
              {isExtracting ? 'Analyzing PDF...' : resumeFileName
                ? (resumeFileName.length > 30 ? resumeFileName.substring(0, 27) + '...' : resumeFileName)
                : 'Upload resume'}
            </p>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              {resumeUrl ? 'Click to replace' : 'PDF format · Max 10MB'}
            </span>
          </div>
        </div>
        <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={handleResumeUpload} />
      </div>

      {/* Submit */}
      <button style={styles.submitBtn} onClick={handleSubmit}>
        Create candidate profile
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    flex: 1,
    padding: '48px 60px',
    background: '#e2e8f0',
    overflowY: 'auto',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '28px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 600,
    color: '#0f172a',
    margin: 0,
  },
  subheading: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '4px',
  },

  // Card
  card: {
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '14px',
    padding: '20px 24px',
    marginBottom: '16px',
    maxWidth: '480px',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '16px',
  },

  // Photo
  photoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  },
  avatarPlus: {
    fontSize: '24px',
    color: '#cbd5e1',
    fontWeight: 300,
    lineHeight: 1,
  },
  photoHint: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: 1.6,
    margin: 0,
  },
  chooseBtn: {
    marginTop: '8px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#3b82f6',
    background: '#eff6ff',
    border: 'none',
    borderRadius: '8px',
    padding: '5px 12px',
    cursor: 'pointer',
  },

  // Fields
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
    background: '#ffffff',
    transition: 'border-color 0.15s',
  },
  errorText: {
    fontSize: '12px',
    color: '#ef4444',
  },
  divider: {
    height: '1px',
    background: '#f1f5f9',
    margin: '4px 0 16px',
  },

  // Upload
  uploadZone: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    borderRadius: '10px',
    border: '1px dashed #cbd5e1',
    background: '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  uploadIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Badge
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '6px',
    background: '#d1fae5',
    color: '#059669',
  },

  // Submit
  submitBtn: {
    maxWidth: '480px',
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#0f172a',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'opacity 0.15s',
  },
};

export default MiddleSection;