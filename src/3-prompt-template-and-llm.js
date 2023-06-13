import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

dotenv.config();

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  verbose: true,
});

const template = "What is a good name for a company that makes {product}?";

const prompt = new PromptTemplate({ template, inputVariables: ["product"] });

const chain = new LLMChain({ llm: model, prompt });

const response = await chain.call({ product: "colorful socks" });

console.log(response);
