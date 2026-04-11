import React from 'react';

interface PortfolioTopProps {
  strength: string;      // "High" | "Medium" | "Low"
  projectCount: number;  // e.g., 2
  match: number;         // e.g., 88
}

const PortfolioTop = ({ strength, projectCount, match }: PortfolioTopProps) => (
  <div style={styles.container}>
    <div style={styles.scoreCircle}>
      {match}%
    </div>
    <div style={styles.textContainer}>
      <span style={styles.status}>UPLINK_STRENGTH: <span style={styles.strengthVal}>{strength?.toUpperCase()}</span></span>
      <p style={styles.description}>
        Identified <span style={styles.highlight}>{projectCount} relevant projects</span> proving engineering depth.
      </p>
    </div>
  </div>
);

const styles = {
  container: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px', 
    marginBottom: '25px',
    padding: '15px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  scoreCircle: { 
    width: '60px', 
    height: '60px', 
    borderRadius: '50%', 
    border: '2px solid #be185d',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '16px', 
    fontWeight: 900, 
    color: '#f8fafc', 
    background: 'rgba(190, 24, 93, 0.1)',
    boxShadow: '0 0 15px rgba(190, 24, 93, 0.2)'
  },
  textContainer: { textAlign: 'left' as const },
  status: { 
    fontSize: '9px', 
    fontWeight: 800, 
    color: '#475569', 
    letterSpacing: '1.5px',
    fontFamily: 'var(--font-mono)'
  },
  strengthVal: {
    color: '#10b981', // Emerald green for high strength
    fontWeight: 900
  },
  description: { 
    fontSize: '13px', 
    color: '#cbd5e1', 
    margin: '6px 0 0 0',
    lineHeight: '1.4'
  },
  highlight: { 
    color: '#be185d', 
    fontWeight: 700,
    textDecoration: 'underline',
    textDecorationColor: 'rgba(190, 24, 93, 0.3)'
  }
};

export default PortfolioTop;