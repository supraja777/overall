/**
 * Specialist Agent: Resume Analyst
 * Self-executing agent that returns structured JSON for the UI.
 */
export const resume_agent = {
  process: async (resumeData: string): Promise<string> => {
    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    // Hardcoded JD for SDE/Distributed Systems
    const jobDescription = `
      Role: Senior Software Engineer (Backend/Distributed Systems)
      Requirements:
      - 3+ years experience with Java, Spring Boot, and Microservices.
      - Deep understanding of Distributed Systems, Caching (Redis), and Latency Optimization.
      - Experience with SQL (PostgreSQL/MySQL) and Cloud (AWS/GCP).
      - Strong algorithmic problem-solving skills (LeetCode/Competitive Programming).
      - Proven track record of improving system performance and scalability.
    `;

    const systemPrompt = `You are a Senior Technical Recruiter. 
    Analyze the resume against the JD. You MUST return a valid JSON object.
    Identify specific high-impact technical wins.`;

    const userPrompt = `
      JOB DESCRIPTION: 
      ${jobDescription}

      RESUME CONTENT: 
      ${resumeData}

      REQUIRED JSON STRUCTURE:
      {
        "match_percentage": number,
        "top_8_skills": ["string"],
        "experience_history": ["Company Name - (Dates)"],
        "education_history": ["School Name - (Dates)"],
        "relevant_skills_to_jd": ["10 specific matches"],
        "technical_complexity_rating": "1-10 string",
        "quick_verdict": "2-sentence high-level summary"
      }
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
          // Force JSON mode
          response_format: { type: "json_object" }, 
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.1, // Deterministic for structured data
          max_tokens: 2048 
        })
      });

      if (!response.ok) throw new Error("Groq API Failure");

      const result = await response.json();
      console.log("Result", result)
      return result?.choices?.[0]?.message?.content || "{}";
      
    } catch (error) {
      console.error("Resume Specialist Error:", error);
      return JSON.stringify({ 
        match_percentage: 0, 
        quick_verdict: "Neural processor failed to parse resume data." 
      });
    }
  }
};