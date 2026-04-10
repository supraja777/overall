import { useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { scrapData } from './utils/scraper';
import { agent } from './utils/agent';

export type UploadedItem = { id: string; name: string; type: 'file' | 'url' };

function App() {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [aiResults, setAiResults] = useState<{domain: string, content: string}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addItem = (name: string, type: 'file' | 'url') => {
    if (!name) return;
    setItems((prev) => [{ id: Math.random().toString(36).substring(7), name, type }, ...prev]);
  };

  const runAnalysis = async () => {
    if (items.length === 0) return;
    setIsAnalyzing(true);
    setAiResults([]); 

    for (const item of items) {
      try {
        const domain = new URL(item.name).hostname.replace('www.', '');
        const result = await scrapData(item.name);
        if (result.success && result.data) {
          const report = await agent({ [domain]: result.data });
          setAiResults((prev) => [...prev, { domain, content: report }]);
        }
      } catch (e) { console.error(e); }
    }
    setIsAnalyzing(false);
  };

  return (
    <div style={styles.appShell}>
      <LeftSection items={items} onRun={runAnalysis} isAnalyzing={isAnalyzing} onAdd={addItem} />
      <MiddleSection results={aiResults} isLoading={isAnalyzing} />
      <RightSection />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0a0a0c', // Deep Obsidian
    color: '#e2e8f0',
    overflow: 'hidden',
    fontFamily: '"Inter", system-ui, sans-serif'
  }
};

export default App;