'use client'
import React, { useEffect, useState } from 'react';
import MovieCard from '@/app/components/movieCard';
import { Movie } from './interfaces/Movie';
import { fetchMovies } from '@/app/interfaces/fetchMovies';
import styles from './Page.module.css'; // Importe o arquivo CSS
import  logoSite from '@/app/imgs/logoSite.svg'

const Page: React.FC = () => {
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
    <>
    <div className={styles.headerPage}>
      <div className={styles.infosHeader}>
        <img src={logoSite} alt="Minha Imagem" className={styles.imgLogo}/>
        <h3>home</h3>
        <h3>participantes</h3>
      </div>
      
    </div>

      <h1>Detalhes do Filme</h1>
      <div className={styles.page}>
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export default Page;
