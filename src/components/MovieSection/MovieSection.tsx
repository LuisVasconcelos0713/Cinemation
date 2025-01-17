import "../../App.css"
import MovieCard from "../movieCard/MovieCard.tsx";
import {Link} from "react-router-dom";
import {MdKeyboardArrowRight} from "react-icons/md";

const MovieSection = ({moviesList,genreID,genre,classStyle}) => {

    const filteredMovies = genreID
    ? moviesList.filter((movie) => movie.genre_ids.includes(genre))
    : moviesList;

    return (
        <div className="">
            <div className="flex md:justify-start md:items-start flex-col phone:justify-center phone:items-center">
                <div>
                    <Link to={"/nowplayingmovies"} className={"flex flex-row items-end h-auto text-WhiteText hover:text-yellow-400 phone:items"}>
                        <h1 className="text-3xl font-semibold mt-4 text-WhiteText md:max-w-auto phone:max-w-max">Trending {genreID && `in ${genreID}`}</h1>
                        <MdKeyboardArrowRight className={"pt-8 pr-3 text-6xl"}/>
                    </Link>
                </div>
            </div>
            <div className={classStyle}>
                {filteredMovies.map((movie,index) => (
                    <MovieCard key={index} movie={movie}/>
                ))}
            </div>
        </div>
    );
}

export default MovieSection;