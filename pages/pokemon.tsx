import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface apiResponse {
  count: number;
  results: Pokemon[];
  next: string | null;
  previous: string | null;
}

function PokemonList() {
  const [data, setData] = useState<apiResponse>();
  const [offset, setOffset] = useState(0);
  const limit = useRef(50);

  const getPokemons = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: limit.current,
          offset: offset,
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  useEffect(() => {
    getPokemons()
  });

  return (
    <div>
      <h2 className="text-center mt-2">PokemonApi - llthanh714</h2>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a id="pre-btn" className="page-link"
            onClick={() => {
                if (!!data?.previous)
                setOffset((prev) => prev - limit.current);
            }}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a id="next-btn" className="page-link" onClick={() => {
                if (!!data?.next)
                setOffset((prev) => prev + limit.current);
            }}>
              Next
            </a>
          </li>
        </ul>
      </nav>
      <table className="table table-striped table-hover mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Pokemon</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((pokemon: Pokemon, index: number) => (
            <tr key={index}>
              <td>{index + offset + 1}</td>
              <td>{pokemon.name}</td>
              <td>
                <a href={pokemon.url}>Detail</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
