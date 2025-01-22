import "../../App.css"
import { BsFire } from "react-icons/bs";
import { LuSwords } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { RiBearSmileFill } from "react-icons/ri";
import { RiGhostSmileFill } from "react-icons/ri";
import { LuDrama } from "react-icons/lu";
import { FaHandcuffs } from "react-icons/fa6";
import * as React from "react";





interface Igenres {
    id:number | null,
    icon: JSX.Element,
    label:string,
}

interface IgenreColector {
    genreColector: (id: number | null) => void
}


const GenreChange: React.FC<IgenreColector> = ({genreColector}) => {

    const genres: Igenres[] = [
        {id:null, icon: <BsFire className="text-[28px]"/>, label: "Trending"},
        {id:28,icon: <LuSwords className="text-[28px]"/>, label: "Action"},
        {id:10749, icon: <FaHeart className="text-[26px]"/>, label: "Romance"},
        {id: 16, icon: <RiBearSmileFill className="text-[28px]"/>, label: "Animation"},
        {id: 27, icon: <RiGhostSmileFill className="text-[28px]"/>, label: "Horror" },
        {id: 18, icon: <LuDrama className="text-[28px]"/>, label: "Drama"},
        {id: 80, icon: <FaHandcuffs className="text-[28px]"/>, label: "Crime"}
    ]

    const genreChanger = (genreId:number | null) => {
        genreColector(genreId || null); // Se for null, exibe todos os itens
    }

    const buttonClass = () => {
        return "flex flex-row gap-1 items-center md:w-[212px] md:h-[70px] rounded-[20px] bg-Gray2 p-6 justify-center text-[15px] font-semibold hover:bg-Gray3 shadow-2xl hover:scale-105 phone:w-[154px] phone:h-[40px]"
    }

    return(
        <>
            <div className="flex md:flex-row w-auto gap-4 text-WhiteText md:flex-wrap phone:flex-wrap phone:w-full  phone:items-center phone:justify-center">
                {genres.map((genre:Igenres) => (
                    <button
                        key={genre.id ?? "Trending"}
                        className={buttonClass()}
                        onClick={() => {genreChanger(genre.id)}}
                    >
                        {genre.icon} {genre.label}
                    </button>
                ))}
            </div>
        </>
    )
}

export default GenreChange