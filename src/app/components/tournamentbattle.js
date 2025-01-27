import React, { useState, useEffect } from 'react';
import { Shield, Book, Award, Calendar } from 'lucide-react';

const TournamentBattle = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [battleLog, setBattleLog] = useState([]);
  const [battleState, setBattleState] = useState('active'); // active, won, lost
  const [selectedMove, setSelectedMove] = useState(null);

  // Cultural types system
  const culturalTypes = {
    RITUAL: { strong: ['TECHNOLOGY'], weak: ['TRADE'] },
    TRADE: { strong: ['RITUAL'], weak: ['TECHNOLOGY'] },
    TECHNOLOGY: { strong: ['TRADE'], weak: ['RITUAL'] },
    TRADITION: { strong: ['MODERN'], weak: ['INNOVATION'] },
    MODERN: { strong: ['TRADITION'], weak: ['RITUAL'] },
    INNOVATION: { strong: ['MODERN'], weak: ['TRADITION'] }
  };

  // Tournament opponents and their unique moves
  const opponents = {
    1: {
      name: "Maria Silva",
      culture: "Brazilian",
      badge: "Carnival Spirit Badge",
      specialty: "Festival Traditions",
      moves: [
        {
          name: "Carnival Dance",
          type: "RITUAL",
          power: 50,
          description: "Energetic festival celebration that brings communities together"
        },
        {
          name: "Capoeira Strike",
          type: "TRADITION",
          power: 60,
          description: "Martial art that combines dance, acrobatics, and music"
        },
        {
          name: "Samba Rhythm",
          type: "MODERN",
          power: 45,
          description: "Contemporary dance that energizes cultural connections"
        },
        {
          name: "Festival Spirit",
          type: "RITUAL",
          power: 70,
          description: "Harnesses the collective joy of celebration"
        }
      ]
    },
    2: {
      name: "Yuki Tanaka",
      culture: "Japanese",
      badge: "Harmony Badge",
      specialty: "Tea Ceremonies",
      moves: [
        {
          name: "Tea Ceremony",
          type: "RITUAL",
          power: 55,
          description: "Traditional ceremony emphasizing mindfulness and respect"
        },
        {
          name: "Zen Garden",
          type: "TRADITION",
          power: 45,
          description: "Creates peaceful space for meditation and reflection"
        },
        {
          name: "Origami Art",
          type: "INNOVATION",
          power: 50,
          description: "Paper-folding technique that teaches patience and precision"
        },
        {
          name: "Cherry Blossom Festival",
          type: "RITUAL",
          power: 65,
          description: "Celebrates the ephemeral beauty of nature"
        }
      ]
    },
    // Add more opponents here...
  };

  // Player's cultural moves
  const [playerMoves] = useState([
    {
      name: "Cultural Documentation",
      type: "TECHNOLOGY",
      power: 45,
      description: "Record and analyze cultural practices"
    },
    {
      name: "Field Research",
      type: "INNOVATION",
      power: 55,
      description: "Direct observation and participation in cultural activities"
    },
    {
      name: "Community Engagement",
      type: "TRADE",
      power: 50,
      description: "Build relationships with local community members"
    },
    {
      name: "Comparative Analysis",
      type: "MODERN",
      power: 60,
      description: "Compare and contrast different cultural elements"
    }
  ]);

  const currentOpponent = opponents[currentDay];

  const calculateDamage = (move, isPlayer) => {
    let damage = move.power;
    const attackerType = move.type;
    const defenderType = isPlayer ? currentOpponent.moves[0].type : playerMoves[0].type;

    if (culturalTypes[attackerType].strong.includes(defenderType)) {
      damage *= 1.5;
      setBattleLog(prev => [...prev, "It's highly effective! This approach resonates strongly!"]);
    } else if (culturalTypes[attackerType].weak.includes(defenderType)) {
      damage *= 0.5;
      setBattleLog(prev => [...prev, "It's not very effective... This approach has limited impact."]);
    }

    return Math.round(damage);
  };

  const handleMoveSelect = (move) => {
    if (battleState !== 'active') return;
    
    setSelectedMove(move);
    const playerDamage = calculateDamage(move, true);
    setOpponentHP(prev => Math.max(0, prev - playerDamage));
    setBattleLog(prev => [...prev, `You used ${move.name}! (${move.description})`]);

    // Opponent's turn
    setTimeout(() => {
      const opponentMove = currentOpponent.moves[Math.floor(Math.random() * currentOpponent.moves.length)];
      const opponentDamage = calculateDamage(opponentMove, false);
      setPlayerHP(prev => Math.max(0, prev - opponentDamage));
      setBattleLog(prev => [...prev, `${currentOpponent.name} used ${opponentMove.name}! (${opponentMove.description})`]);
    }, 1000);
  };

  // Check for battle end
  useEffect(() => {
    if (opponentHP <= 0) {
      setBattleState('won');
      setBattleLog(prev => [...prev, `You've won the ${currentOpponent.badge}!`]);
    } else if (playerHP <= 0) {
      setBattleState('lost');
      setBattleLog(prev => [...prev, "You've been defeated! Try again!"]);
    }
  }, [playerHP, opponentHP, currentOpponent.badge]);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Tournament Info */}
        <div className="flex justify-between items-center mb-6 bg-blue-900 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Calendar className="text-yellow-300" />
            <div>
              <h2 className="text-xl text-white font-bold">Day {currentDay}/7</h2>
              <p className="text-yellow-300">{currentOpponent.culture} Culture Battle</p>
            </div>
          </div>
          {battleState === 'won' && (
            <div className="flex items-center gap-2">
              <Award className="text-yellow-300" />
              <span className="text-white">{currentOpponent.badge}</span>
            </div>
          )}
        </div>

        {/* Battle Scene */}
        <div className="bg-gradient-to-b from-purple-900 to-blue-900 rounded-lg p-6 mb-4">
          {/* Opponent */}
          <div className="flex justify-between items-center mb-8">
            <div className="bg-gray-800 rounded p-4 text-white">
              <h3 className="text-xl font-bold mb-2">{currentOpponent.name}</h3>
              <div className="w-48 h-4 bg-gray-700 rounded">
                <div 
                  className="h-full bg-green-500 rounded"
                  style={{ width: `${opponentHP}%` }}
                ></div>
              </div>
              <p className="mt-1">{opponentHP}/100</p>
            </div>
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
              <Shield size={64} className="text-white" />
            </div>
          </div>

          {/* Player */}
          <div className="flex justify-between items-center">
            <div className="w-32 h-32 bg-blue-700 rounded-full flex items-center justify-center">
              <Book size={64} className="text-white" />
            </div>
            <div className="bg-gray-800 rounded p-4 text-white">
              <h3 className="text-xl font-bold mb-2">Cultural Researcher</h3>
              <div className="w-48 h-4 bg-gray-700 rounded">
                <div 
                  className="h-full bg-green-500 rounded"
                  style={{ width: `${playerHP}%` }}
                ></div>
              </div>
              <p className="mt-1">{playerHP}/100</p>
            </div>
          </div>
        </div>

        {/* Battle Controls */}
        <div className="grid grid-cols-2 gap-4">
          {/* Moves */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold text-white mb-4">Research Approaches</h3>
            <div className="grid grid-cols-2 gap-2">
              {playerMoves.map((move, index) => (
                <button
                  key={index}
                  onClick={() => handleMoveSelect(move)}
                  disabled={battleState !== 'active'}
                  className={`p-3 rounded-lg text-white text-left transition-colors ${
                    selectedMove === move 
                      ? 'bg-blue-600' 
                      : battleState === 'active'
                      ? 'bg-blue-800 hover:bg-blue-700'
                      : 'bg-gray-700'
                  }`}
                >
                  <div className="font-bold">{move.name}</div>
                  <div className="text-sm text-gray-300">{move.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Battle Log */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold text-white mb-4">Research Log</h3>
            <div className="h-48 overflow-y-auto text-white space-y-2">
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm">{log}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Post-Battle Options */}
        {battleState !== 'active' && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setPlayerHP(100);
                setOpponentHP(100);
                setBattleLog([]);
                setBattleState('active');
              }}
              className="p-4 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
            >
              Try Again
            </button>
            {battleState === 'won' && (
              <button
                onClick={() => {
                  if (currentDay < 7) {
                    setCurrentDay(prev => prev + 1);
                    setPlayerHP(100);
                    setOpponentHP(100);
                    setBattleLog([]);
                    setBattleState('active');
                  }
                }}
                className="p-4 bg-green-700 text-white rounded-lg hover:bg-green-600"
              >
                Next Opponent
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentBattle;