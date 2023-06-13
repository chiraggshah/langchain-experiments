import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

dotenv.config();

const loader = new DirectoryLoader("docs/", {
  ".txt": (path) => new TextLoader(path),
});

const docs = await loader.load();
console.log({ docs });

const splitter = new CharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const splitDocs = await loader.loadAndSplit(splitter);

console.log("------------------------------------------------------------");
console.log(splitDocs);

const vectorStore = await HNSWLib.fromDocuments(
  splitDocs,
  new OpenAIEmbeddings()
);

console.log("================================================================");
console.log(vectorStore);

console.log("================================================================");

// const result1 = await vectorStore.similaritySearch("SSL strip attack");
// console.log(result1);

// const result2 = await vectorStore.similaritySearch(
//   "how much data can a cookie store"
// );
// console.log(result2);

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  verbose: true,
});

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model),
  retriever: vectorStore.asRetriever(),
  returnSourceDocuments: true,
});

const response = await chain.call({
  query: "how much data can a cookie store?",
  // query: "What is SSL strip attack?",
  // query: "How old is Sachin Tendulkar?",
  // query: "Who is Harry?",
  // query: "Who is Joe?",
});

console.log(response);
console.log("Answer: ", response.text);

const sources = response.sourceDocuments.map((document) => document.metadata);

console.log("Sources: ", sources);

// console.log("---");
// console.log(JSON.stringify(response, null, 2));

// await chat.call("Write me a song about Ruby on Rails.");
