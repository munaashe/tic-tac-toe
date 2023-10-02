'use client'

import React, { useState, useEffect } from 'react';

// Constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY_CELL = '';

const winningCombinations = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
];

const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(EMPTY_CELL));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
    const [winner, setWinner] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (winner) {
            handleGameOver();
        }
    }, [winner]);

    const handleGameOver = () => {
        setShowModal(true);
        if (winner === PLAYER_X) {
            setScore(board.filter(cell => cell === EMPTY_CELL).length);
        } else if (winner === 'draw') {
            setScore(0);
        } else {
            setScore(null);
        }
    };

    const handlePlayAgain = () => {
        setShowModal(false);
        resetGame();
    };

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleSubmit = () => {
        setIsLoading(true)
        const newScore = {
            name: playerName,
            score: score,
        };

        fetch(process.env.NEXT_PUBLIC_BASE_URL + '/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newScore),
        })
            .then(data => {
                console.log('Score submitted successfully:', data);
                setIsLoading(false);
                setShowModal(false);
                resetGame();
            })
            .catch(error => {
                console.error('Error submitting score:', error);
                setIsLoading(false);
                setShowModal(false);
                resetGame();
            });
    };

    useEffect(() => {
        if (currentPlayer === PLAYER_O) {
            // AI's turn
            makeAiMove();
        }
    }, [currentPlayer]);

    const makeAiMove = () => {
        // Find the best move using the minimax algorithm
        const bestMove = getBestMove(board, currentPlayer);
        makeMove(bestMove);
    };

    const makeMove = (index) => {
        if (board[index] !== EMPTY_CELL || winner) {
            return;
        }

        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;
        setBoard(updatedBoard);

        checkWinner(updatedBoard, currentPlayer);
        setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
    };

    const checkWinner = (currentBoard, player) => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (
                currentBoard[a] === player &&
                currentBoard[b] === player &&
                currentBoard[c] === player
            ) {
                setWinner(player);
                break;
            }
        }
        if (!currentBoard.includes(EMPTY_CELL) && !winner) {
            setWinner('draw');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(EMPTY_CELL));
        setCurrentPlayer(PLAYER_X);
        setWinner(null);
    };

    const getBestMove = (currentBoard, player) => {
        const availableMoves = getAvailableMoves(currentBoard);
        let bestMove;
        let bestScore = player === PLAYER_X ? -Infinity : Infinity;

        for (let i = 0; i < availableMoves.length; i++) {
            const move = availableMoves[i];
            const newBoard = [...currentBoard];
            newBoard[move] = player;

            const score = minimax(newBoard, 0, false, player);
            if (
                (player === PLAYER_X && score > bestScore) ||
                (player === PLAYER_O && score < bestScore)
            ) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    };

    const getAvailableMoves = (currentBoard) => {
        const moves = [];
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === EMPTY_CELL) {
                moves.push(i);
            }
        }
        return moves;
    };

    const minimax = (currentBoard, depth, isMaximizingPlayer, player) => {
        const result = checkGameResult(currentBoard);
        if (result !== null) {
            return getScore(result, depth);
        }

        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            const availableMoves = getAvailableMoves(currentBoard);

            for (let i = 0; i < availableMoves.length; i++) {
                const move = availableMoves[i];
                const newBoard = [...currentBoard];
                newBoard[move] = player;

                const score = minimax(newBoard, depth + 1, false, player);
                bestScore = Math.max(score, bestScore);
            }

            return bestScore;
        } else {
            let bestScore = Infinity;
            const availableMoves = getAvailableMoves(currentBoard);

            for (let i = 0; i < availableMoves.length; i++) {
                const move = availableMoves[i];
                const newBoard = [...currentBoard];
                newBoard[move] = player === PLAYER_X ? PLAYER_O : PLAYER_X
                const score = minimax(newBoard, depth + 1, true, player);
                bestScore = Math.min(score, bestScore);
            }

            return bestScore;
        }
    };

    const checkGameResult = (currentBoard) => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (
                currentBoard[a] === currentBoard[b] &&
                currentBoard[b] === currentBoard[c] &&
                currentBoard[a] !== EMPTY_CELL
            ) {
                return currentBoard[a];
            }
        }

        if (!currentBoard.includes(EMPTY_CELL)) {
            return 'draw';
        }

        return null;
    };

    const getScore = (result, depth) => {
        if (result === 'draw') {
            return 0;
        } else if (result === PLAYER_X) {
            return 10 - depth;
        } else if (result === PLAYER_O) {
            return depth - 10;
        }
    };

    return (
        <div className="w-96 mx-auto flex flex-col justify-center items-center">
            <div className="text-[24px] font-semibold pb-4">Tic Tac Toe Game</div>
            <div className="grid grid-cols-3 gap-2">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className="w-28 h-28 bg-gray-200 text-5xl font-bold"
                        onClick={() => makeMove(index)}
                        disabled={cell !== EMPTY_CELL || winner}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center">
                        {winner === PLAYER_O && (
                            <>
                                <div className="text-2xl font-semibold mb-4">Game Over, sorry you lost.</div>
                                <button
                                    className="px-6 py-3 bg-blue-500 hover:bg-purple-800 text-white font-bold text-center rounded-xl"
                                    onClick={handlePlayAgain}
                                >
                                    Play Again
                                </button>
                            </>
                        )}
                        {winner === PLAYER_X && (
                            <>
                                <div className="text-2xl font-semibold mb-4">Good going! What's your name?</div>

                                {isLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 mb-4"
                                            placeholder="Enter your name"
                                            value={playerName}
                                            onChange={handlePlayerNameChange}
                                        />
                                        <button
                                            className="px-6 py-3 bg-blue-500 hover:bg-purple-800 text-white font-bold text-center rounded-xl"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </>
                                )}

                            </>
                        )}
                        {winner === 'draw' && (
                            <>
                                <div className="text-2xl font-semibold mb-4">Game Over, Match drawn.</div>
                                <button
                                    className="px-6 py-3 bg-blue-500 hover:bg-purple-800 text-white font-bold text-center rounded-xl"
                                    onClick={handlePlayAgain}
                                >
                                    Play Again
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;

