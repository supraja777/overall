import { useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';

export interface Candidate {
  id: string;
  name: string;
  photo: string | null;
  portfolio: string;
  leetcode: string;
}

const AllCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const addCandidate = (newCandidate: Candidate) => {
    setCandidates((prev) => [...prev, newCandidate]);
  };

  return (
    <div style={styles.layout}>
      {/* Pass the list to the left section */}
      <LeftSection candidates={candidates} />
      
      {/* Pass the save function to the middle section */}
      <MiddleSection onSave={addCandidate} />
      
      <RightSection />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  layout: { display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#ffffff' }
};

export default AllCandidates;