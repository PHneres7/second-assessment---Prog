'use client'

import React, { useEffect, useState } from 'react';
import MovieCard from '@/app/components/movieCard';
import { Movie } from './interfaces/Movie';
import { fetchMovies } from '@/app/interfaces/fetchMovies';
import styles from './Page.module.css'; 

const Page: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies(page);
        setMovies(data); 
      } catch (error) {
        console.error('Erro ao buscar dados de filmes:', error);
      }
    };

    fetchData();
  }, [page]); 

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants);
  };

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  const goToHomePage = () => {
    setPage(1); 
  };

  return (
    <>
      <div className={styles.headerPage}>
        <div className={styles.infosHeader}>
          <nav className={styles.navigation}>
            <a href="#" className={styles.navLink} onClick={goToHomePage}> Home</a>
            <a href="#" className={styles.navLink} onClick={toggleParticipants}> Participantes</a>
            <a href="#" className={styles.navLink}> Filtrar</a>
          </nav>
        </div>
      </div>

      <div className={styles.buttonMoreMovies}>
        <h1 className={styles.movies2024}>2024 movies</h1>
        <button className={styles.moreMovies} onClick={loadMoreMovies}> More Movies</button>
      </div>

      {showParticipants && (
        <div className={styles.participants}>
          <p><strong>Pedro Henrique Neres</strong></p>
          <p><strong>Biaggio Cardoso</strong></p>
        </div>
      )}

      <div className={styles.page}>
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export default Page;
