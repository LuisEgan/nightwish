import React, { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import { useForm } from "react-hook-form";
import { ILoginPage } from "./Types";

import styles from "./login.module.scss";
import Input from "../../Input";
import LoginNext from "./Next";
import { UserContext } from "../../../contexts/user/user.context";

interface IForm {
  password: string;
  passwordConfirm: string;
}

const LoginPassword = (props: ILoginPage) => {
  const { setStep } = props;

  const { login } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPassConfirm, setShowPassConfirm] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const onNext = async () => {
    setLoading(true);

    try {
      // TODO login should return user

      setTimeout(() => {
        login({
          accessToken: "token",
          user: {
            email: "eganluis@gmail.com",
            name: `Luis_${Math.random()}`,
          },
        });

        setStep(2);
      }, 500);
    } catch (error) {
      console.error("onNext - error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <div className={styles.title}>Create account</div>
      <div className={styles.content}>
        <div className={styles.subtitle}>Enter your password</div>

        <Input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          icon={
            <ReactSVG
              src={
                showPass
                  ? "/nightwish/svg/eye.svg"
                  : "/nightwish/svg/eye-off.svg"
              }
              height={20}
              width={20}
              onClick={() => setShowPass(!showPass)}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: ${20}px; height: ${20}px;`);
              }}
            />
          }
          {...register("password", {
            required: "Please input your password",
          })}
          error={errors.password?.message}
        />

        <Input
          type={showPassConfirm ? "text" : "password"}
          placeholder="Confirm password"
          icon={
            <ReactSVG
              src={
                showPassConfirm
                  ? "/nightwish/svg/eye.svg"
                  : "/nightwish/svg/eye-off.svg"
              }
              height={20}
              width={20}
              onClick={() => setShowPassConfirm(!showPassConfirm)}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: ${20}px; height: ${20}px;`);
              }}
            />
          }
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value !== getValues("password") ? "Password don't match" : true,
          })}
          error={errors.passwordConfirm?.message}
        />

        <LoginNext
          onClick={handleSubmit(onNext)}
          disabled={loading}
          buttonText={loading ? "Loading..." : "Next"}
        />
      </div>
    </form>
  );
};

export default LoginPassword;
