export default async function handler(req, res) {
  if (req.method === 'POST') {
    const user_input = req.body.input;

    try {
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Use the correct model identifier here
          messages: [
            {
              role: "system",
              content: "You are a helpful therapist. Listen to the user's concerns and provide supportive advice."
            },
            {
              role: "user",
              content: user_input
            }
          ],
        }),
      });

      const data = await openAIResponse.json();

      if (openAIResponse.status !== 200) {
        console.error('OpenAI Error Response:', data);
        return res.status(openAIResponse.status).json({ message: 'Failed to fetch response from OpenAI', error: data });
      }

      // Assuming the last message is the AI's response
      const lastMessage = data.choices[0].message.content;

      res.status(200).json({ answer: lastMessage.trim() });
    } catch (error) {
      console.error('Error connecting to OpenAI:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
