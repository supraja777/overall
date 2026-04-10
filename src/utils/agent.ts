import { leetcode_agent } from '../agents/leetcode_agent';
import { portfolio_agent } from '../agents/portfolio_agent';
import { linkedin_agent } from '../agents/linkedin_agent';

/**
 * Orchestrator Agent
 * Routes the scraped data to the correct specialist based on the domain.
 */
export const agent = async (scrappedDataMap: Record<string, string>): Promise<string> => {
  const entries = Object.entries(scrappedDataMap);
  
  if (entries.length === 0) {
    return "No data provided for analysis.";
  }

  // We process the first entry (App.tsx sends one at a time for real-time updates)
  const [domain, content] = entries[0];
  let prompt = "";

  // 1. ROUTING LOGIC
  // Determine which specialist agent should handle this data
  if (domain.includes('linkedin.com')) {
    prompt = linkedin_agent(content);
  } 
  else if (domain.includes('leetcode.com')) {
    prompt = leetcode_agent(content);
  } 
  else if (domain.includes('github.io') || domain.includes('portfolio') || domain.includes('vercel.app')) {
    prompt = portfolio_agent(content);
  } 
  else {
    // Fallback agent for general resumes or unknown professional sites
    prompt = `
      You are a Senior Technical Recruiter. 
      Analyze this professional data from ${domain} and provide a summary of 
      strengths, technical stack, and areas for improvement:
      
      DATA:
      ${content}
    `;
  }

  // 2. EXECUTION
  // Call the Groq Cloud API with the selected prompt
  try {
    const aiResponse = await callGroqModel(prompt);
    return aiResponse;
  } catch (error) {
    console.error("Agent Execution Error:", error);
    return "The AI Agent encountered an error while processing this profile.";
  }
};

/**
 * Groq API Handler
 * Connects to the Llama-3.3-70b model via Groq.
 */
async function callGroqModel(prompt: string): Promise<string> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return "Error: VITE_GROQ_API_KEY is not defined in your .env file.";
  }

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
        max_tokens: 4096 // Ensures you get the complete analysis back
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
    return "Connection Error: Please ensure your Groq API Key is valid and the CORS extension is enabled in your browser.";
  }
}