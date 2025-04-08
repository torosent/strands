<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# NYT Strands Game Clone

This is a Next.js implementation of the New York Times Strands word game where players find words that share a common theme.

## Project Structure

- `src/types/game.ts` - Type definitions for the game
- `src/data/puzzles.ts` - Dataset of puzzles
- `src/context/` - React Context providers for game state and theme
- `src/components/` - React components for UI elements 
- `src/app/` - Next.js App Router files

## Project Patterns

- Using TypeScript for type safety
- React Context for state management
- Tailwind CSS for styling
- Light/Dark theme implementation
- Next.js App Router

## Features to Consider

- Adding more puzzles to the dataset
- Implementing user accounts and score tracking
- Adding animations for selecting words
- Creating daily challenges with calendar integration