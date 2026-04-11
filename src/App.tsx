import { useState } from 'react';
import AllCandidates from './components/AllCandidates/AllCandidates';
import IndividualCandidate from './components/IndividualCandidates/IndividualCandidate';

// Ensure your interface matches what you save in the form
export interface Candidate {
  id: string;
  name: string;
  photo: string | null;
  portfolio: string;
  leetcode: string;
  resumeText?: string; // Add this line
}

function App() {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isIndividualView, setIsIndividualView] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleSaveCandidate = (newCandidate: Candidate) => {
    setCandidates((prev) => [...prev, newCandidate]);
  };

  // THIS FUNCTION TRIGGERS THE SWITCH
  const handleSelectCandidate = (candidate: Candidate) => {
    console.log("Selecting candidate:", candidate.name); // Debug log
    console.log("Candidate info ", candidate)
    setSelectedCandidate(candidate);
    setIsIndividualView(true); // Switches the view
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isIndividualView ? (
        <IndividualCandidate 
          jobDescription = {jobDescription}
          selectedCandidate={selectedCandidate} 
          onBack={() => setIsIndividualView(false)} 
        />
      ) : (
        <AllCandidates 
          jobDescription = {jobDescription}
          setJobDescription = {setJobDescription}
          candidates={candidates} 
          onSave={handleSaveCandidate} 
          onSelect={handleSelectCandidate} // Pass the handler here
        />
      )}
    </div>
  );
}

export default App;