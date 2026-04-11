import { callGroqModel } from '../components/IndividualCandidates/utils/agent'; // Reuse your existing Groq caller

export const overall_agent = async (allAnalyses: any[]) => {
  const formattedData = allAnalyses.map(a => `[Source: ${a.domain}]\n${a.report}`).join("\n\n---\n\n");

  const prompt = `
    You are a Lead Technical Architect and Head of Talent. 
    You have been provided with several specialist analyses for a single candidate (Resume, LeetCode, Portfolio, etc.).
    
    COMPILATION OF ANALYSES:
    ${formattedData}

    TASK:
    Generate a high-level "Executive Summary" for this candidate.
    
    STRUCTURE:
    1. **Candidate Match Score**: (X/100) based on technical depth and consistency.
    2. **The "Edge"**: What makes this candidate stand out across all platforms?
    3. **Technical Verdict**: Summarize their actual coding ability vs. their resume claims.
    4. **Hiring Recommendation**: (Strong Hire / Lean Hire / Pass) with a 1-sentence justification.

    Keep it professional, sharp, and formatted in clean Markdown.
  `;

  return await callGroqModel(prompt);
};