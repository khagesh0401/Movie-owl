import { useState, useEffect } from "react";
const KEY = "d9e4e01c";
export default function Usemovie(query) {
  const [movies, setMovies] = useState([]);
  const [errormessage, seterrormessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovieList() {
        try {
          seterrormessage("");
          setisLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search);
          seterrormessage("");
        } catch (error) {
          if (error.name !== "AbortError") seterrormessage(error.message);
        } finally {
          setisLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        seterrormessage("");
        return;
      }
      //   closeselectedmovie();
      getMovieList();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, errormessage };
}
