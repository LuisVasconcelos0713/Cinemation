import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Tipos para as respostas da API
interface Movie {
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    overview: string;
    genres: { id: number; name: string }[];
    poster_path: string;
    genre_ids:  number[]
}

interface Serie {
    id: number;
    name: string;
    vote_average: number;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    overview: string;
    genres: { id: number; name: string }[];
    poster_path: string;
    genre_ids:  number[]
}

interface MovieContextType {
    moviesList: Movie[];
    seriesList: Serie[];
    genre: number;
    genreID: string | null | number;
    genreChangeHandler: (genreID: number | null) => void;
    setGenre: React.Dispatch<React.SetStateAction<number>>;
}

// Constantes e URLs
const seriesUrl = import.meta.env.VITE_SERIES;
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

// Mapeamento de gêneros
const genres: Record<number, string> = {
    28: "Ação",
    12: "Aventura",
    16: "Animação",
    35: "Comédia",
    80: "Crime",
    99: "Documentário",
    18: "Drama",
    10751: "Família",
    14: "Fantasia",
    36: "História",
    27: "Terror",
    10402: "Música",
    9648: "Mistério",
    10749: "Romance",
    878: "Ficção científica",
    10770: "Cinema TV",
    53: "Thriller",
    10752: "Guerra",
    37: "Faroeste",
};

const movieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = (): MovieContextType => {
    const context = useContext(movieContext);
    if (!context) {
        throw new Error("useMovies must be used within a GettingMoviesProvider");
    }
    return context;
};

interface GettingMoviesProviderProps {
    children: ReactNode;
}

const GettingMoviesProvider: React.FC<GettingMoviesProviderProps> = ({ children }) => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const [seriesList, setSeriesList] = useState<Serie[]>([]);
    const [genre, setGenre] = useState<number>(12);
    const [genreID, setGenreID] = useState<string | null | number>("");


    // Função para buscar filmes
    const getMovies = async () => {
        let AllMovies: Movie[] = [];
        for (let page = 1; page <= 33; page++) {
            const res = await fetch(`${moviesUrl}popular?${apiKey}&language=pt-BR&page=${page}`);
            const data = await res.json();
            AllMovies = [...AllMovies, ...data.results];
        }
        setMoviesList(AllMovies);
    };

    // Função para buscar séries
    const getSeries = async () => {
        let AllSeries: Serie[] = [];
        for (let page = 1; page <= 33; page++) {
            const res = await fetch(`${seriesUrl}popular?${apiKey}&language=pt-BR&page=${page}`);
            const data = await res.json();
            AllSeries = [...AllSeries, ...data.results];
        }
        setSeriesList(AllSeries);
    };

    // Função para converter o gênero
    const genreConvertor = (genreID: number | null) => {
        if (!genres[genreID]) {
            console.log("teste");
        }
        const genre = genres[genreID];
        setGenreID(genre);
    };

    useEffect(() => {
        getMovies();
        getSeries();
    }, []);

    const genreChangeHandler = (genreID: number | null) => {
        setGenre(genreID);
        genreConvertor(genreID);
    };

    return (
        <movieContext.Provider
            value={{moviesList, genreChangeHandler, genre, genreID, seriesList, setGenre }}
        >
            {children}
        </movieContext.Provider>
    );
};

export default GettingMoviesProvider;
