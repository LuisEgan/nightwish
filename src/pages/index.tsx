import { useRouter } from "next/router";
import Button from "../components/Button";
import { ROUTES } from "../lib/constants";

const Home = () => {
  const { push } = useRouter();

  return (
    <div className="page-container">
      <Button onClick={() => push(ROUTES.PUBLIC_ROUTES.buyticket)}>
        Buy ticket
      </Button>
    </div>
  );
};

export default Home;
