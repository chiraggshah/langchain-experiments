import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";

dotenv.config();

const chat = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  verbose: true,
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token) {
        process.stdout.write(token);
      },
    },
  ],
});

await chat.call("Write me a song about Ruby on Rails.");
