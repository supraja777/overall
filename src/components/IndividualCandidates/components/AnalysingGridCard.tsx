import React from 'react';

const AnalysingGridCard = () => {
  return (
    <div style={styles.loadingCardContainer}>
      <div className="neural-comet-trail" style={styles.spinner} />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  loadingCardContainer: {
    height: '240px',
    
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '12px 0',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  spinner: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    padding: '5px', // This defines the "thickness" of the spinner
    background: 'conic-gradient(from 0deg, transparent 40%, #be185d)',
    
    // The mask creates the hollow center for a clean circular look
    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #000 0)',
    mask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #000 0)',
    
    // Adds a subtle atmospheric glow to the pink trail
    filter: 'drop-shadow(0 0 10px rgba(190, 24, 93, 0.4))',
  }
};

export default AnalysingGridCard;