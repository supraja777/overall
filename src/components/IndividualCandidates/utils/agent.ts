import { leetcode_agent } from '../../../agents/leetcode_agent';
import { portfolio_agent } from '../../../agents/portfolio_agent';
import { linkedin_agent } from '../../../agents/linkedin_agent';
import { resume_agent } from '../../../agents/resume_agent';
import { updateGlobalStorage } from './storage';

/**
 * Orchestrator Agent
 * Routes scraped data to specialists.
 */
export const agent = async (scrappedDataMap: Record<string, string>): Promise<string> => {
  const entries = Object.entries(scrappedDataMap);
  
  if (entries.length === 0) {
    return "No data provided for analysis.";
  }

  const [domain, content] = entries[0];
  
  // 1. STORE RAW SOURCE (For the Source Dossier view)
  updateGlobalStorage('source', domain, content);

  try {
    let aiResponse = "";

    // 2. SPECIALIST ROUTING
    if (domain.includes('pdf') || domain.includes('.txt') || domain.includes('FILE:')) {
      // Hand off directly to the self-executing resume specialist
      aiResponse = await resume_agent.process(content);
    } 
    else if (domain.includes('linkedin.com')) {
      const prompt = linkedin_agent(content);
      aiResponse = await callGroqModel(prompt);
    } 
    else if (domain.includes('leetcode.com')) {
      const prompt = leetcode_agent(content);
      aiResponse = await callGroqModel(prompt);
    } 
    else if (domain.includes('github.io') || domain.includes('portfolio')) {
      const prompt = portfolio_agent(content);
      aiResponse = await callGroqModel(prompt);
    } 
    else {
      // Fallback for unknown domains
      const fallbackPrompt = `Analyze this professional data from ${domain}: ${content}`;
      aiResponse = await callGroqModel(fallbackPrompt);
    }

    // 3. STORE COMPLETED ANALYSIS
    updateGlobalStorage('analysis', domain, aiResponse);

    return aiResponse;

  } catch (error) {
    console.error("Agent Execution Error:", error);
    return JSON.stringify({ error: "Analysis failed", details: error });
  }
};

/**
 * Fallback Model Handler
 */
export async function callGroqModel(prompt: string): Promise<string> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a professional Neural Analyst." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5
    })
  });

  const result = await response.json();
  return result?.choices?.[0]?.message?.content || "";
}