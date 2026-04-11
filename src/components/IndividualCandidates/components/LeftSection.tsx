import React, { useState, useRef, useEffect } from 'react';
import CandidateProfile from './CandidateProfiile';
interface LeftSectionProps {
  items: any[];
  onAdd: (name: string, type: 'file' | 'url', content?: string) => void;
  onViewSource: (type: 'url' | 'file', content: string) => void; 
  onRun: () => void;
  isAnalyzing: boolean;
  selectedCandidate?: any;
}

const LeftSection = ({ items, onAdd, onViewSource, onRun, isAnalyzing, selectedCandidate }: LeftSectionProps) => {
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Items : ", items)
    if (selectedCandidate) {
      if (selectedCandidate.portfolio) onAdd(selectedCandidate.portfolio, 'url');
      if (selectedCandidate.leetcode) onAdd(selectedCandidate.leetcode, 'url');
      if (selectedCandidate.resumeText) {
        onAdd(`${selectedCandidate.name}_Resume.pdf`, 'file', selectedCandidate.resumeText);
      }
    }
  }, [selectedCandidate?.id]);

  return (
    <div style={styles.sidebar}>
     <div>
        <CandidateProfile 
        name= {selectedCandidate.name} 
        email="supraja@uc.edu" 
        phone="+1 513 000 0000" 
      />
        </div>

      <div style={styles.content}>
        <span style={styles.label}>QUEUE ({items.length})</span>
        
        <div style={styles.list}>
          {items.map((it) => (
            <div 
              key={it.id} 
              style={styles.itemCard}
              onClick={() => onViewSource(it.type, it.type === 'url' ? it.name : it.content || "")}
            >
              <span style={{ fontSize: '18px' }}>{it.type === 'file' ? '📄' : '🔗'}</span> 
              <div style={styles.itemTextContainer}>
                <div style={styles.itemName}>{it.name}</div>
                <div style={styles.itemType}>{it.type.toUpperCase()} SOURCE</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <input style={styles.input} placeholder="Enter URL..." value={url} onChange={(e) => setUrl(e.target.value)} />
        <div style={styles.buttonGroup}>
          <button onClick={() => { if(url) { onAdd(url, 'url'); setUrl(''); } }} style={styles.addBtn}>Add URL</button>
          <button onClick={() => fileInputRef.current?.click()} style={styles.uploadBtn}>Add PDF</button>
          <input type="file" ref={fileInputRef} hidden accept=".pdf" />
        </div>
        <button onClick={onRun} disabled={isAnalyzing || items.length === 0} style={styles.runBtn}>
          {isAnalyzing ? 'SYNTHESIZING...' : 'ANALYZE CANDIDATE'}
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: { width: '320px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b', background: '#09090b', height: '100vh', color: '#fff' },
  brand: { padding: '32px 24px', display: 'flex', gap: '12px', alignItems: 'center' },
  logo: { background: 'linear-gradient(135deg, #6366f1, #a855f7)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  brandName: { fontSize: '14px', fontWeight: 800, margin: 0 },
  targetBadge: { fontSize: '9px', color: '#6366f1', fontWeight: 800, textTransform: 'uppercase' },
  content: { flex: 1, padding: '0 24px', overflowY: 'auto' },
  label: { fontSize: '10px', fontWeight: 800, color: '#475569', marginBottom: '16px', display: 'block' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  itemCard: { padding: '12px', background: '#111827', borderRadius: '10px', border: '1px solid #1e293b', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' },
  itemTextContainer: { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  itemName: { fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#f1f5f9' },
  itemType: { fontSize: '8px', color: '#6366f1', fontWeight: 800 },
  footer: { padding: '24px', borderTop: '1px solid #1e293b' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', background: '#020617', border: '1px solid #1e293b', color: 'white', marginBottom: '10px' },
  buttonGroup: { display: 'flex', gap: '8px', marginBottom: '10px' },
  addBtn: { flex: 1, padding: '8px', borderRadius: '6px', background: 'transparent', border: '1px solid #334155', color: '#fff', fontSize: '10px', cursor: 'pointer' },
  uploadBtn: { flex: 1, padding: '8px', borderRadius: '6px', background: '#312e81', border: 'none', color: '#fff', fontSize: '10px', cursor: 'pointer' },
  runBtn: { width: '100%', padding: '12px', borderRadius: '8px', background: '#fff', color: '#000', fontWeight: 900, cursor: 'pointer' }
};

export default LeftSection;