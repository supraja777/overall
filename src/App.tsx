import { useState } from 'react';
import LeftSection from './components/LeftSection';
import MiddleSection from './components/MiddleSection';
import RightSection from './components/RightSection';
import { scrapData } from './utils/scraper';
import { agent } from './utils/agent';

// Define the shape of our uploaded resources
export type UploadedItem = {
  id: string;
  name: string; // This stores the actual URL string or filename
  type: 'file' | 'url';
};

function App() {
  // --- STATE ---
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [urlMap, setUrlMap] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- HANDLERS ---

  /**
   * Adds a new item (File or URL) to the list from the Middle Section
   */
  const addItem = (name: string, type: 'file' | 'url') => {
    const newItem: UploadedItem = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      type,
    };
    setItems((prev) => [newItem, ...prev]);
  };

  /**
   * Orchestrates the full pipeline: 
   * 1. Scrape data using Jina
   * 2. Store in local map
   * 3. Call the Multi-Agent system to process with AI
   */
  const runAnalysis = async () => {
    if (items.length === 0) {
      alert("Please add some URLs first!");
      return;
    }

    setIsAnalyzing(true);
    console.log("%c🚀 Starting Pipeline...", "color: #4F46E5; font-weight: bold; font-size: 14px;");

    // Using a local variable because state updates in React are async
    const newMap: Record<string, string> = { ...urlMap };

    // Process all URLs in the list
    for (const item of items) {
      if (item.type === 'url') {
        try {
          // Clean the domain to use as a key (e.g., 'leetcode.com')
          const domain = new URL(item.name).hostname.replace('www.', '');
          
          console.log(`%cScraping content from: ${domain}`, "color: #94a3b8");
          const result = await scrapData(item.name);
          
          if (result.success && result.data) {
            newMap[domain] = result.data;
          }
        } catch (e) {
          console.error(`Invalid URL: ${item.name}`);
        }
      }
    }

    // 1. Update the UI state so the RightPanel displays the raw text
    setUrlMap(newMap);
    
    // 2. Pass the final data to the Agent Orchestrator
    // We await this because the agent now makes real AI model calls
    console.log("%cCalling Agent Orchestrator...", "color: #10b981; font-weight: bold;");
    await agent(newMap); 

    setIsAnalyzing(false);
    console.log("%c✅ Pipeline Finished", "color: #10b981; font-weight: bold; font-size: 14px;");
  };

  return (
    <div style={styles.layout}>
      {/* LEFT: Item List & Run Button */}
      <LeftSection 
        items={items} 
        onRun={runAnalysis} 
        isAnalyzing={isAnalyzing} 
      />
      
      {/* MIDDLE: Upload / Input Box */}
      <MiddleSection 
        onUpload={addItem} 
      />
      
      {/* RIGHT: Display of Scrapped Data Map */}
      <RightSection 
        urlMap={urlMap} 
      />
    </div>
  );
}

// --- STYLES ---
const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  }
};

export default App;