import "../../App.css"
import imagem from "../../assets/1124-removebg-preview.png"
import {Link, useNavigate} from "react-router-dom";
import {useMovies} from "../../Usable/GettingMoviesProvider.tsx";
import {BiSearchAlt2} from "react-icons/bi";
import {useState} from "react";
const Header = () => {

    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate()

    const onHandleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!search)return
        navigate(`search?q=${search}`)
        setSearch("")
    }

    const {genre,setGenre} = useMovies()

    const switchGenreHandleSerie = ():void => {
        if(genre == 28){
            setGenre(10759)
        }
        else if (genre == 27){
            setGenre(9648)
        }
        else if (genre == 10749){
            setGenre(10751)
        }
    }

    const switchGenreHandleMovie = ():void => {
        if(genre == 10759){
            setGenre(28)
        }
        else if (genre == 9648){
            setGenre(27)
        }
        else if (genre == 10751){
            setGenre(10749)
        }
    }

    return (
        <div className="flex md:flex-row items-center justify-between md:w-[1543px] md:h-12 md:mb-5 md:mr-48 phone:w-[423px] phone:h-72 phone:mr-0 phone:flex-col phone:mb-16">
            <Link to={"/"}><img src={imagem} alt="logo" className="md:w-96 phone:w-[423px]" /></Link>
            <div className="bg-gray-800 rounded-3xl w-52 md:mb-0 flex flex-row items-center justify-around md:mr-36 shadow-2xl phone:mr-0 phone:mb-9">
                <Link to={"/nowplayingmovies"} className="text-WhiteText p-4 hover:bg-gray-700 rounded-3xl w-28 hover:scale-105 text-center" onClick={switchGenreHandleMovie}>Movie</Link>
                <Link to={"/nowplayingseries"} className="text-WhiteText p-4 hover:bg-gray-700 rounded-3xl w-28 hover:scale-105 text-center" onClick={switchGenreHandleSerie}>Serie</Link>
            </div>
            <div>
                <form className={"flex md:flex-row items-center justify-center gap-2 phone:flex-col"} onSubmit={onHandleSubmit}>
                    <input type="text"
                           placeholder="Search..."
                           className="p-3 rounded-3xl text-sm bg-gray-800 text-WhiteText font-semibold shadow-2xl"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                    >
                    </input>
                    <button type={"submit"} className={"md:w-12 md:h-12 bg-amber-300 flex items-center justify-center rounded-2xl phone:w-[200px] phone:h-[33px]"}><BiSearchAlt2 className="text-2xl"></BiSearchAlt2></button>
                </form>
            </div>
        </div>
    );
}

export default Header;