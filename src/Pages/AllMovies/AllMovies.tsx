import {useMovies} from "../../Usable/GettingMoviesProvider.tsx";
import MovieSection from "../../components/MovieSection/MovieSection.tsx";
import Loading from "../../components/Loading/Loading.tsx";

const AllMovies = () => {
    const {moviesList,genreID,genre} = useMovies()

    return (
        <div className="">
            {
                moviesList.length > 0
                    ? <MovieSection moviesList={moviesList} genreID={genreID} genre={genre} classStyle={"flex flex-row flex-wrap phone:items-center phone:justify-center"}></MovieSection>
                    : <Loading></Loading>

            }
        </div>
    );
}

export default AllMovies;