import { useState, useEffect, useRef } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { agent } from '../IndividualCandidates/utils/agent';
import { scrapData } from '../IndividualCandidates/utils/scraper';
import { overall_agent } from '../../agents/overall_agent';
import { getFullContextForCompression } from '../IndividualCandidates/utils/storage';

export type UploadedItem = { 
  id: string; 
  name: string; 
  type: 'file' | 'url'; 
  content?: string; 
};

function IndividualCandidate({ selectedCandidate, onBack }: any) {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [aiResults, setAiResults] = useState<{ domain: string; content: string }[]>([]);
  const [overallResult, setOverallResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGrid, setShowGrid] = useState(false); // Controls the view swap
  const [activeView, setActiveView] = useState<{ type: 'url' | 'file'; content: string } | null>(null);

  const [resumeResult, setResumeResult] = useState<any>(null);
  const [portfolioResult, setPortfolioResult] = useState<any>(null);
  const [leetcodeResult, setLeetcodeResult] = useState<any>(null);

  const hasInitiated = useRef(false);

  useEffect(() => {
    if (selectedCandidate && !hasInitiated.current) {
      hasInitiated.current = true;
      triggerSequentialAnalysis();
    }
  }, [selectedCandidate]);

  const triggerSequentialAnalysis = async () => {
    console.log("Started analysing")
    setIsAnalyzing(true);
    console.log("📡 INITIALIZING_SEQUENTIAL_UPLINK...");

    try {
      // 1. RESUME_AGENT
      const resumeItem = items.find(i => i.name.toLowerCase().includes('resume'));
      if (resumeItem?.content) {
        console.log("Step 1: Analyzing Resume...");
        const res = await agent({ resume: resumeItem.content });
        setResumeResult(res);
      }

      // 2. PORTFOLIO_AGENT
      const portfolioItem = items.find(i => i.type === 'url' && !i.name.includes('leetcode'));
      if (portfolioItem) {
        console.log("Step 2: Analyzing Portfolio...");
        const scrap = await scrapData(portfolioItem.name);
        if (scrap.success) {
          const res = await agent({ portfolio: portfolioItem.content ?? "" });
          setPortfolioResult(res);
        }
      }

      // 3. LEETCODE_AGENT
      const leetcodeItem = items.find(i => i.name.includes('leetcode'));
      if (leetcodeItem) {
        console.log("Step 3: Analyzing LeetCode...");
        const scrap = await scrapData(leetcodeItem.name);
        if (scrap.success) {
          // Assuming you have a specific leetcode_agent or common agent util
          const res = await agent({ leetcode: scrap.data ?? "" });
          setLeetcodeResult(res);
        }
      }

      // 4. OVERALL_AGENT
      console.log("Step 4: Synthesizing Overall Verdict...");
      const fullStoreRaw = getFullContextForCompression();
      if (fullStoreRaw) {
        const fullStore = JSON.parse(fullStoreRaw);
        const summary = await overall_agent(fullStore.analyses);
        setOverallResult(summary);
      }

      console.log("✅ ALL_SYSTEMS_SYNCHRONIZED");
    } catch (e) {
      console.error("UPLINK_INTERRUPTED", e);
    } finally {
      setIsAnalyzing(false);
    }
  };
  

  const addItem = (name: string, type: 'file' | 'url', content?: string) => {
    setItems((prev) => {
      if (prev.some(item => item.name === name)) return prev;
      return [{ id: Math.random().toString(36).substring(7), name, type, content }, ...prev];
    });
  };

  const runAnalysis = async () => {
    if (items.length === 0) return;
    
    setShowGrid(true); // Switch middle view to Grid immediately
    setIsAnalyzing(true);
    setAiResults([]);
    setOverallResult(null); 

    for (const item of items) {
      let dataToAnalyze = "";
      let label = item.name;
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
          console.log("All labels ", label)
          const report = await agent({ [label]: dataToAnalyze });
          setAiResults((prev) => [...prev, { domain: label, content: report }]);
        }
      } catch (e) { console.error(`Failed: ${item.name}`, e); }
    }

    try {
      const fullStoreRaw = getFullContextForCompression();
      if (fullStoreRaw) {
        const fullStore = JSON.parse(fullStoreRaw);
        if (fullStore.analyses?.length > 0) {
          const summary = await overall_agent(fullStore.analyses);
          setOverallResult(summary);
        }
      }
    } catch (e) { console.error("Overall Analysis failed", e); }
    setIsAnalyzing(false);
  };

  return (
    
    <div style={styles.appShell}>
      <button onClick={onBack} style={styles.backBtn}>← GALLERY</button>
      
      <LeftSection 
        items={items} 
        onAdd={addItem} 
        onRun={runAnalysis} 
        isAnalyzing={isAnalyzing} 
        selectedCandidate={selectedCandidate}
        onViewSource={(type, content) => {
          setShowGrid(false); // Switch back to viewer when a source is clicked
          setActiveView({ type, content });
        }}
      />
      <div style={{flex: 1}}>
      <MiddleSection 
        results ={
          [
            { domain: 'resume', content: resumeResult },
            { domain: 'portfolio', content: portfolioResult },
            { domain: 'leetcode', content: leetcodeResult }
          ]
        }
        overallResult={overallResult}
        isLoading={isAnalyzing} 
        selectedCandidate={selectedCandidate}
        activeView={activeView}
        showGrid={showGrid}
      />
      </div>
      <RightSection />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: { display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#09090b', overflow: 'hidden', position: 'relative' },
  backBtn: { position: 'absolute', top: '20px', right: '20px', zIndex: 100, padding: '8px 16px', background: '#be185d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }
};

export default IndividualCandidate;