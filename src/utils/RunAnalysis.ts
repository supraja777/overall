import { scrapData } from './scraper';

export const RunAnalysis = async () => {
  console.log("🚀 RunAnalysis Triggered");

  // const targetUrl = "https://leetcode.com/u/supraja2529/";

  const targetUrl = "https://supraja777.github.io/"
  
  // The variable you requested
  let scrappedData: string | null = null;

  const result = await scrapData(targetUrl);

  if (result.success) {
    scrappedData = result.data;
    
    console.log("--- SCRAPPED DATA START ---");
    console.log(scrappedData); // This prints the full Markdown/Text to your console
    console.log("--- SCRAPPED DATA END ---");
  } else {
    console.log("❌ Failed to retrieve data using Jina.");
  }
};