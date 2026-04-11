import { Candidate } from '../AllCandidates';

const LeftSection = ({ candidates }: { candidates: Candidate[] }) => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.header}>CANDIDATES ({candidates.length})</h3>
      <div style={styles.list}>
        {candidates.map((c) => (
          <div key={c.id} style={styles.candidateItem} title={c.name}>
            <div 
              style={{
                ...styles.avatar,
                backgroundImage: c.photo ? `url(${c.photo})` : 'none',
                backgroundColor: c.photo ? 'transparent' : '#e2e8f0'
              }} 
            />
            <span style={styles.nameLabel}>{c.name}</span>
          </div>
        ))}
        {candidates.length === 0 && (
          <p style={styles.empty}>No candidates added yet.</p>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: { width: '260px', padding: '24px', backgroundColor: '#f8fafc', borderRight: '1px solid #edf2f7', overflowY: 'auto' },
  header: { fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1.5px', marginBottom: '20px' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  candidateItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '8px', transition: 'background 0.2s', cursor: 'pointer' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  nameLabel: { fontSize: '14px', color: '#334155', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  empty: { fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }
};

export default LeftSection;