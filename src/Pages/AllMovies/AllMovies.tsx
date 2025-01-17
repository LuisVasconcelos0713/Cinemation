import {useMovies} from "../../Usable/GettingMoviesProvider.tsx";
import MovieSection from "../../components/MovieSection/MovieSection.tsx";

const AllMovies = (props) => {
    const {moviesList,genreID,genre} = useMovies()

    return (
        <div className="">
            <MovieSection moviesList={moviesList} genreID={genreID} genre={genre} classStyle={"flex flex-row flex-wrap phone:items-center phone:justify-center"}></MovieSection>
        </div>
    );
}

export default AllMovies;