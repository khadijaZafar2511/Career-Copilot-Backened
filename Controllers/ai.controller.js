import { generateAIResponse } from "../Services/ai.service.js";


export const chatWithAI = async (req, res) => {
  try {
    const { message, userContext } = req.body;

    const stream = await generateAIResponse({
      prompt: message,
      context: userContext,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content;

      if (token) {
        res.write(`data: ${JSON.stringify(token)}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");

    res.end();
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};