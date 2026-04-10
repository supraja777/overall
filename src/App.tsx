import { useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import { scrapData } from './utils/scraper';
import { agent } from './utils/agent';

// Define the structure for our queued items
export type UploadedItem = { 
  id: string; 
  name: string; 
  type: 'file' | 'url'; 
  content?: string; // This holds the raw text for PDFs/Files
};

function App() {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [aiResults, setAiResults] = useState<{domain: string, content: string}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Function to add a new source to the queue
  const addItem = (name: string, type: 'file' | 'url', content?: string) => {
    if (!name && type === 'url') return;
    
    const newItem: UploadedItem = { 
      id: Math.random().toString(36).substring(7), 
      name, 
      type, 
      content 
    };
    
    setItems((prev) => [newItem, ...prev]);
  };

  // The core orchestration logic
  const runAnalysis = async () => {
    if (items.length === 0) return;
    
    setIsAnalyzing(true);
    setAiResults([]); // Clear previous results for a fresh run

    for (const item of items) {
      let dataToAnalyze = "";
      let label = item.name;

      try {
        if (item.type === 'file') {
          // DIRECT PATH: Use the text already extracted from the PDF/File
          dataToAnalyze = item.content || "";
        } else {
          // SCRAPE PATH: Fetch data from the web for URLs
          const result = await scrapData(item.name);
          if (result.success && result.data) {
            dataToAnalyze = result.data;
            label = new URL(item.name).hostname.replace('www.', '');
          }
        }

        // Send to the AI Agent if we have data
        if (dataToAnalyze) {
          const report = await agent({ [label]: dataToAnalyze });
          setAiResults((prev) => [...prev, { domain: label, content: report }]);
        }
      } catch (e) {
        console.error(`Failed to process ${item.name}:`, e);
      }
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div style={styles.appShell}>
      {/* Sidebar: Handles Inputs and Queue Display */}
      <LeftSection 
        items={items} 
        onAdd={addItem} 
        onRun={runAnalysis} 
        isAnalyzing={isAnalyzing} 
      />
      
      {/* Main Feed: Displays the AI Intelligence Reports */}
      <MiddleSection 
        results={aiResults} 
        isLoading={isAnalyzing} 
      />
      
      {/* Optional: Right section for specific metrics or Chat */}
      <div style={styles.rightPlaceholder}>
        <div style={styles.badge}>SYSTEM ACTIVE</div>
      </div>
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
    fontFamily: '"Inter", system-ui, sans-serif'
  },
  rightPlaceholder: {
    width: '280px',
    borderLeft: '1px solid #1e293b',
    background: '#09090b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 0'
  },
  badge: {
    fontSize: '10px',
    fontWeight: 900,
    color: '#10b981',
    border: '1px solid #064e3b',
    padding: '4px 12px',
    borderRadius: '100px',
    background: 'rgba(16, 185, 129, 0.05)'
  }
};

export default App;