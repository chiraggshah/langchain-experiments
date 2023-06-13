import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

dotenv.config();

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  verbose: true,
});

const memory = new BufferMemory();

const chain = new ConversationChain({ llm: model, memory });

const first_response = await chain.call({ input: "Hi, I am Chirag." });

console.log(first_response);

const second_response = await chain.call({ input: "What is my name?" });

console.log(second_response);
