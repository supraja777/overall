import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// VITE-SPECIFIC WORKER CONFIG
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface LeftSectionProps {
  items: any[];
  onAdd: (name: string, type: 'file' | 'url', content?: string) => void;
  onRun: () => void;
  isAnalyzing: boolean;
  selectedCandidate?: any; // Kept for auto-ingestion
}

const LeftSection = ({ items, onAdd, onRun, isAnalyzing, selectedCandidate }: LeftSectionProps) => {
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AUTO-POPULATE: Grabs links from the selected candidate profile
  useEffect(() => {
    if (selectedCandidate) {
      const existingNames = items.map(i => i.name);
      if (selectedCandidate.portfolio && !existingNames.includes(selectedCandidate.portfolio)) {
        onAdd(selectedCandidate.portfolio, 'url');
      }
      if (selectedCandidate.leetcode && !existingNames.includes(selectedCandidate.leetcode)) {
        onAdd(selectedCandidate.leetcode, 'url');
      }
    }
  }, [selectedCandidate]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const typedarray = new Uint8Array(event.target?.result as ArrayBuffer);
          
          const loadingTask = pdfjsLib.getDocument({ 
            data: typedarray,
            useWorkerFetch: true,
          });
          
          const pdf = await loadingTask.promise;
          let fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            const pageText = textContent.items
              .map((item: any) => item.str || "")
              .join(" ");
            
            fullText += `[Page ${i}]\n${pageText}\n\n`;
          }

          if (!fullText.trim() || fullText.replace(/\[Page \d+\]/g, "").trim().length < 10) {
            alert("This PDF seems to be an image/scan. Please use a text-based PDF.");
            return;
          }

          onAdd(file.name, 'file', fullText);
        } catch (err: any) {
          console.error("PDF.js critical error:", err);
          alert(`Error reading PDF: ${err.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        onAdd(file.name, 'file', event.target?.result as string);
      };
      reader.readAsText(file);
    }
    e.target.value = "";
  };

  return (
    <div style={styles.sidebar}>
      {/* Brand Section */}
      <div style={styles.brand}>
        <div style={styles.logo}>✦</div>
        <div style={styles.brandTextContainer}>
            <h2 style={styles.brandName}>NEURAL ANALYST</h2>
            {selectedCandidate && <div style={styles.activeUser}>TARGET: {selectedCandidate.name}</div>}
        </div>
      </div>

      {/* Item Queue */}
      <div style={styles.content}>
        <span style={styles.label}>QUEUE ({items.length})</span>
        <div style={styles.list}>
          {items.length === 0 && (
            <div style={styles.emptyHint}>Awaiting sources...</div>
          )}
          {items.map((it) => (
            <div key={it.id} style={styles.itemCard}>
              <span style={{ fontSize: '18px' }}>
                {it.type === 'file' ? '📄' : '🔗'}
              </span> 
              <div style={styles.itemTextContainer}>
                <div style={styles.itemName}>{it.name}</div>
                <div style={styles.itemType}>{it.type.toUpperCase()} SOURCE</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Area */}
      <div style={styles.footer}>
        <input 
          style={styles.input} 
          placeholder="Enter Profile URL..." 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' && url) {
              onAdd(url, 'url');
              setUrl('');
            }
          }}
        />
        
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => { if(url) { onAdd(url, 'url'); setUrl(''); } }} 
            style={styles.addBtn}
          >
            Add URL
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()} 
            style={styles.uploadBtn}
          >
            Upload PDF
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
            accept=".pdf,.txt,.md" 
          />
        </div>

        <button 
          onClick={onRun} 
          disabled={isAnalyzing || items.length === 0} 
          style={{
            ...styles.runBtn,
            opacity: (isAnalyzing || items.length === 0) ? 0.5 : 1,
            cursor: (isAnalyzing || items.length === 0) ? 'not-allowed' : 'pointer'
          }}
        >
          {isAnalyzing ? 'SYNTHESIZING...' : 'ANALYZE CANDIDATE'}
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: { 
    width: '320px', display: 'flex', flexDirection: 'column', 
    borderRight: '1px solid #1e293b', background: '#09090b', 
    height: '100vh', color: '#fff' 
  },
  brand: { padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' },
  logo: { 
    background: 'linear-gradient(135deg, #6366f1, #a855f7)', 
    width: '32px', height: '32px', borderRadius: '8px', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' 
  },
  brandTextContainer: { display: 'flex', flexDirection: 'column' },
  brandName: { fontSize: '14px', fontWeight: 800, letterSpacing: '0.5px', margin: 0 },
  activeUser: { fontSize: '9px', color: '#6366f1', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px' },
  content: { flex: 1, padding: '0 24px', overflowY: 'auto' },
  label: { fontSize: '10px', fontWeight: 800, color: '#475569', letterSpacing: '1.5px', marginBottom: '16px', display: 'block' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  emptyHint: { fontSize: '12px', color: '#1e293b', textAlign: 'center', marginTop: '20px' },
  itemCard: { 
    padding: '12px', background: '#111827', borderRadius: '10px', 
    border: '1px solid #1e293b', display: 'flex', gap: '12px', alignItems: 'center' 
  },
  itemTextContainer: { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  itemName: { fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  itemType: { fontSize: '9px', color: '#6366f1', fontWeight: 800, marginTop: '2px' },
  footer: { padding: '24px', background: '#09090b', borderTop: '1px solid #1e293b' },
  input: { 
    width: '100%', padding: '12px', borderRadius: '8px', background: '#020617', 
    border: '1px solid #1e293b', color: 'white', marginBottom: '12px', 
    boxSizing: 'border-box', outline: 'none', fontSize: '13px' 
  },
  buttonGroup: { display: 'flex', gap: '8px', marginBottom: '12px' },
  addBtn: { 
    flex: 1, padding: '10px', borderRadius: '8px', background: 'transparent', 
    border: '1px solid #334155', color: 'white', cursor: 'pointer', fontSize: '11px', fontWeight: 600 
  },
  uploadBtn: { 
    flex: 1, padding: '10px', borderRadius: '8px', background: '#312e81', 
    border: 'none', color: '#a5b4fc', cursor: 'pointer', fontSize: '11px', fontWeight: 800 
  },
  runBtn: { 
    width: '100%', padding: '14px', borderRadius: '8px', background: '#fff', 
    color: '#000', fontWeight: 900, fontSize: '12px', border: 'none' 
  }
};

export default LeftSection;