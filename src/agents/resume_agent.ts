/**
 * Specialist Agent: Resume Analyst
 * Enhanced to extract granular professional and academic history.
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

    const systemPrompt = `You are an expert Technical Architect and Recruiter. 
    Analyze the resume with extreme attention to technical detail. 
    You MUST return a valid JSON object. 
    Ensure experience and education are structured as objects for detailed UI rendering.`;

    const userPrompt = `
      JOB DESCRIPTION: 
      ${jobDescription}

      RESUME CONTENT: 
      ${resumeData}

      REQUIRED JSON STRUCTURE:
      {
        "match_percentage": number,
        "top_8_skills": ["string"],
        "detailed_experience": [
          {
            "company": "string",
            "role": "string",
            "duration": "string",
            "highlights": ["3-4 bullet points of specific technical work"],
            "skills_used": ["specific tech stack used at this company"]
          }
        ],
        "detailed_education": [
          {
            "institution": "string",
            "degree": "string",
            "timeline": "string",
            "cgpa": "string or null",
            "key_courses": ["relevant technical subjects"]
          }
        ],
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
          response_format: { type: "json_object" }, 
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.1, 
          max_tokens: 3000 // Increased to accommodate more detailed text
        })
      });

      if (!response.ok) throw new Error("Groq API Failure");

      const result = await response.json();
      console.log("Detailed Analysis Result:", result);
      return result?.choices?.[0]?.message?.content || "{}";
      
    } catch (error) {
      console.error("Resume Specialist Error:", error);
      return JSON.stringify({ 
        match_percentage: 0, 
        quick_verdict: "Critical failure: Neural parser could not synthesize detailed history." 
      });
    }
  }
};