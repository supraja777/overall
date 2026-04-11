import React from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';

const AllCandidates = () => {
  return (
    <div style={styles.layout}>
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
  }
};

export default AllCandidates;