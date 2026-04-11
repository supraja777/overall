import React, { useState, useRef } from 'react';
import { Candidate } from '../AllCandidates';

const MiddleSection = ({ onSave }: { onSave: (c: Candidate) => void }) => {
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [leetcode, setLeetcode] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name) return alert("Please enter a name");
    
    onSave({
      id: Date.now().toString(),
      name,
      portfolio,
      leetcode,
      photo
    });

    // Reset Form
    setName(''); setPortfolio(''); setLeetcode(''); setPhoto(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Candidate</h2>
      <div style={styles.form}>
        <div style={styles.avatarPicker} onClick={() => fileInputRef.current?.click()}>
          <div style={{ ...styles.preview, backgroundImage: photo ? `url(${photo})` : 'none' }}>
            {!photo && "+"}
          </div>
          <input type="file" ref={fileInputRef} hidden onChange={handlePhotoUpload} accept="image/*" />
        </div>

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={styles.input} />
        <input value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="Portfolio URL" style={styles.input} />
        <input value={leetcode} onChange={e => setLeetcode(e.target.value)} placeholder="LeetCode URL" style={styles.input} />
        
        <button onClick={handleSave} style={styles.btn}>Save Candidate</button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { flex: 1, padding: '40px' },
  title: { fontSize: '24px', fontWeight: 700, marginBottom: '32px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' },
  avatarPicker: { marginBottom: '20px', cursor: 'pointer', alignSelf: 'center' },
  preview: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#94a3b8', border: '2px dashed #cbd5e0', backgroundSize: 'cover', backgroundPosition: 'center' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' },
  btn: { padding: '14px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }
};

export default MiddleSection;