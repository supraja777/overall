import React from 'react';

const MiddleSection = ({ results, isLoading }: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.feed}>
        {results.map((res: any, i: number) => (
          <div key={i} style={styles.card}>
            <div style={styles.header}>
              <div style={styles.avatar}>{res.domain[0].toUpperCase()}</div>
              <div>
                <div style={styles.domainName}>{res.domain}</div>
                <div style={styles.subText}>Comprehensive Analysis</div>
              </div>
            </div>
            {/* PRE-WRAP IS KEY FOR MULTI-LINE AI DATA */}
            <div style={styles.content}>{res.content}</div>
          </div>
        ))}
        {isLoading && <div style={{textAlign: 'center', padding: '20px'}}>Analyzing deep data...</div>}
      </div>
    </div>
  );
};

const styles = {
  container: { flex: 1, overflowY: 'auto' as const, padding: '20px' },
  feed: { maxWidth: '700px', margin: '0 auto' },
  card: { 
    background: '#ffffff', 
    borderRadius: '8px', 
    padding: '24px', 
    marginBottom: '16px', 
    border: '1px solid #e0e0e0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
  },
  header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #f3f2ef', paddingBottom: '12px' },
  avatar: { width: '48px', height: '48px', background: '#0a66c2', color: 'white', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' },
  domainName: { fontWeight: 600, fontSize: '16px', color: '#000000e6' },
  subText: { fontSize: '12px', color: '#666' },
  content: { 
    fontSize: '15px', 
    lineHeight: '1.6', 
    color: '#000000e6', 
    whiteSpace: 'pre-wrap' as const, // Shows newlines and prevents cutoff
    wordBreak: 'break-word' as const 
  }
};

export default MiddleSection;