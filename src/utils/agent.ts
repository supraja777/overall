import { leetcode_agent } from '../agents/leetcode_agent';
import { portfolio_agent } from '../agents/portfolio_agent';

export const agent = async (scrappedDataMap: Record<string, string>) => {
  const [domain, content] = Object.entries(scrappedDataMap)[0];
  
  let prompt = "";
  if (domain.includes('leetcode.com')) {
    prompt = leetcode_agent(content);
  } else {
    prompt = portfolio_agent(content);
  }

  const aiResponse = await callGroqModel(prompt);
  return aiResponse; // Returns the full generated text
};

async function callGroqModel(prompt: string) {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    })
  });

  const result = await response.json();
  return result?.choices?.[0]?.message?.content || "No data returned from AI.";
}