import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=56ee60e4';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    
    const searchMovies = async (title) => {
        setLoading(true);
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();


        setMovies(data.Search);
        setLoading(false);
        if (data.Error === "Too many results.") {
            alert(`The API returned an error for the search string you entered, because there are too many movies with ${title} in their name. Please try again.`);
        }

        if (data.Error === "Movie not found!") {
            alert(`The API returned an error for the search string you entered, because there are no movies with ${title} in their name. Please try again.`);
        }
    }

    useEffect(() => { 
        searchMovies("Superman");
    }, []);

    return (
        <div className="app">
            <h1>Movie Database</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Clickable Magnifying Glass, that acts as a search button."
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                loading===true?(
                    <div className="loading">
                        <h2>Loading......</h2>
                    </div>
                ):(movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>Search with a different value.</h2>
                        </div>
                    )
                )
            }

        </div>
    );
}

export default App;