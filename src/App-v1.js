import { useEffect, useRef, useState } from "react";
import Starrating from "./Starrating";
import Usemovie from "./usemovie";
import UseLocalStorageState from "./UseLocalStorageState";
import UseKey from "./usekey";
const KEY = "d9e4e01c";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, errormessage } = Usemovie(query);
  const [selectedmovie, setselectedmovie] = useState(null);

  // const [watched, setWatched] = useState(function () {
  //   const localdata = localStorage.getItem("watched");
  //   return JSON.parse(localdata);
  // });
  const [watched, setWatched] = UseLocalStorageState([], "watched");

  /*
  useEffect(function () {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
      .then((i) => i.json())
      .then((data) => setMovies(data.Search));
  }, []);
 */

  function onclickselect(id) {
    setselectedmovie((selectedmovie) => (selectedmovie === id ? null : id));
  }

  function closeselectedmovie() {
    setselectedmovie(null);
  }

  function addwatchedmovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handledeletewatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* <Box element={<ListBox1 movies={movies} />} />

        <Box
          element={
            <>
              <Summary watched={watched} />
              <ListBox2>
                {watched.map((movie) => (
                  <Watchedmovies movie={movie} key={movie.imdbID} />
                ))}
              </ListBox2>
            </>
          }
        /> */}

        <Box>
          {/* {isLoading ? <Loader /> : <ListBox1 movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !errormessage && (
            <ListBox1
              movies={movies}
              onclickselect={onclickselect}
              selectedmovie={selectedmovie}
            />
          )}
          {errormessage && <Errormessage message={errormessage} />}
        </Box>
        <Box>
          {selectedmovie ? (
            <Moviedetails
              selectedmovie={selectedmovie}
              closeselectedmovie={closeselectedmovie}
              onaddwatched={addwatchedmovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <ListBox2
                watched={watched}
                onhandledeletewatched={handledeletewatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Errormessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🦉</span>
      <h1>Movie Owl</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  UseKey("Enter", function callback(e) {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function ListBox1({ movies, onclickselect, selectedmovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onclickselect={onclickselect}
          selectedmovie={selectedmovie}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, onclickselect, selectedmovie }) {
  return (
    <li
      onClick={() => {
        onclickselect(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function Moviedetails({
  selectedmovie,
  closeselectedmovie,
  onaddwatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [userRating, setuserrating] = useState("");
  const iswatched = watched.map((i) => i.imdbID).includes(selectedmovie);
  const watcheduserrating = watched.find(
    (i) => i.imdbID === selectedmovie
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleaddwatched() {
    const movie = {
      imdbID: selectedmovie,
      imdbRating: Number(imdbRating),
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      title,
      year,
      userRating,
    };
    onaddwatched(movie);

    closeselectedmovie();
  }
  useEffect(
    function () {
      async function getMovieDetails() {
        setisLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedmovie}`
        );

        const data = await res.json();
        setMovie(data);
        setisLoading(false);
      }
      getMovieDetails();
    },
    [selectedmovie]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie-${title}`;
      return function () {
        document.title = "Movie Owl";
      };
    },
    [title]
  );

  UseKey("Escape", closeselectedmovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeselectedmovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>✨</span>
                {imdbRating}IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <Starrating
                    maxrating={10}
                    size={24}
                    onsetmovierating={setuserrating}
                  />

                  {userRating ? (
                    <button className="btn-add" onClick={handleaddwatched}>
                      + Add to list
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p>You rated this movie {watcheduserrating} 🌟</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function ListBox2({ watched, onhandledeletewatched }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <Watchedmovies
          movie={movie}
          key={movie.imdbID}
          onhandledeletewatched={onhandledeletewatched}
        />
      ))}
    </ul>
  );
}

function Watchedmovies({ movie, onhandledeletewatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onhandledeletewatched(movie.imdbID)}
        >
          ❌
        </button>
      </div>
    </li>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
