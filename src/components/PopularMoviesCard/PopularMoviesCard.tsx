import "../../App.css"
import {FaStar} from "react-icons/fa";

const imgUrl = import.meta.env.VITE_IMG;

interface movieCardProps {
    id: number;
    title: string;
    backdrop_path: string;
}

interface PopularMoviesCardProps {
    movieCardSmall: movieCardProps;
    movieCardLarge: movieCardProps;
}

const PopularMoviesCard = ({movieCardSmall, movieCardLarge}: PopularMoviesCardProps) => {
    return (
        <div className="md:w-[1580px] phone:w-[380px] md:block phone:hidden">
            <div className="flex flex-row mb-10 gap-x-4">
                <div className="w-3/6 h-[300px] bg-blue-800 rounded-3xl">
                    <img
                        src={imgUrl + movieCardSmall.backdrop_path}
                        alt={`Poster do filme ${movieCardSmall.title}`}
                        className="rounded-3xl w-full h-full object-cover shadow-2xl"
                    />
                    <div
                        className="flex flex-row mb-10 gap-x-4 absolute top-[330px] text-WhiteText font-bold text-3xl ml-3">
                        <h1 className="">{movieCardSmall.title}</h1>
                    </div>
                </div>
                <div className="w-4/6 h-[300px] bg-blue-800 rounded-3xl">
                <img
                        src={imgUrl + movieCardLarge.backdrop_path}
                        alt={`Poster do filme ${movieCardLarge.title}`}
                        className="rounded-3xl w-full h-full object-cover shadow-2xl"
                    />
                    <div className="flex flex-row mb-10 gap-x-4 absolute top-[330px] text-WhiteText font-bold text-3xl ml-3">
                        <h1 className="">{movieCardLarge.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularMoviesCard;