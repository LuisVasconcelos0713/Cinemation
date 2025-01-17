import "../../App.css"
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import movie from "../Movie/Movie.tsx";
import serie from "../Serie/Serie.tsx";
import MovieCard from "../../components/movieCard/MovieCard.tsx";
import AllMovies from "../AllMovies/AllMovies.tsx";

const searchMoviesUrl = import.meta.env.VITE_SEARCHMOVIE;
const searchSeriesUrl = import.meta.env.VITE_SEARCHSERIE;
const apiKey = import.meta.env.VITE_API_KEY;
const Search = (props) => {
    const [movies, setMovies] = useState([])
    const [series,setSeries] = useState([])
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    const minRanting = 2.5

    const getMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        const filteredMovies = data.results.filter((movie) => movie.vote_average >= minRanting)
        setMovies(filteredMovies)
    }

    const getSeries = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        const filteredSeries = data.results.filter((serie) => serie.vote_average >= minRanting)
        setSeries(filteredSeries)
    }

    useEffect(() => {
        const movieUrl = `${searchMoviesUrl}?${apiKey}&query=${query}&language=pt-BR`
        const serieUrl = `${searchSeriesUrl}?${apiKey}&query=${query}&language=pt-BR`
        getMovies(movieUrl)
        getSeries(serieUrl)
    }, [query]);

    const allTitles = [...movies, ...series].sort((a,b) => b.vote_average - a.vote_average)

    return (
        <>
            <div className="flex items-center justify-center ">
                <h1 className="text-4xl font-semibold m-5 md:flex md:flex-row md:gap-3 phone:flex phone:flex-col items-center">Searched <strong className="text-yellow-400">{query}</strong></h1>
            </div>
            <div className="flex flex-row flex-wrap phone:justify-center phone:items:center mt-9">
                {allTitles.map((movie) => (
                    <MovieCard movie={movie}></MovieCard>
                ))}
            </div>
        </>
    );
}

export default Search;