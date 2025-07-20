import React, { useEffect, useState } from 'react';
import './Game.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Game = () => {

  //Redux store
  const { userInfo } = useSelector((state) => state.auth);

  //UseStates
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [selectedLilypads, setSelectedLilypads] = useState([]);
  const [grid, setGrid] = useState(Array(7).fill(null));
  const [frogPosition, setFrogPosition] = useState(-1);
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [frogAnimationClass, setFrogAnimationClass] = useState('');
  const [prevFrogPos, setPrevFrogPos] = useState(-1);


  //Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  //Get lilypad color function
  const getColor = (score) => {
    if (score < 50) return 'Red';
    if (score < 80) return 'Orange';
    if (score < 110) return 'Yellow';
    return 'Green';
  };

  //Fetch score history
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const { data } = await axios.get('/api/users/score/history', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        //Getting last 7 lilypads
        const last7 = data.slice(-7).map(entry => ({
          color: getColor(entry.score),
          date: entry.date,
          id: entry.date + Math.random()
        }));

        setScoreHistory(last7);
        setSelectedLilypads(last7);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };
    fetchScores();
  }, [userInfo]);

  //Drag lilypad handler
  const handleDragStart = (e, item, index) => {
    e.dataTransfer.setData('item', JSON.stringify(item)); //It allows the handleDrop function to know what was dragged and where it came from
    e.dataTransfer.setData('index', index);

    const img = new Image();
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAApJREFUeJxjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  //Handles the drop function
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData('item'));
    const fromIndex = parseInt(e.dataTransfer.getData('index'), 10);

    if (grid[dropIndex]) return;

    //Sets the dragged lilypad object onto the grid tile at the dropped position.
    const updatedGrid = [...grid];
    updatedGrid[dropIndex] = draggedItem;
    setGrid(updatedGrid);

    //Removes the lilypad at the fromIndex because it’s now placed on the grid
    const updatedLilys = [...selectedLilypads];
    updatedLilys.splice(fromIndex, 1);
    setSelectedLilypads(updatedLilys);
  };

  //Jump Function
  const jump = () => {
    if (!grid[0]) {
      setMessage("Froggy drowned at the start!");
      setGameOver(true);
      setFrogPosition(0);
      return;
    }

    let pos = 0;
    let prev = 0;
    const steps = [0];
    setPrevFrogPos(0); // reset at the start

    // Apply tile 0 lilypad movement
    const firstTile = grid[0];
    switch (firstTile.color) {
      case 'Red':
      case 'Orange':
        pos = Math.max(0, pos - 1);
        break;
      case 'Yellow':
        pos = Math.min(7, pos + 1);
        break;
      case 'Green':
        pos = Math.min(7, pos + 2);
        break;
    }
    steps.push(pos);

    // Loop through remaining tiles and apply movement
    for (let i = 1; i < grid.length; i++) {
      const tile = grid[i];
      if (!tile) continue;

      switch (tile.color) {
        case 'Red':
          pos = Math.max(0, pos - 2);
          break;
        case 'Orange':
          pos = Math.max(0, pos - 1);
          break;
        case 'Yellow':
          pos = Math.min(7, pos + 1);
          break;
        case 'Green':
          pos = Math.min(7, pos + 2);
          break;
      }

      steps.push(pos);
    }

    let drowned = false;

    steps.forEach((step, index) => {
      setTimeout(() => {
        const delta = step - prevFrogPos;
        let animationClass = '';

        if (delta === 1) animationClass = 'jump-forward-1';
        else if (delta === 2) animationClass = 'jump-forward-2';
        else if (delta === -1) animationClass = 'jump-backward-1';
        else if (delta === -2) animationClass = 'jump-backward-2';

        // Set animation WHILE frog is still in prevFrogPos tile
        setFrogAnimationClass(animationClass);

        // Don't move frogPosition yet, wait for animation to finish
        setTimeout(() => {
          setFrogAnimationClass('');         // Clear animation
          setFrogPosition(step);             // Now move frog
          setPrevFrogPos(step);              // Update prev

          // Check for game states
          if (step < 7 && !grid[step]) {
            setMessage("Froggy drowned!");
            setGameOver(true);
          } else if (index === steps.length - 1) {
            if (step >= 7) {
              setMessage("Froggy made it to land!");
              setGameWon(true);
            } else {
              setMessage("Froggy couldn't reach the land.");
              setGameOver(true);
            }
          }
        }, 800); // Wait for animation to complete before moving frog
      }, index * 1000);
    });
  };

  return (
    <div className="frog-game-container">
      {loadingScreen && (
        <div className="initial-loading-screen">
          <div className="loader-circle"></div>
          <p className="loading-text">Loading Game...</p>
        </div>
      )}

      <div className="video-wrapper">
        <video autoPlay muted loop className="video-background" playsInline>
          <source src="/videos/pondVid.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="top-bar">
        <button className="help-btn" onClick={() => setShowHelp(true)}>Help</button>
      </div>

      <div className="game-overlay">
        <h1 className="gameTitle">FROGGY JOURNEY</h1>
        <div className="gameMsgContainer">
          <p className="frog-message">{message}</p>
        </div>

        <div className="game-grid">
          {['start', ...grid, 'goal'].map((tile, idx) => (
            <div
              key={idx}
              className={idx === 0 ? "start-tile" : idx === 8 ? "goal-tile" : `grid-tile ${tile?.color}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={
                idx !== 0 && idx !== 8 ? (e) => handleDrop(e, idx - 1) : undefined
              }
            >
              {/* Lilypad image */}
              {tile !== 'start' && tile !== 'goal' && tile && (
                <img
                  src={`/pictures/lily${tile.color}.png`}
                  alt={`${tile.color} lilypad`}
                  className="lilypad-img"
                  draggable={false}
                />
              )}

              {/* Frog sprite */}
              {(idx === 0 && frogPosition === -1) || (idx === 8 && frogPosition >= 7) || frogPosition === idx - 1 ? (
                <img
                  src="/pictures/frog-pixel.gif"
                  alt="frog"
                  className={`frog-sprite jump ${frogAnimationClass}`}
                />
              ) : null}
            </div>
          ))}
        </div>
        
        <div className="inventory-container">
          <div className="inventory-row">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div className="inventory-slot" key={idx}>
                {selectedLilypads[idx] && (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, selectedLilypads[idx], idx)}
                    className={`inventory-lilypad ${selectedLilypads[idx].color}`}
                  >
                    <img
                      src={`/pictures/lily${selectedLilypads[idx].color}.png`}
                      alt={`${selectedLilypads[idx].color} lilypad`}
                      className="lilypad-img"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {showHelp && (
          <div className="help-modal">
            <div className="help-content">
              <h2>How to Play</h2>
              <br />
              <ul>
                <li>🟩 <strong>Green Lilypad</strong>: Jump forward 2 tiles</li>
                <li>🟨 <strong>Yellow Lilypad</strong>: Jump forward 1 tile</li>
                <li>🟧 <strong>Orange Lilypad</strong>: Jump backward 1 tile</li>
                <li>🟥 <strong>Red Lilypad</strong>: Jump backward 2 tiles</li>
              </ul>
              <p>Drag lilypads to the 7-step path and press <strong>Start Journey</strong>.</p>
              <br />
              <p><strong>NOTE: </strong>Don't forget to place lilypad on the **first tile** — the frog starts on land!</p>
              <br />
              <p>If Froggy lands on a tile without a lilypad — <span style={{ color: 'skyblue' }}>Froggy drowns!</span></p>
              <br />
              <h2>GOAL of the Game</h2>
              <p>Help froggy reach the land</p>
              <button className="close-help-btn" onClick={() => setShowHelp(false)}>Got it!</button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="game-modal game-over">
            <div className="modal-content">
              <h2>GAME OVER!</h2>
              <p>{message}</p>
              <button onClick={() => {
                setGameOver(false);
                setGrid(Array(7).fill(null));
                setSelectedLilypads(scoreHistory);
                setFrogPosition(-1);
                setMessage('');
              }}>Try Again</button>
            </div>
          </div>
        )}

        {gameWon && (
          <div className="game-modal game-won">
            <div className="modal-content">
              <h2>YOU WON!</h2>
              <p>Froggy reached the land safely.</p>
              <p>Exp Gained: {selectedLilypads.length}</p>
            </div>
          </div>
        )}

        <div className="btn-container-game">
          <button className="start-btn" onClick={jump}>
            Start Journey
          </button>

          <button className="reset-btn" onClick={() => {
            setGrid(Array(7).fill(null));
            setSelectedLilypads(scoreHistory);
            setFrogAnimationClass('');
            setFrogPosition(-1);
            setMessage('');
          }}>
            Reset
          </button>
        </div>

      </div>
    </div>
  );
};

export default Game;
