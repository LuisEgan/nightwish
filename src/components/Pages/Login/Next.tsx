import React from "react";
import Link from "next/link";
import Button from "../../Button";
import { ROUTES } from "../../../lib/constants";

interface ILoginNext {
  onClick: () => void;
  buttonText?: string;
  disabled?: boolean;
}

const LoginNext = (props: ILoginNext) => {
  const { onClick, buttonText = "Next", disabled } = props;

  return (
    <div className="flex flex-col md:flex-row-reverse">
      <Button
        className="flex-1"
        variant="black"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      <span className="py-2 flex-2">
        Need Help?{" "}
        <Link href={ROUTES.PUBLIC_ROUTES.support}>
          <a className="underline">Click here</a>
        </Link>
      </span>
    </div>
  );
};

export default LoginNext;
