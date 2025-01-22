import "../../App.css";
import MovieCard from "../movieCard/MovieCard.tsx";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

// Definir a interface para a prop movie (caso você já tenha uma interface para os filmes)
interface Movie {
    id: number;
    title: string;
    genre_ids: number[];
    // Adicione outros campos conforme necessário
}

// Definir a tipagem para as props do MovieSection
interface MovieSectionProps {
    moviesList: Movie[];       // Lista de filmes, tipada como array de objetos Movie
    genreID: number | null;    // ID do gênero, pode ser número ou null
    genre: number;             // Gênero para filtrar os filmes
    classStyle: string;        // Classe de estilo adicional para o container
}

const MovieSection: React.FC<MovieSectionProps> = ({ moviesList, genreID, genre, classStyle }) => {
    // Filtrar os filmes baseado no gênero, se gênero for especificado
    const filteredMovies = genreID
        ? moviesList.filter((movie) => movie.genre_ids.includes(genre))
        : moviesList;

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
                {filteredMovies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default MovieSection;
