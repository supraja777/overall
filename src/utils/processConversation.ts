import { conversation_agent } from '../agents/conversation_agent';

export const processConversation = async (history: { role: 'recruiter' | 'ai', content: string }[]) => {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  
  // Generate the professional prompt based on chat history
  const prompt = conversation_agent(history);

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
            content: "You are a professional recruiting assistant. Keep responses helpful and brief." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
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