import { useState } from 'react';
import AllCandidates from './components/AllCandidates/AllCandidates';
import IndividualCandidate from './components/IndividualCandidates/IndividualCandidate';

function App() {
  // true = Individual View, false = All Candidates View
  const [isIndividualView, setIsIndividualView] = useState(false);

  return (
    <div style={styles.container}>
      
      {/* 1. DYNAMIC TOP RIGHT BUTTON */}
      <button 
        onClick={() => setIsIndividualView(!isIndividualView)} 
        style={styles.button}
      >
        {isIndividualView ? "View All Candidates" : "View Individual Profile"}
      </button>

      {/* 2. CONDITIONAL RENDERING */}
      <main style={styles.mainContent}>
        {isIndividualView ? (
          <IndividualCandidate />
        ) : (
          <AllCandidates />
        )}
      </main>
      
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff', // Plain white background
    position: 'relative',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    fontFamily: '"Inter", sans-serif'
  },
  button: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#1a202c', // Dark slate/black for visibility
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease'
  },
  mainContent: {
    height: '100%',
    width: '100%',
    overflowY: 'auto' // Allows scrolling within the chosen page
  }
};

export default App;