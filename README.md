# Strands - Word Puzzle Game

A Next.js implementation inspired by the New York Times Strands word game.
Demo at [strands.tomer.dev](https://strands.tomer.dev)

## About the Game

Strands is a word puzzle game where players find words that share a common theme. The goal is to find all the words hidden in the grid that relate to the theme displayed at the top of the board.

The rules follow the NYT game:

- The board is 6 columns by 8 rows, and the theme words fill it entirely with no overlaps
- Drag across letters, or tap them one by one and tap the last letter again to submit
- Letters connect in any direction, so words can bend
- Theme words turn blue when found
- The spangram describes the theme, touches two opposite sides of the board, and turns yellow
- Every 3 non-theme words (4+ letters, from an English word list) earn a hint. A hint outlines a theme word; a second hint shows its letter order
- Finish without hints for a "Perfect!"

Boards are generated at random, so a puzzle can have more than one valid solution. A theme word counts on any path that still lets the remaining words fill the board.

## Features

- 200+ original puzzles with diverse themes
- Responsive design works on desktop and mobile
- Light and dark mode support
- Progress tracking
- Random puzzle selection

## Technologies Used

- Next.js 16 / React 19
- TypeScript for type safety
- Tailwind CSS 4 for styling
- React Context for state management

## Getting Started

### Prerequisites

- Node.js 22.18+ (the tests run TypeScript directly) and npm/yarn

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

5. Run the tests (checks every puzzle fits on the board):
```bash
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the New York Times Strands game
- Created as an educational project to learn React and Next.js
