import "../../App.css";
import MovieCard from "../movieCard/MovieCard.tsx";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

// Definir a interface para a prop movie (caso você já tenha uma interface para os filmes)

interface Media {
    id: number;
    vote_average: number;
    genre_ids: number[];
    poster_path: string;
    genres: { id: number; name: string }[];
    overview: string;
}

interface Movie extends Media {
    title: string;
    release_date: string;
    runtime: number;
    genre_ids: number[];
}

interface Serie extends Media {
    name: string;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    genre_ids: number[];
}

// Definir a tipagem para as props do MovieSection
interface MovieSectionProps {
    moviesList: Media[];       // Lista de filmes, tipada como array de objetos Movie
    genreID: string | number | null;    // ID do gênero, pode ser número ou null
    genre: number;             // Gênero para filtrar os filmes
    classStyle: string;        // Classe de estilo adicional para o container
}

type typeMedia = Movie | Serie;


const MovieSection: React.FC<MovieSectionProps> = ({ moviesList, genreID, genre, classStyle }) => {

    // Filtrar os filmes baseado no gênero, se gênero for especificado
    const filteredMovies: typeMedia[] = genreID
        ? moviesList.filter((media): media is typeMedia => {
            return ("title" in media || "name" in media) && media.genre_ids.includes(genre);
        })
        : moviesList.filter((media): media is typeMedia => "title" in media || "name" in media);

    return (
        <div className="">
            <div className="flex md:justify-start md:items-start flex-col phone:justify-center phone:items-center">
                <div>
                    <Link to={"/nowplayingmovies"} className={"flex flex-row items-end h-auto text-WhiteText hover:text-yellow-400 phone:items"}>
                        <h1 className="text-3xl font-semibold mt-4 text-WhiteText md:max-w-auto phone:max-w-max">
                            Trending {genreID && `in ${genreID}`}
                        </h1>
                        <MdKeyboardArrowRight className={"pt-8 pr-3 text-6xl"} />
                    </Link>
                </div>
            </div>
            <div className={classStyle}>
                {filteredMovies.map((media:typeMedia, index:number) => (
                    <MovieCard key={index} movie={media} />
                ))}
            </div>
        </div>
    );
}

export default MovieSection;
