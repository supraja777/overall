// src/utils/storage.ts

interface KnowledgeBase {
  sources: Record<string, string>;
  analyses: { domain: string; report: string; timestamp: string }[];
  conversations: any[];
}

// Check if a global instance already exists, otherwise create it
const INITIAL_STATE: KnowledgeBase = {
  sources: {},
  analyses: [],
  conversations: []
};

if (!(window as any).__GLOBAL_STORE__) {
  (window as any).__GLOBAL_STORE__ = INITIAL_STATE;
}

const getStore = (): KnowledgeBase => (window as any).__GLOBAL_STORE__;

export const updateGlobalStorage = (type: 'source' | 'analysis' | 'chat', key: string, value: any) => {
  const store = getStore();
  
  console.log(`[STORAGE_DEBUG] Attempting to save ${type} for ${key}`);

  if (type === 'source') {
    store.sources[key] = value;
  } else if (type === 'analysis') {
    store.analyses.push({
      domain: key,
      report: value,
      timestamp: new Date().toISOString()
    });
  } else if (type === 'chat') {
    store.conversations = value;
  }
  
  console.log(`[STORAGE_DEBUG] Success. Current Analyses Count:`, store.analyses.length);
};

export const getFullContextForCompression = (): string => {
  return JSON.stringify(getStore(), null, 2);
};