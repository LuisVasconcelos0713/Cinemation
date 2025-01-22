import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import AllMovies from "./Pages/AllMovies/AllMovies.tsx";
import GettingMoviesProvider from "./Usable/GettingMoviesProvider.tsx";
import Movie from "./Pages/Movie/Movie.tsx";
import AllSeries from "./Pages/AllSeries/AllSeries.tsx";
import Serie from "./Pages/Serie/Serie.tsx";
import Search from "./Pages/Search/Search.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <GettingMoviesProvider>
        <Routes>
            <Route element={<App/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/nowplayingmovies" element={<AllMovies/>}/>
                <Route path="/movie/:id" element={<Movie/>}></Route>
                <Route path="/search" element={<Search/>}></Route>
                <Route path="/nowplayingseries" element={<AllSeries/>}/>
                <Route path="/tv/:id" element={<Serie/>}></Route>
            </Route>
        </Routes>
        </GettingMoviesProvider>
    </BrowserRouter>
  </StrictMode>,
)
