'use client';

import dynamic from 'next/dynamic';

// Boards are random, so the server's board would never match the browser's: render only in the browser.
const Game = dynamic(() => import('@/components/Game'), {
  ssr: false,
  loading: () => <p className="py-24 text-center text-gray-600 dark:text-gray-300">Loading puzzle…</p>,
});

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <Game />
    </main>
  );
}
