import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { Candidate } from '../../App';

interface AllCandidatesProps {
  candidates: Candidate[];
  onSave: (c: Candidate) => void;
  onSelect: (c: Candidate) => void;
}

const AllCandidates = ({ candidates, onSave, onSelect }: AllCandidatesProps) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Ensure onSelect is passed here */}
      <LeftSection candidates={candidates} onSelect={onSelect} />
      
      <MiddleSection onSave={onSave} />
      
      <RightSection />
    </div>
  );
};

export default AllCandidates;