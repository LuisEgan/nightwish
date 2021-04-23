import { useRouter } from "next/router";
import Button from "../components/Button";
import { ROUTES } from "../lib/constants";

const BuyTicket = () => {
  const { push } = useRouter();

  return (
    <div className="page-container">
      <Button onClick={() => push(ROUTES.PUBLIC_ROUTES.claim)}>
        Redeem ticket
      </Button>
    </div>
  );
};

export default BuyTicket;
