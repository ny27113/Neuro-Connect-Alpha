import { useCallback, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const PAIRS = [
  { icon: '🚀', name: 'Rocket', color: 'coral' },
  { icon: '🪐', name: 'Planet', color: 'purple' },
  { icon: '🌟', name: 'Star', color: 'gold' },
  { icon: '🛰️', name: 'Satellite', color: 'blue' },
  { icon: '👾', name: 'Alien', color: 'green' },
  { icon: '☄️', name: 'Comet', color: 'pink' },
  { icon: '🛸', name: 'UFO', color: 'orange' },
  { icon: '🌙', name: 'Moon', color: 'teal' },
]

const createDeck = () =>
  [...PAIRS, ...PAIRS]
    .map((card, index) => ({ ...card, id: `${card.name}-${index}`, pair: card.name }))
    .sort(() => Math.random() - 0.5)

const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

// The app is intentionally kept in one entry module for this small prototype.
// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const [screen, setScreen] = useState('setup')
  const [mode, setMode] = useState('solo')
  const [deck, setDeck] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [turn, setTurn] = useState(0)
  const [scores, setScores] = useState([0, 0])
  const [seconds, setSeconds] = useState(0)
  const [moves, setMoves] = useState(0)
  const [message, setMessage] = useState('Choose a mode to start your mission.')

  const currentPlayer = turn % 2
  const pairsFound = matched.length / 2
  const totalPairs = PAIRS.length

  const startGame = useCallback((selectedMode = mode) => {
    setMode(selectedMode)
    setDeck(createDeck())
    setFlipped([])
    setMatched([])
    setTurn(0)
    setScores([0, 0])
    setSeconds(0)
    setMoves(0)
    setMessage(selectedMode === 'solo' ? 'Find every pair before the clock runs out.' : 'Player 1 goes first. Find a matching pair!')
    setScreen('game')
  }, [mode])

  useEffect(() => {
    if (screen !== 'game' || mode !== 'solo') return undefined
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [mode, screen])

  useEffect(() => {
    if (flipped.length !== 2) return undefined
    const [first, second] = flipped.map((id) => deck.find((card) => card.id === id))
    const isMatch = first?.pair === second?.pair
    const timeout = window.setTimeout(() => {
      if (isMatch) {
        setMatched((cards) => [...cards, first.id, second.id])
        setScores((current) => current.map((score, index) => index === currentPlayer ? score + 1 : score))
        setMessage(mode === 'solo' ? `Nice match! ${totalPairs - pairsFound - 1} pairs left.` : `Player ${currentPlayer + 1} found a pair and goes again!`)
        if (matched.length + 2 === deck.length) setScreen('results')
      } else {
        setMessage(mode === 'solo' ? 'Not a match. Try another pair.' : `No match — Player ${currentPlayer === 0 ? 2 : 1}, it’s your turn.`)
        setTurn((value) => value + 1)
      }
      setFlipped([])
    }, 700)
    return () => window.clearTimeout(timeout)
  }, [currentPlayer, deck, flipped, matched.length, mode, pairsFound, totalPairs])

  const handleCardClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return
    setFlipped((cards) => [...cards, card.id])
    setMoves((value) => value + 1)
  }

  const visibleStats = useMemo(() => mode === 'solo'
    ? [{ label: 'Pairs found', value: `${pairsFound}/${totalPairs}` }, { label: 'Time', value: formatTime(seconds) }, { label: 'Moves', value: moves }]
    : [{ label: 'Pairs found', value: `${pairsFound}/${totalPairs}` }, { label: 'Player 1', value: scores[0] }, { label: 'Player 2', value: scores[1] }], [mode, moves, pairsFound, scores, seconds, totalPairs])

  if (screen === 'setup') {
    return (
      <main className="page-shell">
        <section className="panel setup-panel" aria-labelledby="game-title">
          <div className="brand-mark" aria-hidden="true">✦</div>
          <p className="eyebrow">Mission control presents</p>
          <h1 id="game-title">Star Crew<br /><span>Memory Match</span></h1>
          <p className="intro">Flip cards, find matching space crew, and help your team complete the mission.</p>
          <div className="crew-strip" aria-hidden="true"><span>🧑‍🚀</span><span>🔭</span><span>🪐</span><span>🛰️</span></div>
          <div className="mode-picker" role="group" aria-label="Choose game mode">
            <button className={mode === 'solo' ? 'mode-card selected' : 'mode-card'} onClick={() => setMode('solo')}>
              <strong>Solo mission</strong><span>Beat your best time</span>
            </button>
            <button className={mode === 'versus' ? 'mode-card selected' : 'mode-card'} onClick={() => setMode('versus')}>
              <strong>Team mission</strong><span>Take turns with a friend</span>
            </button>
          </div>
          <button className="primary-button" onClick={() => startGame()}>Launch mission <span>→</span></button>
          <p className="hint">16 cards · 8 pairs · No account needed</p>
        </section>
      </main>
    )
  }

  if (screen === 'results') {
    const winner = scores[0] === scores[1] ? 'It’s a tie!' : `Player ${scores[0] > scores[1] ? 1 : 2} wins!`
    return (
      <main className="page-shell">
        <section className="panel results-panel" aria-labelledby="results-title">
          <div className="result-icon" aria-hidden="true">🏆</div>
          <p className="eyebrow">Mission complete</p>
          <h1 id="results-title">{mode === 'solo' ? 'You found them all!' : winner}</h1>
          <p className="intro">{mode === 'solo' ? `Amazing memory work in ${formatTime(seconds)} and ${moves} moves.` : 'Great teamwork, space cadets!'}</p>
          <div className="result-stats">{visibleStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
          <button className="primary-button" onClick={() => startGame()}>Play again <span>↻</span></button>
          <button className="text-button" onClick={() => setScreen('setup')}>Change mission type</button>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="panel game-panel" aria-labelledby="board-title">
        <header className="game-header">
          <button className="back-button" onClick={() => setScreen('setup')} aria-label="Back to setup">←</button>
          <div><p className="eyebrow">Star Crew</p><h1 id="board-title">Memory Match</h1></div>
          <button className="restart-button" onClick={() => startGame()} aria-label="Restart game">↻</button>
        </header>
        <div className="mission-banner">
          <div><span className="status-dot" />{mode === 'solo' ? 'Solo mission' : `Player ${currentPlayer + 1}’s turn`}</div>
          <strong>{formatTime(seconds)}</strong>
        </div>
        <p className="live-message" role="status" aria-live="polite">{message}</p>
        <div className="stats-row">{visibleStats.map((stat) => <div key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}</div>
        <div className="card-grid" aria-label="Memory cards">
          {deck.map((card) => {
            const isVisible = flipped.includes(card.id) || matched.includes(card.id)
            return (
              <button key={card.id} className={`memory-card ${isVisible ? 'is-visible' : ''} ${matched.includes(card.id) ? 'is-matched' : ''}`} onClick={() => handleCardClick(card)} aria-label={isVisible ? `${card.name} card` : 'Hidden memory card'} aria-pressed={isVisible}>
                <span className="card-front" aria-hidden={!isVisible}><span>{card.icon}</span><small>{card.name}</small></span>
                <span className="card-back" aria-hidden={isVisible}>✦</span>
              </button>
            )
          })}
        </div>
        <p className="footer-tip">Tip: remember where each crew member is hiding!</p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
