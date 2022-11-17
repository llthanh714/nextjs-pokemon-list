import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface IPokemon {
  name: string;
  url: string;
}

interface IApiResponse {
  count: number;
  results: IPokemon[];
  next: string | null;
  previous: string | null;
}

export default function PokemonList() {
  const [data, setData] = useState<IApiResponse>();
  const [offset, setOffset] = useState(0);
  const limit = useRef(200);

  useEffect(() => {
    (async function () {
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
    })();
  });

  return (
    <div>
      <h2 className="text-center mt-2">PokemonApi - llthanh714</h2>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              id="pre-btn"
              className="page-link"
              onClick={() => {
                if (!!data?.previous) setOffset((prev) => prev - limit.current);
              }}
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a
              id="next-btn"
              className="page-link"
              onClick={() => {
                if (!!data?.next) setOffset((prev) => prev + limit.current);
              }}
            >
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
          {data?.results.map((pokemon: IPokemon, index: number) => (
            <tr key={index}>
              <td>{index + offset + 1}</td>
              <td>{pokemon.name}</td>
              <td>
                <Link href={`/${pokemon.name}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
