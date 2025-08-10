import React, { useEffect, useState } from 'react';
import './Game.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; // already imported
import {setCredentials} from "../redux/features/authSlice.js";

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
  const [touchItem, setTouchItem] = useState(null);
  const [touchIndex, setTouchIndex] = useState(null);
  const [gainedExp, setGainedExp] = useState(0);
  const [alreadyWonToday, setAlreadyWonToday] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    const checkWinStatus = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        const today = new Date().toISOString().split('T')[0];
        setAlreadyWonToday(data.lastGameWinDate === today);
      } catch (error) {
        console.error("Error checking win status:", error);
      }
    };

    if (userInfo?.token) {
      checkWinStatus();
    }
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

  //Touch functionality
  const handleTouchStart = (e, item, index) => {
    setTouchItem(item);
    setTouchIndex(index);
  };

  const handleTouchDrop = (dropIndex) => {
    if (!touchItem || grid[dropIndex]) return;

    const updatedGrid = [...grid];
    updatedGrid[dropIndex] = touchItem;
    setGrid(updatedGrid);

    const updatedLilys = [...selectedLilypads];
    updatedLilys.splice(touchIndex, 1);
    setSelectedLilypads(updatedLilys);

    setTouchItem(null);
    setTouchIndex(null);
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
    while (pos < 7) {
      steps.push(pos);
      const tile = grid[pos];
      if (!tile) break; // Froggy drowned!

      switch (tile.color) {
        case 'Red':     pos = Math.max(0, pos - 2); break;
        case 'Orange':  pos = Math.max(0, pos - 1); break;
        case 'Yellow':  pos = Math.min(7, pos + 1); break;
        case 'Green':   pos = Math.min(7, pos + 2); break;
        default:        break;
      }

      // Prevent infinite loop (e.g. Red on tile 0)
      if (steps.includes(pos)) break;
    }

    steps.push(pos); // Final step (win or drown)

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
          if (step >= 7) {
            setMessage("Froggy made it to land!");
            setGameWon(true);

            // Count lilypads used (non-null tiles)
            const usedLilypads = grid.filter(tile => tile !== null).length;

            // Determine EXP
            let gainedExp = 0;
            if (usedLilypads === 4) gainedExp = 400;
            else if (usedLilypads === 5) gainedExp = 300;
            else if (usedLilypads === 6) gainedExp = 200;
            else if (usedLilypads === 7) gainedExp = 100;
            else gainedExp = 0; // Less than 4 or more than 7 (if needed)
            setGainedExp(gainedExp);

            if (gainedExp > 0) {
              // Record win in backend
              if (!alreadyWonToday) {
                axios.post(
                  '/api/users/game/win',
                  {},
                  { headers: { Authorization: `Bearer ${userInfo.token}` } }
                ).then(() => {
                  setAlreadyWonToday(true); // instantly disable button after win
                }).catch((err) => {
                  console.error("Error recording win:", err);
                });
              }

              axios.post(
                '/api/users/add-exp',
                { exp: gainedExp },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
              ).then((res) => {
                console.log('EXP added:', res.data);
              }).catch((err) => {
                console.error('Failed to add EXP:', err);
              });

              // Refresh profile after adding EXP
              axios.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${userInfo.token}` },
              }).then((res) => {
                dispatch(setCredentials({ ...res.data }));
              }).catch((err) => {
                console.error('Failed to refresh profile:', err);
              });
            }

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
              onTouchEnd={
                idx !== 0 && idx !== 8 ? () => handleTouchDrop(idx - 1) : undefined
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
                    onTouchStart={(e) => handleTouchStart(e, selectedLilypads[idx], idx)}
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
              <p><strong>EXP Gained: {gainedExp}</strong></p>
              <button onClick={() => {
                setGameWon(false);
                setGrid(Array(7).fill(null));
                setSelectedLilypads(scoreHistory);
                setFrogAnimationClass('');
                setFrogPosition(-1);
                setMessage('');
              }}>Close</button>
            </div>
          </div>
        )}


        <div className="btn-container-game">
          <button
            className="start-btn"
            onClick={jump}
            disabled={alreadyWonToday}
          >
            {alreadyWonToday ? "Already Won Today" : "Start Journey"}
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
