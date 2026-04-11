import React from 'react';
import { Candidate } from '../../../App';

interface LeftSectionProps {
  candidates: Candidate[];
  onSelect: (c: Candidate) => void;
}

const LeftSection = ({ candidates, onSelect }: LeftSectionProps) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.logo}>✦</div>
        <h2 style={styles.brandName}>NEURAL ANALYST</h2>
      </div>

      <div style={styles.content}>
        <span style={styles.label}>SAVED CANDIDATES ({candidates.length})</span>
        <div style={styles.list}>
          {candidates.map((c) => (
            <div key={c.id} style={styles.itemCard} onClick={() => onSelect(c)}>
              <div 
                style={{
                  ...styles.avatar,
                  backgroundImage: c.photo ? `url(${c.photo})` : 'none',
                  backgroundColor: c.photo ? 'transparent' : '#f1f5f9'
                }} 
              >
                {!c.photo && <span style={{color: '#94a3b8'}}>{c.name.charAt(0)}</span>}
              </div>
              <div style={styles.itemInfo}>
                <div style={styles.itemName}>{c.name}</div>
                <div style={styles.itemStatus}>Click to analyze →</div>
              </div>
            </div>
          ))}
          {candidates.length === 0 && (
            <div style={styles.emptyHint}>No candidates saved yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: { width: '300px', display: 'flex', flexDirection: 'column', background: '#f8fafc', height: '100vh', borderRight: '1px solid #e2e8f0' },
  brand: { padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { background: 'linear-gradient(135deg, #6366f1, #a855f7)', width: '28px', height: '28px', borderRadius: '6px' },
  brandName: { fontSize: '12px', fontWeight: 800, color: '#1e293b', letterSpacing: '0.5px', margin: 0 },
  content: { flex: 1, padding: '0 24px' },
  label: { fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', marginBottom: '20px', display: 'block' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  itemCard: { padding: '12px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  itemInfo: { overflow: 'hidden' },
  itemName: { fontSize: '13px', fontWeight: 600, color: '#1e293b' },
  itemStatus: { fontSize: '10px', color: '#6366f1', fontWeight: 700 },
  emptyHint: { fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '30px' }
};

export default LeftSection;