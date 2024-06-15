import axios from 'axios';
import { Movie } from '../interfaces/Movie';

const options = {
  method: 'GET',
  url: 'https://moviesdatabase.p.rapidapi.com/titles',
  params: {
    year: '2024',
    page: '1'
  },
  headers: {
    'x-rapidapi-key': 'e1cde12c56msh75a2b5f80394774p1f0a37jsn537e9104d4ef',
    'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
  }
};

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.request(options);

    // Verificar se response.data.results existe
    if (response.data && response.data.results) {
      console.log(response.data);
      return response.data.results;
    } else {
      throw new Error('Estrutura de dados inesperada na resposta da API');
    }
  } catch (error) {
    console.error('Erro ao buscar dados de filmes:', error);
    throw error;
  }
};
