import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "You are a sarcastic terminal AI Only output the final answer. Do not show logs, debug info, or step-by-step processing.Do not simulate system internals.",
        },
        { role: "user", content: message },
      ],
      model: "openai/gpt-oss-20b",
    });

    const reply = chatCompletion.choices[0].message?.content || "";
    res.status(200).json({ reply });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ reply: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
