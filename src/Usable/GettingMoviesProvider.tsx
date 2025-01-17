import "../App.css"
import {createContext, useContext, useEffect, useState} from "react";

const seriesUrl = import.meta.env.VITE_SERIES
const  moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const tvGenres = {
    10759: "Ação e Aventura", //ação -
    16: "Animação", //animação
    35: "Comédia", //comédia -
    80: "Crime", //crime
    99: "Documentário",
    18: "Drama", //drama
    10751: "Família",
    10762: "Infantil",
    9648: "Mistério", //terror -
    10763: "Notícias",
    10764: "Reality",
    10765: "Ficção científica e Fantasia",
    10766: "Novela",
    10767: "Talk Show",
    10768: "Guerra e Política",
    37: "Faroeste",
};

const genres = {
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

const movieContext = createContext();
export const useMovies = () => useContext(movieContext)

const GettingMoviesProvider = ({children}) => {
    {/* States */}
    const [moviesList, setMoviesList] = useState([])
    const [seriesList,setSeriesList] = useState([])

    {/* Fetch */}
    const getMovies = async () => {
        let AllMovies = []
        for (let page = 1; page <= 33; page++){
            const res = await fetch(`${moviesUrl}popular?${apiKey}&language=pt-BR&page=${page}`)
            const data = await res.json()
            AllMovies = [...AllMovies,...data.results]
        }
        setMoviesList(AllMovies)
    }

    const getSeries = async() => {
        let AllSeries = []
        for (let page = 1; page <= 33; page++){
            const res = await fetch(`${seriesUrl}popular?${apiKey}&language=pt-BR&page=${page}`)
            const data = await res.json()
            AllSeries = [...AllSeries, ...data.results]
        }
        setSeriesList(AllSeries)
    }

    useEffect(() => {
        getMovies()
        getSeries()
    }, []);

    {/* Getting Genres */}

    const [genre, setGenre] = useState(12)

    const genreChangeHandler =  (genreID) => {
        setGenre(genreID)
        genreConvertor(genreID)
    }

    {/* Converting Genres */}

    const mappingGenre = {
        28: 10759, // Ação -> Ação e Aventura
        10749: 35, // Romance -> Comédia
        27: 9648, // Terror -> Mistério
        878: 10765, // Ficção científica -> Ficção científica e Fantasia
    }

    const [genreID , setGenreID] = useState("")

    const genreConvertor = (genreID) => {
        if (!genres[genreID])
        {console.log("teste")}
        const genre = genres[genreID]
        setGenreID(genre)
    }

    return (
        <movieContext.Provider value={{moviesList, genreChangeHandler, genre, genreID,seriesList,setGenre}}>
            {children}
        </movieContext.Provider>
    );
}

export default GettingMoviesProvider;