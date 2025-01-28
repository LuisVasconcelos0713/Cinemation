import {useMovies} from "../../Usable/GettingMoviesProvider.tsx";
import MovieSection from "../../components/MovieSection/MovieSection.tsx";
import Loading from "../../components/Loading/Loading.tsx";

const AllSeries = () => {
    const {genreID,genre,seriesList} = useMovies()

    return (
        <div className="">
            {
                seriesList.length > 0
                    ? <MovieSection moviesList={seriesList} genreID={genreID} genre={genre} classStyle={"flex flex-row flex-wrap phone:justify-center phone:items-center"}></MovieSection>
                    : <Loading></Loading>
            }
        </div>
    );
}

export default AllSeries;