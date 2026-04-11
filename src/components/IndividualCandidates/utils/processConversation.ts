import { conversation_agent } from '../../../agents/conversation_agent';
import { getFullContextForCompression } from './storage'; // Import your storage getter

export const processConversation = async (history: { role: 'recruiter' | 'ai' | 'system', content: string }[]) => {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  
  // 1. PULL DATA FROM STORAGE
  const rawStorage = getFullContextForCompression();
  const storageData = JSON.parse(rawStorage);
  
  // 2. FORMAT THE CONTEXT
  // We extract just the reports so the LLM doesn't get overwhelmed by raw source code
  const candidateContext = storageData.analyses.map((a: any) => 
    `DATA FOR ${a.domain}:\n${a.report}`
  ).join("\n\n---\n\n");

  // 3. GENERATE ENHANCED PROMPT
  // We pass both history and the new candidate context
  const chatPrompt = conversation_agent(history);

  // Combine them into a single comprehensive "Super Prompt"
  const finalPrompt = `
    CANDIDATE ANALYSES AVAILABLE:
    ${candidateContext || "No candidate data analyzed yet."}

    ---
    CURRENT CONVERSATION HISTORY:
    ${chatPrompt}

    INSTRUCTION:
    Based on the candidate data above and our conversation, please answer the recruiter's latest message.
  `;

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
            content: "You are an expert Technical Recruiting AI. You have access to detailed candidate analyses (LeetCode, LinkedIn, Resume). Use this specific data to provide evidence-based answers. If asked about a candidate not in the data, let the recruiter know." 
          },
          { role: "user", content: finalPrompt }
        ],
        temperature: 0.5, // Lower temperature for more factual accuracy
        max_tokens: 1000
      })
    });

    if (!response.ok) throw new Error("Chat API failed");

    const result = await response.json();
    return result?.choices?.[0]?.message?.content || "I'm having trouble connecting to my neural network.";
    
  } catch (error) {
    console.error("Chat Error:", error);
    return "Connection error. Please check your API key.";
  }
};