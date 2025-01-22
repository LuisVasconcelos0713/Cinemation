import "../../App.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";

const movieUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG;

interface IMovieProvider {
    provider_name: string;
    logo_path: string;
}

interface IMovieCast {
    name: string;
}

interface IMovieDirector {
    name: string;
}

interface IMovieData {
    title: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: { name: string }[];
    overview: string;
    poster_path: string;
}

const Movie = () => {
    const [movie, setMovie] = useState<IMovieData | null>(null);
    const {id} = useParams();
    const [providersStream, setProvidersStream] = useState<IMovieProvider[]>([]);
    const [providersRent, setProvidersRent] = useState<IMovieProvider[]>([]);
    const [cast, setCast] = useState<IMovieCast[]>([]);
    const [director, setDirector] = useState<IMovieDirector[]>([]);

    const getMovie = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovie(data);
    };

    const getProviders = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        setProvidersStream(data.results.BR?.flatrate || []);
        setProvidersRent(data.results.BR?.rent || []);
    };

    const getCast = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        const actors = data.cast.slice(0, 4);
        const directorsList = data.crew.filter((crew) => crew.job === "Director");
        setCast(actors);
        setDirector(directorsList);
    };

    useEffect(() => {
        getMovie(`${movieUrl}${id}?${apiKey}&language=pt-br`);
        const urlProvider = `${movieUrl}${id}/watch/providers?${apiKey}`;
        const urlCast = `${movieUrl}${id}/credits?${apiKey}`;
        getProviders(urlProvider);
        getCast(urlCast);
    }, [id]);

    const convertRuntime = (runtime: number): string => {
        const hours: number = Math.round(runtime / 60);
        const minutes: string = (runtime % 60).toFixed(0);
        return `${hours}h${minutes}min`;
    };

    return (
        <div>
            {movie && cast && providersRent && providersStream ? (
                <div className="flex md:flex-row justify-center gap-20 w-full md:max-w-[1600px] mt-10 phone:flex-col phone:max-w-[375px]">
                    <div className="movie-poster">
                        <img
                            className="md:min-w-[454px] phone:max-w-[375px]"
                            src={`${imgUrl}${movie.poster_path}`}
                            alt={movie.title || "Poster do filme"}
                        />
                    </div>
                    <div className="movie-info">
                        <div className="flex md:flex-row items-center justify-between max-w-[900px] phone:flex-col">
                            <h1 className="text-white font-bold md:text-5xl phone:text-3xl">{movie.title}</h1>
                            <p className="flex flex-row items-center gap-1 text-WhiteText text-3xl">
                                <FaStar className="text-yellow-400" /> {movie.vote_average.toFixed(1)}
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-3 mt-1 md:justify-start text-Gray4 md:text-[18px] phone:text-[13px] phone:justify-center">
                            <p className="movie-release">
                                {movie.release_date.substring(0, 4)}
                            </p>
                            <span>|</span>
                            <p className="time">{convertRuntime(movie.runtime)}</p>
                            <span>|</span>
                            <p className="genre">{movie.genres.map((genre) => genre.name).join(", ")}</p>
                        </div>

                        <div className="flex flex-col mt-12 md:max-w-[800px] phone:max-w-[375px]">
                            <h1 className="text-white font-bold text-xl">OVERVIEW</h1>
                            <p className="text-WhiteText text-lg mt-4">{movie.overview}</p>
                            <div className="flex flex-col mt-9">
                                <p className="text-Gray4 flex flex-row md:gap-3 md:text-[18px] gap-3 phone:text-[11.5px]">
                                    Starring: {cast.map((actor) => <h1 key={actor.name} className="text-WhiteText">{actor.name}</h1>)}
                                </p>

                                <p className="text-Gray4 mt-3 flex flex-row md:gap-3 md:text-[18px] gap-3 phone:text-[13px]">
                                    Created by: {director.map((director) => <h1 key={director.name} className="text-WhiteText">{director.name}</h1>)}
                                </p>

                                <p className="text-Gray4 mt-3 flex flex-row md:text-[18px] gap-3 phone:text-[13px]">
                                    Genre:
                                    <h1 className="text-WhiteText">{movie.genres.map((genre) => genre.name).join(", ")}</h1>
                                </p>
                            </div>
                        </div>
                        <h1 className="text-WhiteText mt-6 font-bold text-lg">Stream</h1>
                        <div className="flex flex-row items-start">
                            {providersStream.map((provider, index) => (
                                <div className="flex flex-col items-center mr-3" key={index}>
                                    <img src={imgUrl + provider.logo_path} alt={`${provider.provider_name} logo`} className="w-[54px]" />
                                    <h1 className="text-WhiteText text-xs">{provider.provider_name}</h1>
                                </div>
                            ))}
                        </div>
                        <h1 className="text-WhiteText mt-2 font-bold text-lg">Rent</h1>
                        <div className="flex flex-row items-start">
                            {providersRent.map((provider, index) => (
                                <div className="flex flex-col items-center mr-3" key={index}>
                                    <img src={imgUrl + provider.logo_path} alt={`${provider.provider_name} logo`} className="w-[54px]" />
                                    <h1 className="text-WhiteText text-xs">{provider.provider_name}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Movie;
