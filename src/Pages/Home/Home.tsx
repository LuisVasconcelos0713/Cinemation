import '../../App.css'
import Header from "../../components/Header/Header.tsx";
import PopularMoviesCard from "../../components/PopularMoviesCard/PopularMoviesCard.tsx";
import GenreChange from "../../components/GenreChange/GenreChange.tsx";
import MovieSection from "../../components/MovieSection/MovieSection.tsx";
import {useMovies} from "../../Usable/GettingMoviesProvider.tsx";


const Home = () => {
    const {moviesList, genreChangeHandler, genre, genreID} = useMovies()

    return (
        <>
            {moviesList.length > 0 &&
                <div className="">
                    <div className="md:mt-0 flex justify-center items-baseline phone:mt-[12px]">
                        <div className="flex items-center justify-between p-3 flex-col md:max-w-[1800px] phone:max-w-[375px] overflow-hidden">
                                <PopularMoviesCard
                                    movieCardSmall={moviesList[1]}
                                    movieCardLarge={moviesList[2]}/>
                                <GenreChange genreColector={genreChangeHandler}></GenreChange>
                                <MovieSection
                                    moviesList={moviesList}
                                    genreID={genreID}
                                    genre={genre}
                                    classStyle={"flex md:flex-row md:h-auto overflow-hidden max-w-[1500px] phone:flex-col phone:h-[380px] phone:overflow-hidden phone:items-center"}>
                                </MovieSection>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default Home;