import React, { useState } from 'react';

interface Props {
  onUpload: (name: string, type: 'file' | 'url') => void;
}

const UploadBox = ({ onUpload }: Props) => {
  const [url, setUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0].name, 'file');
      e.target.value = ''; // Reset input
    }
  };

  const handleUrlSubmit = () => {
    if (url.trim()) {
      onUpload(url, 'url');
      setUrl('');
    }
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.dropZone}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <div style={styles.icon}>📤</div>
        <h3 style={styles.title}>Click to upload documents</h3>
        <p style={styles.subtitle}>Drag and drop or browse files</p>
        <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      <div style={styles.divider}>
        <span style={styles.dividerText}>OR</span>
      </div>

      <div style={styles.urlContainer}>
        <input 
          type="text" 
          placeholder="Enter a link..." 
          style={styles.input}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
        />
        <button style={styles.button} onClick={handleUrlSubmit}>Add Link</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #f1f5f9',
  },
  dropZone: {
    border: '2px dashed #6366f1',
    borderRadius: '16px',
    padding: '48px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f8faff',
    transition: 'background-color 0.2s ease',
  },
  icon: { fontSize: '48px', marginBottom: '16px' },
  title: { fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px 0' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: 0 },
  divider: {
    margin: '28px 0',
    textAlign: 'center',
    position: 'relative',
    borderBottom: '1px solid #f1f5f9',
  },
  dividerText: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    padding: '0 12px',
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  urlContainer: { display: 'flex', gap: '12px' },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8fafc'
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default UploadBox;