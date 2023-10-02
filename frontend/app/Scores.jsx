'use client'

import React, { useState, useEffect } from 'react';

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/scores`, { cache: 'no-store' });
        const data = await response.json();
        setScores(data.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores().catch(console.error);
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Top 10 Scores</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>

          {scores.length > 0 ? (
            scores.slice(0, 10).map((score) => (
              <tr key={score.id}>
                <td className="border px-4 py-2 font-semibold">{score.name}</td>
                <td className="border px-4 py-2 text-center">{score.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className=" px-4 py-8" colSpan="2">
                No scores, please play
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Scores;