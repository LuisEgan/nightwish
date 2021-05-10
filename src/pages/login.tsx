import React, { useState } from "react";
import LoginEmail from "../components/Pages/Login/Email";
import LoginPassword from "../components/Pages/Login/Password";
import LoginRedeem from "../components/Pages/Login/Redeem";

interface ISteps {
  setStep: (step: number) => void;
}
const Steps = (props: ISteps) => [
  <LoginEmail key={0} {...props} />,
  <LoginPassword key={1} {...props} />,
  <LoginRedeem key={2} />,
];

const Login = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="page-container bg-black flex justify-center items-center px-10 md:p-32">
      <div className="fadeIn">{Steps({ setStep })[step]}</div>
    </div>
  );
};

export default Login;
