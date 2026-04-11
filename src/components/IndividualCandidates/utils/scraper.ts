export const scrapData = async (url: string) => {
  console.log(`Jina is reading: ${url}...`);

  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      method: 'GET',
      headers: {
        // Jina returns clean text/markdown by default
        'Accept': 'text/plain' 
      }
    });

    if (!response.ok) throw new Error("Jina Reader failed to fetch the site.");

    const scrappedData = await response.text();
    
    return {
      success: true,
      data: scrappedData
    };
  } catch (error) {
    console.error("Scraper error:", error);
    return { success: false, data: null };
  }
};