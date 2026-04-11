/**
 * Specialist Agent: Portfolio Analyst
 * Analyzes personal websites/portfolios to extract technical project depth and JD alignment.
 */
export const portfolio_agent = {
  process: async (portfolioMarkdown: string): Promise<string> => {
    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    // Hardcoded JD for SDE/Distributed Systems alignment
    const jobDescription = `
      Role: Senior Software Engineer (Backend/Distributed Systems)
      Requirements:
      - 3+ years experience with Java, Spring Boot, and Microservices.
      - Deep understanding of Distributed Systems, Caching (Redis), and Latency Optimization.
      - Experience with SQL (PostgreSQL/MySQL) and Cloud (AWS/GCP).
      - Strong algorithmic problem-solving skills (LeetCode/Competitive Programming).
      - Proven track record of improving system performance and scalability.
    `;

    const systemPrompt = `You are an expert Technical Reviewer. 
    Analyze the portfolio content to identify engineering depth. 
    Focus on backend architecture, system design, and performance-oriented projects.
    You MUST return a valid JSON object.`;

    const userPrompt = `
      JOB DESCRIPTION: 
      ${jobDescription}

      PORTFOLIO MARKDOWN CONTENT: 
      ${portfolioMarkdown}

      REQUIRED JSON STRUCTURE:
      {
        "overall_portfolio_strength": "High | Medium | Low",
        "match_percentage": number,
        "main_projects": [
          {
            "title": "Project Name",
            "tech_stack": ["string"],
            "description": "2-sentence summary of the project",
            "technical_depth": "Analysis of the complex challenges solved",
            "impact": "Specific performance or scalability metrics mentioned",
            "jd_relevance_score": number
          }
        ],
        "tech_stack_summary": {
          "languages": ["string"],
          "frameworks": ["string"],
          "infrastructure": ["string"]
        },
        "portfolio_verdict": "Detailed summary of how projects prove the candidate can handle Distributed Systems/Backend roles."
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
          max_tokens: 3000
        })
      });

      if (!response.ok) throw new Error("Groq API Failure");

      const result = await response.json();
      console.log("Portfolio Analysis Result:", result);
      return result?.choices?.[0]?.message?.content || "{}";
      
    } catch (error) {
      console.error("Portfolio Specialist Error:", error);
      return JSON.stringify({ 
        match_percentage: 0, 
        portfolio_verdict: "Neural uplink failed: Could not parse portfolio project architecture." 
      });
    }
  }
};