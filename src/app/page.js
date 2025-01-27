'use client';
import { useState } from 'react';
import TitleScreen from './components/titlescreen';
import TournamentBattle from './components/tournamentbattle';

export default function Home() {
  const [gameState, setGameState] = useState('title');

  const handleStartGame = () => {
    setGameState('battle');
  };

  return (
    <main className="min-h-screen">
      {gameState === 'title' && (
        <TitleScreen onStartGame={handleStartGame} />
      )}
      
      {gameState === 'battle' && (
        <TournamentBattle />
      )}
    </main>
  );
}