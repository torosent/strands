# Strands - Word Puzzle Game

A Next.js implementation inspired by the New York Times Strands word game.
Demo at [strands.tomer.dev](https://strands.tomer.dev)

## About the Game

Strands is a word puzzle game where players find words that share a common theme. The goal is to find all the words hidden in the grid that relate to the theme displayed at the top of the board.

- Words can be formed by connecting adjacent letters in any direction
- All theme words are placed on the board without overlapping
- When you find a word, it remains highlighted on the board
- The game is complete when you find all the theme words

## Features

- 100+ unique puzzles with diverse themes
- Responsive design works on desktop and mobile
- Light and dark mode support
- Progress tracking
- Random puzzle selection

## Technologies Used

- Next.js 14+ / React 18+
- TypeScript for type safety
- Tailwind CSS for styling
- React Context for state management

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/strands.git
cd strands
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the New York Times Strands game
- Created as an educational project to learn React and Next.js
