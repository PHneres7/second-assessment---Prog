'use client'
import React, { useEffect, useState } from 'react';
import MovieCard from '@/app/components/movieCard';

import { Movie } from './interfaces/Movie';
import { fetchMovies } from '@/app/interfaces/fetchMovies';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error('Erro ao buscar dados de filmes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Detalhes do Filme</h1>
      {movies.map(movie => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default App;
