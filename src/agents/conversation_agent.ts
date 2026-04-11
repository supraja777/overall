export const conversation_agent = (history: { role: 'recruiter' | 'ai' | 'system', content: string }[]) => {
  // Format the history into a readable string for the LLM
  const formattedHistory = history
    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n");

  return `
    You are a Senior Technical Recruiter AI. You are discussing candidate profiles with a human recruiter.
    
    CONVERSATION HISTORY:
    ${formattedHistory}

    INSTRUCTIONS:
    1. Be concise, professional, and insightful.
    2. If the recruiter asks about a specific candidate, refer to the "Intelligence Feed" data.
    3. Suggest interview questions or identify potential red flags if asked.
    4. Stay in character as a helpful AI assistant.

    RESPONSE:
  `;
};