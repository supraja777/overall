import { useState } from 'react';
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

  const addItem = (name: string, type: 'file' | 'url', content?: string) => {
    setItems((prev) => {
      // 🛑 DUPLICATION CHECK: Prevent adding the same name/URL twice
      if (prev.some(item => item.name === name)) return prev;

      const newItem: UploadedItem = { 
        id: Math.random().toString(36).substring(7), 
        name, 
        type, 
        content 
      };
      return [newItem, ...prev];
    });
  };

  const runAnalysis = async () => {
    if (items.length === 0) return;
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
          const report = await agent({ [label]: dataToAnalyze });
          setAiResults((prev) => [...prev, { domain: label, content: report }]);
        }
      } catch (e) {
        console.error(`Failed: ${item.name}`, e);
      }
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
    } catch (e) {
      console.error("Overall Analysis failed", e);
    }
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
      />
      <MiddleSection 
        results={aiResults} 
        overallResult={overallResult}
        isLoading={isAnalyzing} 
        selectedCandidate={selectedCandidate}
      />
      <RightSection />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: { display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#fce7f3', overflow: 'hidden', position: 'relative' },
  backBtn: { position: 'absolute', top: '20px', right: '20px', zIndex: 100, padding: '8px 16px', background: '#be185d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }
};

export default IndividualCandidate;