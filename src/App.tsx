import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header.tsx";

function App() {
    return(
        <>
            <div className="bg-gray-800 h-screen ]">
                <div className="bg-gray-800 h-screen">
                    <div className="bg-custom-gradient h-screen flex justify-center items-baseline fixed inset-0 z-10 overflow-y-scroll">
                        <div className="flex items-center justify-between p-3 flex-col md:max-w-[1690px] mt-1 phone:max-w-[423px] phone:flex-col phone:justify-center phone:items-center">
                            <Header/>
                            <Outlet/>
                            {/* footer padrão cibercove */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App