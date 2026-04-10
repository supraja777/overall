interface Props {
  urlMap: Record<string, string>;
}

const RightSection = ({ urlMap }: Props) => {
  const domains = Object.keys(urlMap);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Analysis Results</h2>
      
      {domains.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>📊</div>
          <p>No data analyzed yet.</p>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>
            Add URLs and click "Run Analysis" to see results here.
          </p>
        </div>
      ) : (
        <div style={styles.scrollArea}>
          {domains.map((domain) => (
            <div key={domain} style={styles.dataCard}>
              <div style={styles.domainHeader}>
                <span style={styles.dot}></span>
                <strong>{domain.toUpperCase()}</strong>
              </div>
              <pre style={styles.content}>
                {urlMap[domain]}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderLeft: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  title: {
    padding: '24px',
    fontSize: '18px',
    fontWeight: 700,
    color: '#1e293b',
    borderBottom: '1px solid #f1f5f9',
    margin: 0
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    textAlign: 'center',
    padding: '20px'
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#f8fafc'
  },
  dataCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    overflow: 'hidden'
  },
  domainHeader: {
    padding: '12px 16px',
    backgroundColor: '#f1f5f9',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#475569',
    letterSpacing: '0.05em'
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%'
  },
  content: {
    padding: '16px',
    margin: 0,
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#334155',
    whiteSpace: 'pre-wrap', // Keeps the line breaks from Jina
    wordBreak: 'break-word',
    fontFamily: 'inherit'
  }
};

export default RightSection;