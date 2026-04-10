import { leetcode_agent } from '../agents/leetcode_agent';
import { portfolio_agent } from '../agents/portfolio_agent';
import { resume_agent } from '../agents/resume_agent';

/**
 * Main Orchestrator Agent
 * Receives the map of scrapped data and routes each domain to the correct specialist.
 */
export const agent = async (scrappedDataMap: Record<string, string>) => {
  console.log("%c--- AGENT ORCHESTRATOR STARTING ---", "color: #4F46E5; font-weight: bold;");
  console.log("hello agent");
console.log("Keys received by agent:", Object.keys(scrappedDataMap));
  // Loop through each entry in the map
  for (const [domain, content] of Object.entries(scrappedDataMap)) {
    
    let prompt = "";

    if (domain.includes('leetcode.com')) {
        prompt = leetcode_agent(content);
    } 
    // 2. Check for specific Portfolio domains (like github.io)
    else if (domain.includes('github.io') || domain.includes('portfolio')) {
        prompt = portfolio_agent(content);
    }
    // 3. Check for Resume keywords only if it's not a known portfolio domain
    else if (content.toLowerCase().includes('resume') || domain.includes('resume')) {
        prompt = resume_agent(content);
    } 
    // 4. Default fallback
    else {
        prompt = portfolio_agent(content);
    }

    // 2. EXECUTION: If a prompt was generated, call the Groq model
    if (prompt) {
      console.log(`%cProcessing ${domain} with AI...`, "color: #f59e0b;");
      
      const aiResponse = await callGroqModel(prompt);
      
      console.log(`%c--- AI REPORT FOR ${domain.toUpperCase()} ---`, "color: #10b981; font-weight: bold;");
      console.log(aiResponse);
      console.log("%c----------------------------------", "color: #10b981;");
    }
  }

  console.log("%c--- AGENT ORCHESTRATOR FINISHED ---", "color: #4F46E5; font-weight: bold;");
};

/**
 * Utility to communicate with the Groq API
 */
async function callGroqModel(prompt: string) {
  // Using the Vite environment variable you set up
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; 
  
  if (!GROQ_API_KEY || GROQ_API_KEY === "gsk_") {
    console.error("❌ ERROR: VITE_GROQ_API_KEY is missing or incomplete in your .env file.");
    return "Agent Error: Missing API Key.";
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
            content: "You are a professional technical recruiter and data analyst. Provide structured, insightful summaries from the provided raw data." 
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: 0.6
      })
    });

    // Parse the response
    const result = await response.json();

    // Safely check for the content using optional chaining
    if (result?.choices?.[0]?.message?.content) {
      return result.choices[0].message.content;
    } else {
      // This will capture things like "Invalid API Key" or "Rate Limit"
      const errorMessage = result?.error?.message || "Unknown API Error";
      console.error("Groq API Error Detail:", result);
      return `Groq Error: ${errorMessage}`;
    }

  } catch (error) {
    console.error("Network/CORS Error:", error);
    return "Connection Error: Please ensure you have a CORS extension enabled for local browser requests to Groq.";
  }
}