import { useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { agent } from './utils/agent';
import { scrapData } from './utils/scraper';
import { overall_agent } from './agents/overall_agent';
import { getFullContextForCompression } from './utils/storage';

export type UploadedItem = { 
  id: string; 
  name: string; 
  type: 'file' | 'url'; 
  content?: string; 
};

function App() {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [aiResults, setAiResults] = useState<{ domain: string; content: string }[]>([]);
  const [overallResult, setOverallResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addItem = (name: string, type: 'file' | 'url', content?: string) => {
    const newItem: UploadedItem = { 
      id: Math.random().toString(36).substring(7), 
      name, 
      type, 
      content 
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const runAnalysis = async () => {
    if (items.length === 0) return;
    
    setIsAnalyzing(true);
    setAiResults([]);
    setOverallResult(null); // Reset for new run

    // 1. PHASE 1: Run individual specialist agents
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

    // 2. PHASE 2: Run Overall Synthesis Agent
    // This happens AFTER all individual results are stored in our global utility
    try {
      const fullStore = JSON.parse(getFullContextForCompression());
      if (fullStore.analyses.length > 0) {
        const summary = await overall_agent(fullStore.analyses);
        setOverallResult(summary);
      }
    } catch (e) {
      console.error("Overall Analysis failed", e);
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div style={styles.appShell}>
      <LeftSection 
        items={items} 
        onAdd={addItem} 
        onRun={runAnalysis} 
        isAnalyzing={isAnalyzing} 
      />
      
      <MiddleSection 
        results={aiResults} 
        overallResult={overallResult}
        isLoading={isAnalyzing} 
      />
      
      <RightSection />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0a0a0c',
    color: '#e2e8f0',
    overflow: 'hidden',
  }
};

export default App;