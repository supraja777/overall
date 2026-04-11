import { leetcode_agent } from '../../../agents/leetcode_agent';
import { portfolio_agent } from '../../../agents/portfolio_agent';
import { linkedin_agent } from '../../../agents/linkedin_agent';
import { resume_agent } from '../../../agents/resume_agent';
import { updateGlobalStorage } from './storage'; // Import the central storage utility

/**
 * Orchestrator Agent
 * Routes the scraped data to the correct specialist and stores results in a global list.
 */
export const agent = async (scrappedDataMap: Record<string, string>): Promise<string> => {
  const entries = Object.entries(scrappedDataMap);
  
  if (entries.length === 0) {
    return "No data provided for analysis.";
  }

  // We process the first entry
  const [domain, content] = entries[0];
  
  // 1. STORE RAW SOURCE DATA
  // Automatically store the input text before processing
  updateGlobalStorage('source', domain, content);

  let prompt = "";

  // 2. ROUTING LOGIC
  if (domain.includes('pdf') || domain.includes('.txt') || domain.includes('FILE:')) {
    prompt = resume_agent(content);
  }
  else if (domain.includes('linkedin.com')) {
    prompt = linkedin_agent(content);
  } 
  else if (domain.includes('leetcode.com')) {
    prompt = leetcode_agent(content);
  } 
  else if (domain.includes('github.io') || domain.includes('portfolio') || domain.includes('vercel.app')) {
    prompt = portfolio_agent(content);
  } 
  else {
    prompt = `
      You are a Senior Technical Recruiter. 
      Analyze this professional data from ${domain} and provide a summary of 
      strengths, technical stack, and areas for improvement:
      
      DATA:
      ${content}
    `;
  }

  // 3. EXECUTION & STORAGE
  try {
    const aiResponse = await callGroqModel(prompt);

    // 4. STORE COMPLETED ANALYSIS
    // This adds the AI's report to the global list for the compression agent
    updateGlobalStorage('analysis', domain, aiResponse);

    return aiResponse;
  } catch (error) {
    console.error("Agent Execution Error:", error);
    return "The AI Agent encountered an error while processing this profile.";
  }
};

/**
 * Groq API Handler
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export async function callGroqModel(prompt: string): Promise<string> {

  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return "Error: VITE_GROQ_API_KEY is not defined in your .env file.";
  }
  // await sleep(15000); // 15 seconds = 15,000 milliseconds
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: "You are a professional Neural Analyst. Your output must be comprehensive, structured, and use professional formatting. Do not truncate your analysis." 
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: 0.6,
        max_tokens: 4096 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Groq API request failed");
    }

    const result = await response.json();
    return result?.choices?.[0]?.message?.content || "Model returned an empty response.";
  } catch (error) {
    console.error("Fetch Error:", error);
    return "Connection Error: Check API Key and CORS settings.";
  }
}