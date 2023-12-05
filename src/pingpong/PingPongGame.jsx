import React, { useState, useRef, useEffect } from 'react';
import './PingPongGame.css';

const PingPongGame = () => {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [ballSpeed, setBallSpeed] = useState({ x: 5, y: 5 });
  const [paddlePosition, setPaddlePosition] = useState(50);
  const [score, setScore] = useState(0);

  const gameAreaRef = useRef(null);

  const movePaddle = (e) => {
    const gameArea = gameAreaRef.current;
    const paddleHeight = 20;

    if (e.clientY - gameArea.offsetTop > paddleHeight / 2 && e.clientY < gameArea.clientHeight - paddleHeight / 2) {
      setPaddlePosition(e.clientY - gameArea.offsetTop - paddleHeight / 2);
    }
  };


  const resetGame = () => {
    setBallPosition({ x: 50, y: 50 });
    setBallSpeed({ x: 5, y: 5 });
    setPaddlePosition(50);
    setScore(0);
  };

  useEffect(() => {
    const gameArea = gameAreaRef.current;

const updateGame = () => {
  setBallPosition((prevPosition) => ({
    x: prevPosition.x + ballSpeed.x,
    y: prevPosition.y + ballSpeed.y,
  }));

  if (ballPosition.y > gameArea.clientHeight || ballPosition.y < 0) {
    setBallSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }));
  }

  const paddleLeft = 0;
  const paddleRight = gameArea.clientWidth - 20;
  const paddleTop = paddlePosition;
  const paddleBottom = paddlePosition + 100;

  // Check collision with left paddle
  if (
    ballPosition.x < paddleLeft + 10 && // Adjust this value based on the width of your paddle
    ballPosition.y > paddleTop &&
    ballPosition.y < paddleBottom
  ) {
    setBallSpeed((prevSpeed) => ({ x: Math.abs(prevSpeed.x), y: prevSpeed.y }));
    setScore((prevScore) => prevScore + 1);
  }

  // Check collision with right paddle
  if (
    ballPosition.x > paddleRight &&
    ballPosition.y > paddleTop &&
    ballPosition.y < paddleBottom
  ) {
    setBallSpeed((prevSpeed) => ({ x: -Math.abs(prevSpeed.x), y: prevSpeed.y }));
    setScore((prevScore) => prevScore + 1);
  }

  if (ballPosition.x > gameArea.clientWidth) {
    // Ball is out of bounds, reset position and decrease score
    setBallPosition({ x: 50, y: 50 });
    setBallSpeed({ x: 5, y: 5 });
    setScore((prevScore) => Math.max(0, prevScore - 1));
  }
};

// ...


    const gameInterval = setInterval(updateGame, 20);

    return () => clearInterval(gameInterval);
  }, [ballPosition, ballSpeed, paddlePosition]);

  return (
    <div>
    <h5 className="score">Score: {score}</h5>
    <div ref={gameAreaRef} className="game-area" onMouseMove={movePaddle}>
      <div className="ball" style={{ top: `${ballPosition.y}px`, left: `${ballPosition.x}px` }}></div>
      <div className="paddle left" style={{ top: `${paddlePosition}px` }}></div>
      <div className="paddle right" style={{ top: `${paddlePosition}px` }}></div>
    </div>
    <button onClick={resetGame}>Reset Score</button>
    </div>
  );
};

export default PingPongGame;
