import '../../App.css';
import { FaStar } from "react-icons/fa";
import {Link} from "react-router-dom";

const imgUrl = import.meta.env.VITE_IMG;

const movieFiltered = (movie) => {
    return movie.release_date.substring(0,4)
}

const serieFiltered = (serie) => {
    return serie.first_air_date.slice(0,4)
}


const MovieCard = ({ movie }) => {

    // Validação para garantir que o componente não quebre
    if (!movie || (!movie.release_date && !movie.first_air_date)) {
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
                    {movie.release_date ? movieFiltered(movie) : serieFiltered(movie)}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
