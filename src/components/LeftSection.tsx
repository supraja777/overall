import React, { useState } from 'react';

const LeftSection = ({ items, onRun, isAnalyzing, onAdd }: any) => {
  const [url, setUrl] = useState('');

  return (
    <div style={styles.sidebar}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Source Links</h2>
        <div style={styles.list}>
          {items.map((item: any) => (
            <div key={item.id} style={styles.itemCard}>
              <span style={{fontSize: '18px'}}>🔗</span>
              <div style={styles.itemText}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <input 
          style={styles.input} 
          placeholder="Add URL (LinkedIn, Portfolio...)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={() => {onAdd(url, 'url'); setUrl('');}} style={styles.addButton}>Add Source</button>
        <button 
          onClick={onRun} 
          disabled={isAnalyzing} 
          style={styles.runButton}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Profiles'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: { width: '300px', background: '#ffffff', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' as const },
  container: { flex: 1, padding: '20px', overflowY: 'auto' as const },
  heading: { fontSize: '16px', fontWeight: 600, color: '#000000e6', marginBottom: '16px' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  itemCard: { padding: '12px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: '10px' },
  itemText: { fontSize: '12px', color: '#666', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' },
  footer: { padding: '20px', borderTop: '1px solid #e0e0e0' },
  input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #848484', marginBottom: '10px', boxSizing: 'border-box' as const },
  addButton: { width: '100%', padding: '8px', borderRadius: '1600px', border: '1px solid #0a66c2', background: 'transparent', color: '#0a66c2', fontWeight: 600, cursor: 'pointer', marginBottom: '8px' },
  runButton: { width: '100%', padding: '10px', borderRadius: '1600px', border: 'none', background: '#0a66c2', color: 'white', fontWeight: 600, cursor: 'pointer' }
};

export default LeftSection;