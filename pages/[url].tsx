import { useRouter } from "next/router";

export default function PokeDetail() {
  const router = useRouter();
  const { url } = router.query;
  return <h3>{url}</h3>;
}
