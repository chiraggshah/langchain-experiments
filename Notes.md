# ai-concepts-learnings

# References:

- https://docs.langchain.com/docs/

- https://www.youtube.com/watch?v=AKsfHK_4tf4

### Model

- A tool or algorithm that has been trained on a set of data to perform specific tasks like recognizing certain patterns.
- GPT-3, GPT-3.5, GPT-4, DALL-E etc

### LLM

- Large Language Model - models trained on large quantities of data.

## Agent

An Agent is a wrapper around a model, which takes in user input and returns a response corresponding to an “action” to take and a corresponding “action input”.

Agents use an LLM to determine which actions to take and in what order. An action can either be using a tool and observing its output, or returning to the user.

It basically analyzes your input, comes up with an action item which is then taken back as an input until the prompt is resolved.

Example: AutoGPT

## Tool

A function that performs a specific duty. This can be things like: Google Search, Database lookup, code REPL, other chains. The interface for a tool is currently a function that is expected to have a string as an input, with a string as an output.

### Temperature

- randomness
- creativity of response
- between 0 and 2, defaults to 1
- higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
- Setting temperature to 0 will make the outputs mostly deterministic, but a small amount of variability may remain.
