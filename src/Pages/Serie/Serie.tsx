import "../../App.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";

const serieUrl = import.meta.env.VITE_SERIES
const apiKey = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG;

const Serie = () => {
    {/* States and Params*/}
    const [serie, setserie] = useState(null)
    const {id} = useParams()
    const [providersStream, setProvidersStream] = useState([])
    const [providersRent, setProvidersRent] = useState([])
    const [cast,setCast] = useState([])
    const [director, setDirector] = useState([])

    {/* getting apis*/}
    const getserie = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setserie(data)
    }

    const getProviders = async (url) => {
        const res = await fetch(url)
        const data = await res.json();
        // Verifique se BR e flatrate/rent existem antes de setar o estado
        setProvidersStream(data.results.BR?.flatrate || []);  // Se não houver flatrate, use um array vazio
        setProvidersRent(data.results.BR?.rent || []);  // Se não houver rent, use um array vazio
    }

    const getCast = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        const actors = data.cast.slice(0,4)
        const directorsList = data.crew.filter((crew) => crew.known_for_department === "Directing")

        setCast(actors)
        setDirector(directorsList)

    }

    useEffect(() => {
        getserie(`${serieUrl}${id}?${apiKey}&language=pt-br`)
        const urlProvider = `${serieUrl}${id}/watch/providers?${apiKey}`
        const urlCast = `${serieUrl}${id}/credits?${apiKey}`
        getProviders(urlProvider)
        getCast(urlCast)
        console.log(urlCast)
        console.log(urlProvider)
        console.log(urlCast)
    }, [id]);

    {/* utility functions */}

    console.log(director)

    console.log(cast)

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
                                <FaStar className="text-yellow-400"/> {serie.vote_average.toFixed(1)}
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-3 mt-1 md:justify-start text-Gray4 md:text-[18px] phone:text-[17px] phone:justify-center">
                            <p className="serie-release">
                                {serie.first_air_date.substring(0, 4)}
                            </p>
                            <span>|</span>
                            <p className="time">{`${serie.number_of_seasons} Seasons`}</p>
                            <span>|</span>
                            <p className="genre">{`${serie.number_of_episodes} Episodes`}</p>
                        </div>

                        <div className="flex flex-col mt-12 md:max-w-[800px] phone:max-w-[375px]">
                            <h1 className="text-white font-bold text-xl">OVERVIEW</h1>
                            <p className="text-WhiteText text-lg mt-4">{serie.overview}</p>
                            <div className="flex flex-col mt-9">
                                <p className="text-Gray4 flex flex-row md:text-[18px] gap-3 phone:text-[11.5px]">Starring : {cast.map((cast) => <h1
                                    className="text-WhiteText">{cast.name}</h1>)}</p>

                                <p className="text-Gray4 mt-3 flex flex-row md:text-[18px] gap-3 phone:text-[11.5px]">Created by
                                    : {director.map((director) => <h1
                                        className="text-WhiteText">{director.name}</h1>)}</p>

                                <p className="text-Gray4 mt-3 flex flex-row md:text-[18px] gap-3 phone:text-[13px]">Genre :
                                    <h1 className="text-WhiteText">{serie.genres
                                        .map((genre) => genre.name)
                                        .join(", ")}</h1>
                                </p>
                            </div>
                        </div>
                        <h1 className="text-WhiteText mt-6 font-bold text-lg">Stream</h1>
                        <div className="flex flex-row items-start ">
                            {providersStream.map((provider) => (
                                <div className="flex flex-col items-center mr-3">
                                    <img src={imgUrl + provider.logo_path} alt={`${provider.provider_name} logo`}
                                         className="w-[54px]"/>
                                    <h1 className="text-WhiteText text-xs]">{provider.provider_name}</h1>
                                </div>
                            ))}
                        </div>
                        <h1 className="text-WhiteText mt-2 font-bold text-lg">Rent</h1>
                        <div className="flex flex-row items-start ">
                            {providersRent.map((provider) => (
                                <div className="flex flex-col items-center mr-3">
                                    <img src={imgUrl + provider.logo_path} alt={`${provider.provider_name} logo`}
                                         className="w-[54px]"/>
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
    )

}

export default Serie;