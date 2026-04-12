import { useEffect, useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { updateGlobalStorage } from '../IndividualCandidates/utils/storage';

import resumeCachedData from './results/resume_agent_result.json';
import portfolioCachedData from './results/portfolio_agent_result.json';
import leetcodeCachedData from './results/leetcode_agent_result.json';
import executiveCachedData from './results/executive_result_agent.json';
import { resume_agent } from '../../agents/resume_agent';
import { portfolio_agent } from '../../agents/portfolio_agent';
import { scrapData } from './utils/scraper';

// Define the Candidate Interface
export interface Candidate {
  id: string;
  name: string;
  role?: string;
  email?: string;
  // Add any other specific properties you use
}

export type UploadedItem = { 
  id: string; 
  name: string; 
  type: 'file' | 'url'; 
  content?: string; 
};

// Define Props for this component
interface IndividualCandidateProps {
  jobDescription: string;
  selectedCandidate: Candidate; // Properly typed
  onBack: () => void;
}

function IndividualCandidate({ jobDescription, selectedCandidate, onBack }: IndividualCandidateProps) {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [aiResults, setAiResults] = useState<{ domain: string; content: string }[]>([]);
  const [overallResult, setOverallResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGrid, setShowGrid] = useState(true); 
  const [activeView, setActiveView] = useState<{ type: 'url' | 'file'; content: string } | null>(null);

  const addItem = (name: string, type: 'file' | 'url', content?: string) => {
    setItems((prev) => {
      if (prev.some(item => item.name === name)) return prev;
      return [{ id: Math.random().toString(36).substring(7), name, type, content }, ...prev];
    });
  };

  const loadAIresults = async (items: any[]) => {
    console.log("All items ", items)
    console.log("hii")
    
    setIsAnalyzing(true);
    setAiResults([]);
    setOverallResult(null); 
    console.log("All items ", items)
    for (const item of items) {
      let dataToAnalyze = "";
      let label = item.name;
      console.log("Current item ", item)
      try {
        if (item.type === 'file') {
          dataToAnalyze = item.content || "";
        } else {
          const result = await scrapData(item.name);
          if (result.success && result.data) {
            dataToAnalyze = result.data;
            label = new URL(item.name).hostname.replace('www.', '');
          }
        }
        if (dataToAnalyze) {
          console.log("Data to analyse is ", dataToAnalyze)
          console.log("Label is ", label )
          if (label.toLowerCase().includes('resume')) {
            console.log("Processing resume data ")
            const resumeAnalysis = await resume_agent.process(dataToAnalyze);
            console.log("Getting Resume analysis ", resumeAnalysis)
            setAiResults((prev) => [...prev, {domain: label, content : resumeAnalysis}])
          }
          if (label.toLowerCase().includes('portfolio')) {
            console.log("Processing resume data ")
            const portfolioAnalysis = await portfolio_agent.process(dataToAnalyze);
            console.log("Getting Resume analysis ", portfolioAnalysis)
            setAiResults((prev) => [...prev, {domain: label, content : portfolioAnalysis}])
          }

          if (label.toLowerCase().includes('leetcode')) {
            setAiResults((prev) => [...prev, {domain: 'leetcode', content: JSON.stringify(leetcodeCachedData) }])
          }
          // const report = await agent({ [label]: dataToAnalyze });
          // setAiResults((prev) => [...prev, { domain: label, content: "report" }]);
        }
      } catch (e) {
        console.error(`Failed: ${item.name}`, e);
      }
    }

   
    setIsAnalyzing(false);
  };

//   const loadAIresults = async () => {
//   // 1. Start the animation immediately
//   console.log("IN LOAD AI RES")
//   setIsAnalyzing(true);

//   // 2. Wrap the logic in a timeout to create the "natural" delay
//   const resumeAnalysis = await resume_agent.process("Java C++");
  
//     const cachedPayload = [
//       { domain: 'resume', content: resumeAnalysis },
//       { domain: 'portfolio', content: JSON.stringify(portfolio_agent) },
//       { domain: 'leetcode', content: JSON.stringify(leetcodeCachedData) }
//     ];

//     setAiResults(cachedPayload);
//     setOverallResult(executiveCachedData.executive_verdict);

//     updateGlobalStorage('analysis', 'resume', JSON.stringify(resumeCachedData));
//     updateGlobalStorage('analysis', 'portfolio', JSON.stringify(portfolioCachedData));
//     updateGlobalStorage('analysis', 'leetcode', JSON.stringify(leetcodeCachedData));

//     // 3. Stop the animation after 2.5 seconds
//     setIsAnalyzing(false);
  
// };

  const loadCachedData = () => {
  // 1. Start the animation immediately
  setIsAnalyzing(true);

  // 2. Wrap the logic in a timeout to create the "natural" delay
  setTimeout(() => {
    const cachedPayload = [
      { domain: 'resume', content: JSON.stringify(resumeCachedData) },
      { domain: 'portfolio', content: JSON.stringify(portfolioCachedData) },
      { domain: 'leetcode', content: JSON.stringify(leetcodeCachedData) }
    ];

    setAiResults(cachedPayload);
    setOverallResult(executiveCachedData.executive_verdict);

    updateGlobalStorage('analysis', 'resume', JSON.stringify(resumeCachedData));
    updateGlobalStorage('analysis', 'portfolio', JSON.stringify(portfolioCachedData));
    updateGlobalStorage('analysis', 'leetcode', JSON.stringify(leetcodeCachedData));

    // 3. Stop the animation after 2.5 seconds
    setIsAnalyzing(false);
  }, 2500); 
};

  useEffect(() => {
      console.log("Rereah")
  }, [items]);

  useEffect(() => {
    if (selectedCandidate) {
      const USE_CACHED = true; 
      console.log("USE CACHED ?" , USE_CACHED)
      if (USE_CACHED) {
        loadCachedData();
      }  else {
        while (len(items)== 0)
        loadAIresults(items);
      }
    }
    console.log("AI Results ", aiResults)
  }, [selectedCandidate]);

  const runAnalysis = async () => {
    setShowGrid(true);
  };

  return (
    <div style={styles.appShell}>
      {/* Back Navigation - Extreme Top Right */}
      <button onClick={onBack} style={styles.backBtn}>
        ← GALLERY
      </button>
      
      <LeftSection 
        items={items} 
        onAdd={addItem} 
        onRun={runAnalysis} 
        isAnalyzing={isAnalyzing} 
        selectedCandidate={selectedCandidate}
        onViewSource={(type, content) => {
          setShowGrid(false);
          setActiveView({ type, content });
        }}
      />

      <div style={styles.middleContainer}>
        <MiddleSection 
          results={aiResults} 
          overallResult={overallResult}
          isLoading={isAnalyzing} 
          selectedCandidate={selectedCandidate}
          activeView={activeView}
          showGrid={showGrid}
        />
      </div>

      <div style={styles.rightContainer}>
        <RightSection 
          jobDescription={jobDescription} 
          candidate={selectedCandidate} 
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: { 
    display: 'flex', 
    height: '100vh', 
    width: '100vw', 
    backgroundColor: '#09090b', 
    overflow: 'hidden', 
    position: 'relative',
    fontFamily: '"Roboto", sans-serif'
  },
  middleContainer: {
    flex: 1, 
    minWidth: '0', 
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #1e293b',
    backgroundColor: '#020617'
  },
  rightContainer: {
    width: '460px', 
    flexShrink: 0,
    backgroundColor: '#09090b',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10 // Keeps it below the floating back button
  },
  backBtn: { 
    position: 'absolute', 
    top: '18px',        
    right: '18px',      
    zIndex: 1100,       // Higher than rightContainer
    padding: '8px 14px', 
    background: '#be185d', // Solid pink for visibility on dark header
    color: '#fff', 
    border: '1px solid rgba(255, 255, 255, 0.2)', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontSize: '10px', 
    fontWeight: 900,
    fontFamily: 'monospace',
    letterSpacing: '1px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  }
};

export default IndividualCandidate;