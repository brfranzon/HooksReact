import { useEffect } from "react";
import { useState } from "react";
import { JokeType } from "../types/types";

type useJokeResponse = {
  jokesList: JokeType;
  loading: boolean;
};

export function useJoke(firstName: string, lastName: string): useJokeResponse {

  const API = firstName && lastName ?
    `https://api.icndb.com/jokes/random/?firstName=${firstName}&lastName=${lastName}`:
    "https://api.icndb.com/jokes/random/?firstName=Bruno&lastName=Franzon";


  const [jokesList, setJokesList] = useState<JokeType>({
    type: "",
    value: {
      id: 0,
      joke: "",
      category: [],
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJokes();
  }, [firstName, lastName]);

  const fetchJokes = async () => {
    setLoading(true);
    await fetch(API)
      .then((res) => res.json())
      .then((jokes) => {
        setJokesList(jokes);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return { jokesList, loading };
}
