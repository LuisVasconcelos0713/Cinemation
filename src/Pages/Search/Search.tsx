import "../../App.css"
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MovieCard from "../../components/movieCard/MovieCard.tsx";
import Loading from "../../components/Loading/Loading.tsx";

const searchMoviesUrl = import.meta.env.VITE_SEARCHMOVIE;
const searchSeriesUrl = import.meta.env.VITE_SEARCHSERIE;
const apiKey = import.meta.env.VITE_API_KEY;
interface IMovie {
    id: number;
    title: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    overview: string;
    genres: { id: number; name: string }[];
    poster_path: string;
    genre_ids: number[];
}

interface ISerie {
    id: number;
    name: string;
    vote_average: number;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    overview: string;
    genres: { id: number; name: string }[];
    poster_path: string;
    genre_ids: number[];
}

type typeMedia = IMovie | ISerie

const Search = () => {
    const [movies, setMovies] = useState<IMovie[]>([])
    const [series,setSeries] = useState<ISerie[]>([])
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    const minRanting:number = 2.5

    const getMovies = async (url:string) => {
        const res = await fetch(url)
        const data = await res.json()
        const filteredMovies = data.results.filter((movie:IMovie) => movie.vote_average >= minRanting)
        setMovies(filteredMovies)
    }

    const getSeries = async (url:string) => {
        const res = await fetch(url)
        const data = await res.json()
        const filteredSeries = data.results.filter((serie:ISerie) => serie.vote_average >= minRanting)
        setSeries(filteredSeries)
    }

    useEffect(() => {
        const encodedQuery = encodeURIComponent(query || "");  // Codificando a query
        const movieUrl = `${searchMoviesUrl}?${apiKey}&query=${encodedQuery}&language=pt-BR`;
        const serieUrl = `${searchSeriesUrl}?${apiKey}&query=${encodedQuery}&language=pt-BR`;
        getMovies(movieUrl);
        getSeries(serieUrl);
    }, [query]);


    const allTitles:typeMedia[] = [...movies, ...series].sort((a,b) => b.vote_average - a.vote_average)

    return (
        <>
            <div className="flex items-center justify-center ">
                <h1 className="text-4xl font-semibold m-5 md:flex md:flex-row md:gap-3 phone:flex phone:flex-col items-center">Searched <strong className="text-yellow-400">{query}</strong></h1>
            </div>
            <div className="flex flex-row flex-wrap phone:justify-center phone:items:center mt-9">
                { allTitles.length > 0 ?
                    allTitles.map((movie:typeMedia) => (
                    <MovieCard movie={movie}></MovieCard>
                ))
                : <Loading></Loading>
                }
            </div>
        </>
    );
}

export default Search;