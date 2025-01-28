import "../../App.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";
import Loading from "../../components/Loading/Loading.tsx";

const serieUrl = import.meta.env.VITE_SERIES
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG;

interface IGenre {
    id: number;
    name: string;
}

interface IProvider {
    provider_name: string;
    logo_path: string;
}

interface ICast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface IDirector {
    id: number;
    name: string;
    job: string;
}

interface ISerieData {
    id: number;
    name: string;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    genres: IGenre[];
    overview: string;
    poster_path: string;
    vote_average: number;
}

interface ISerieProviderResponse {
    results: {
        BR: {
            flatrate: IProvider[];
            rent: IProvider[];
        };
    };
}

interface ISerieCastResponse {
    cast: ICast[];
    crew: IDirector[];
}

const Serie = () => {
    // Definindo os estados com suas respectivas tipagens
    const [serie, setSerie] = useState<ISerieData | null>(null);
    const { id } = useParams<{ id: string }>(); // Tipagem para os parâmetros da URL
    const [providersStream, setProvidersStream] = useState<IProvider[]>([]);
    const [providersRent, setProvidersRent] = useState<IProvider[]>([]);
    const [cast, setCast] = useState<ICast[]>([]);
    const [director, setDirector] = useState<IDirector[]>([]);

    // Função para obter dados da série
    const getSerie = async (url: string) => {
        const res = await fetch(url);
        const data: ISerieData = await res.json();
        setSerie(data);
    };

    // Função para obter provedores
    const getProviders = async (url: string) => {
        const res = await fetch(url);
        const data: ISerieProviderResponse = await res.json();
        setProvidersStream(data.results.BR?.flatrate || []);
        setProvidersRent(data.results.BR?.rent || []);
    };

    // Função para obter elenco e diretor
    const getCast = async (url: string) => {
        const res = await fetch(url);
        const data: ISerieCastResponse = await res.json();

        const actors = data.cast.slice(0, 4);
        const directorsList = data.crew.filter(
            (crew) => crew.job === "Director"
        );

        setCast(actors);
        setDirector(directorsList);
    };

    // Efeito para carregar os dados assim que o ID da série mudar
    useEffect(() => {
        if (id) {
            getSerie(`${serieUrl}${id}?${apiKey}&language=pt-br`);
            const urlProvider = `${serieUrl}${id}/watch/providers?${apiKey}`;
            const urlCast = `${serieUrl}${id}/credits?${apiKey}`;
            getProviders(urlProvider);
            getCast(urlCast);
        }
    }, [id]);

    return (
        <div>
            {serie && cast && providersRent && providersStream ? (
                <div className="flex md:flex-row justify-center gap-20 w-full md:max-w-[1600px] mt-10 phone:flex-col phone:max-w-[375px]">
                    <div className="serie-poster">
                        <img
                            className="md:min-w-[454px] phone:max-w-[375px]"
                            src={`${imgUrl}${serie.poster_path}`}
                            alt={serie.name || "Poster do filme"}
                        />
                    </div>
                    <div className="serie-info">
                        <div className="flex md:flex-row items-center justify-between max-w-[900px] phone:flex-col">
                            <h1 className="text-white font-bold text-5xl">{serie.name}</h1>
                            <p className="flex flex-row items-center gap-1 text-WhiteText text-3xl">
                                <FaStar className="text-yellow-400" /> {serie.vote_average.toFixed(1)}
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-3 mt-1 md:justify-start text-Gray4 md:text-[18px] phone:text-[17px] phone:justify-center">
                            <p className="serie-release">{serie.first_air_date.substring(0, 4)}</p>
                            <span>|</span>
                            <p className="time">{`${serie.number_of_seasons} Seasons`}</p>
                            <span>|</span>
                            <p className="genre">{`${serie.number_of_episodes} Episodes`}</p>
                        </div>

                        <div className="flex flex-col mt-12 md:max-w-[800px] phone:max-w-[375px]">
                            <h1 className="text-white font-bold text-xl">OVERVIEW</h1>
                            <p className="text-WhiteText text-lg mt-4">{serie.overview}</p>
                            <div className="flex flex-col mt-9">
                                <p className="text-Gray4 flex flex-row md:text-[18px] gap-3 phone:text-[11.5px]">
                                    Starring : {cast.map((cast) => <h1 className="text-WhiteText">{cast.name}</h1>)}
                                </p>

                                <p className="text-Gray4 mt-3 flex flex-row md:text-[18px] gap-3 phone:text-[11.5px]">
                                    Created by : {director.map((director) => <h1 className="text-WhiteText">{director.name}</h1>)}
                                </p>

                                <p className="text-Gray4 mt-3 flex flex-row md:text-[18px] gap-3 phone:text-[13px]">
                                    Genre : <h1 className="text-WhiteText">{serie.genres.map((genre) => genre.name).join(", ")}</h1>
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
                <Loading></Loading>
            )}
        </div>
    );
};

export default Serie;