import '../../App.css';
import { FaStar } from "react-icons/fa";
import {Link} from "react-router-dom";
import movie from "../../Pages/Movie/Movie.tsx";

const imgUrl = import.meta.env.VITE_IMG;

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

const movieFiltered = (movie:Movie): string => {
    return movie.release_date.substring(0,4)
}

const serieFiltered = (serie:Serie): string => {
    return serie.first_air_date.slice(0,4)
}

type typeMedia = Movie | Serie

interface movieCardProps {
    movie: typeMedia
}

const MovieCard: React.FC<movieCardProps> = ({ movie }) => {

    // Validação para garantir que o componente não quebre
    if (!movie || (!('release_date' in movie) && !('first_air_date' in movie))) {
        console.warn("Dados insuficientes para renderizar o card:", movie);
        return null; // Não renderiza o componente
    }

    if (!movie || !movie.poster_path) {
        return null; // Evita renderizar se não houver dados necessários
    }

    return (
        <div className="rounded-lg p-4 md:w-[230px] flex flex-col items-center phone:w-[199px]">
            {/* Imagem do Filme */}
            <Link to={movie.release_date ? `/movie/${movie.id}` : `/tv/${movie.id}`}>
                <img
                    src={imgUrl + movie.poster_path}
                    alt={`Poster do filme ${movie.title}`}
                    className="rounded-3xl w-full h-auto mb-4 min-w-[180px] max-w-[180px] shadow-xl hover:scale-105"
                />
            </Link>
            {/* Informações do Filme */}
            <div className="text-start w-full pl-1 text-white">
                {/* Título */}
                <h1 className="text-sm font-bold truncate">{movie.title || movie.name || "Título não disponível"}</h1>

                {/* Nota e Data */}
                <div className="flex items-start w-full pl-1 gap-2 mt-2 text-sm">
                    <span className="text-yellow-400 font-semibold flex flex-row items-center gap-x-1"><FaStar /> {movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400">|</span>
                    {movie.release_date ? movieFiltered(movie as Movie) : serieFiltered(movie as Serie)}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
