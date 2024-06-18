import React from 'react';
import { Movie } from '../interfaces/Movie';
import styles from './MovieCard.module.css'; // Certifique-se de que o caminho está correto
import { release } from 'os';

const MovieCard: React.FC<Movie> = ({
    primaryImage,
    titleText,
    originalTitleText,
    releaseYear,
    releaseDate,
}) => {
    return (
        <div className={styles['movie-card']}>
            {primaryImage && primaryImage.url && (
                <img src={primaryImage.url} alt={`${titleText.text} Poster`} className={styles['movie-image']} />
            )}
            <div className={styles['text-card']}>
                
                <p><strong>Original Title:</strong> {originalTitleText.text}</p>
                {releaseYear && <p><strong>Release Year:</strong> {releaseYear.year}</p>}
                <p><strong>Release Date:</strong> {releaseDate && releaseDate.day}/{releaseDate && releaseDate.month}/{releaseDate && releaseDate.year}</p>
            </div>
            
        </div>
    );
};

export default MovieCard;
