import React, { useState } from 'react';
import axios from 'axios';
import { Movie } from '../interfaces/Movie';
import styles from './MovieCard.module.css';

const spinnerSvg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyLDRhOCw4LDAsMCwxLDcuODksNi43QTEuNTMsMS41MywwLDAsMCwyMS4zOCwxMmgwYTEuNSwxLjUsMCwwLDAsMS40OC0xLjc1LDExLDExLDAsMCwwLTIxLjcyLDBBMS41LDEuNSwwLDAsMCwyLjYyLDEyaDBhMS41MywxLjUzLDAsMCwwLDEuNDktMS4zQTgsOCwwLDAsMSwxMiw0WiI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiBkdXI9IjAuNzVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdHlwZT0icm90YXRlIiB2YWx1ZXM9IjAgMTIgMTI7MzYwIDEyIDEyIi8+PC9wYXRoPjwvc3ZnPg==";

interface MovieCardProps extends Movie {
   
}

const MovieCard: React.FC<MovieCardProps> = ({
    primaryImage,
    titleText,
    originalTitleText,
    releaseYear,
    releaseDate,
    id,
    titleType,
}) => {
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const fetchMovieDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${id}`, {
                headers: {
                    'x-rapidapi-key': 'e1cde12c56msh75a2b5f80394774p1f0a37jsn537e9104d4ef',
                    'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
                }
            });

            if (response.data && response.data.results) {
                const mainActorsUrl = `https://moviesdatabase.p.rapidapi.com/titles/${id}/main_actors`;

                const actorsResponse = await axios.get(mainActorsUrl, {
                    headers: {
                        'x-rapidapi-key': 'e1cde12c56msh75a2b5f80394774p1f0a37jsn537e9104d4ef', 
                        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
                    }
                });

                const cast = actorsResponse.data.results?.map((actor: any) => actor.name);

                setMovieDetails({
                    ...response.data.results,
                    type: cast,
                    directors: response.data.results.directors?.map((director: any) => director.name),
                    plot: response.data.results.plot
                });

                setShowDetails(true);
            } else {
                throw new Error('Dados do filme não encontrados');
            }
        } catch (error) {
            console.error('Erro ao buscar detalhes do filme:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDetails = () => {
        setShowDetails((prevState) => !prevState);
    };

    return (
        <div className={styles['movie-card']}>
            {primaryImage && primaryImage.url && (
                <img src={primaryImage.url} alt={`${titleText.text} Poster`} className={styles['movie-image']} />
            )}
            <div className={styles['text-card']}>
                <p><strong>Original Title:</strong> {originalTitleText.text}</p>
                {releaseYear && <p><strong>Release Year:</strong> {releaseYear.year}</p>}
                
            </div>
            <button className={styles.buttonMore} onClick={showDetails ? toggleDetails : fetchMovieDetails} disabled={isLoading}>
                {isLoading ? <img src={spinnerSvg} className={styles.spinner} alt="Loading..." /> : (showDetails ? 'View less' : 'View more')}
            </button>
            {showDetails && movieDetails && (
                <div className={styles['movie-details']}>
                    <p><strong>Type:</strong> {titleType?.text}</p>
                    <p><strong>Release Date:</strong>{releaseDate.day}/{releaseDate.month}/{releaseDate.year}</p>
                </div>
            )}
        </div>
    );
};

export default MovieCard;