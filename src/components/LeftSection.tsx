import { UploadedItem } from '../App';

interface Props {
  items: UploadedItem[];
  onRun: () => void;
  isAnalyzing: boolean;
}

const LeftSection = ({ items, onRun, isAnalyzing }: Props) => {
  return (
    <div style={styles.container}>
      <div style={styles.topContent}>
        <h2 style={styles.title}>Resources</h2>
        <div style={styles.list}>
          {items.map((item) => (
            <div key={item.id} style={styles.itemCard}>
              <span>{item.type === 'file' ? '📄' : '🔗'}</span>
              <span style={styles.itemName}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.bottomBar}>
        <button 
          style={{...styles.runButton, opacity: isAnalyzing ? 0.6 : 1}} 
          onClick={onRun}
          disabled={isAnalyzing || items.length === 0}
        >
          {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { flex: 1, backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  topContent: { flex: 1, padding: '20px', overflowY: 'auto' },
  title: { fontSize: '18px', fontWeight: 700, color: '#1e293b' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
  itemCard: { display: 'flex', gap: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '13px' },
  itemName: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  bottomBar: { padding: '20px', borderTop: '1px solid #e2e8f0', backgroundColor: 'white' },
  runButton: { width: '100%', padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};

export default LeftSection;