# Autonomous AI Observer

A small web app that demonstrates an AI-style autonomous agent that can initiate observations without waiting for a user message.

## What it does
- Runs an autonomous "thought loop" on a timer.
- Tracks internal state: energy, curiosity, attention and recent events.
- Generates spontaneous observations from simulated surroundings.
- Lets you type messages and receive responses.
- Uses browser speech synthesis for optional spoken output.
- Works as a static GitHub Pages site.

## Important
This is **not genuinely self-aware or conscious**. It is an autonomous agent simulation: it can initiate messages and maintain state without being prompted.

## GitHub Pages
Upload all files to a repository, then enable GitHub Pages for the `main` branch and `/ (root)`.

For real AI responses, replace the demo `generateThought()` function in `src/agent.js` with calls to an AI backend. Do not put a private API key directly in browser JavaScript.
