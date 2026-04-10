import React, { useState } from 'react';

const LeftSection = ({ items, onRun, isAnalyzing, onAdd }: any) => {
  const [url, setUrl] = useState('');

  return (
    <div style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.logo}>✦</div>
        <h2 style={styles.brandName}>NEURAL ANALYST</h2>
      </div>

      <div style={styles.content}>
        <span style={styles.label}>DATA SOURCES</span>
        <div style={styles.list}>
          {items.map((it: any) => (
            <div key={it.id} style={styles.itemCard}>
              <span style={{opacity: 0.5}}>🔗</span> {it.name}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <input 
          style={styles.input} 
          placeholder="Paste URL..." 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
        <button onClick={() => {onAdd(url, 'url'); setUrl('');}} style={styles.addBtn}>Add to Queue</button>
        <button onClick={onRun} disabled={isAnalyzing} style={styles.runBtn}>
          {isAnalyzing ? 'PROCESSSING...' : 'RUN INTELLIGENCE'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: { width: '300px', display: 'flex', flexDirection: 'column' as const, borderRight: '1px solid #27272a', background: '#09090b' },
  brand: { padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { background: 'linear-gradient(135deg, #6366f1, #a855f7)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  brandName: { fontSize: '14px', fontWeight: 700, letterSpacing: '1px' },
  content: { flex: 1, padding: '0 24px', overflowY: 'auto' as const },
  label: { fontSize: '10px', fontWeight: 800, color: '#71717a', letterSpacing: '1.5px', marginBottom: '16px', display: 'block' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  itemCard: { padding: '12px', background: '#18181b', borderRadius: '8px', fontSize: '12px', border: '1px solid #27272a', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' },
  footer: { padding: '24px', background: '#09090b', borderTop: '1px solid #27272a' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', color: 'white', marginBottom: '12px', outline: 'none' },
  addBtn: { width: '100%', padding: '10px', borderRadius: '8px', background: 'transparent', border: '1px solid #3f3f46', color: 'white', cursor: 'pointer', marginBottom: '8px', fontSize: '12px' },
  runBtn: { width: '100%', padding: '12px', borderRadius: '8px', background: '#ffffff', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }
};

export default LeftSection;