// pages/api/dalle/index.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const userPrompt = req.body.prompt;
      const goalVisualizationPrompt = `Create an inspiring visual representation of the following goal: ${userPrompt}`;
  
      try {
        const openAIResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: goalVisualizationPrompt,
            n: 1, // Number of images to generate
            // You can add other parameters here if needed
          }),
        });
  
        const data = await openAIResponse.json();
  
        if (openAIResponse.status !== 200) {
          throw new Error(data.error.message);
        }
  
        res.status(200).json({ image: data.data[0].url }); // Send the image URL back to the client
      } catch (error) {
        console.error('DALL-E API Error:', error);
        res.status(500).json({ message: 'Failed to fetch image from DALL-E', error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  }
  