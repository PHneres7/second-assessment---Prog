import React from 'react';
import { Movie } from '../interfaces/Movie';
import styles from './MovieCard.module.css'; // Certifique-se de que o caminho está correto

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
            <h2>{titleText.text}</h2>
            <p><strong>Original Title:</strong> {originalTitleText.text}</p>
            {releaseYear && <p><strong>Release Year:</strong> {releaseYear.year}</p>}
            <p><strong>Release Date:</strong> {releaseDate.day}/{releaseDate.month}/{releaseDate.year}</p>
        </div>
    );
};

export default MovieCard;
