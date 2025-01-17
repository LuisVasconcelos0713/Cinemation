import {useMovies} from "../../Usable/GettingMoviesProvider.tsx";
import MovieCard from "../../components/movieCard/MovieCard.tsx";
import MovieSection from "../../components/MovieSection/MovieSection.tsx";

const AllSeries = (props) => {
    const {moviesList,genreID,genre,seriesList} = useMovies()

    return (
        <div className="">
            <MovieSection moviesList={seriesList} genreID={genreID} genre={genre} classStyle={"flex flex-row flex-wrap phone:justify-center phone:items-center"}></MovieSection>
        </div>
    );
}

export default AllSeries;