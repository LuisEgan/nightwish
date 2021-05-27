import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { ReactSVG } from "react-svg";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../components/Input";
import { BASE_PATH, EMAIL_REGEX, ROUTES } from "../lib/constants";

import styles from "../components/Pages/Login/login.module.scss";
import Button from "../components/Button";
import api from "../api";
import { UserContext } from "../contexts/user/user.context";

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const { push, query } = useRouter();
  const { login, ticketCode } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      const res = await api.login(values);

      const { accessToken, user } = res;

      await login({ accessToken, user });

      const redirectTo = ticketCode
        ? ROUTES.PRIVATE_ROUTES.ticket
        : query.redirectTo
        ? query.redirectTo
        : user.eventAccess && user.eventAccess.length > 0
        ? ROUTES.PRIVATE_ROUTES.events
        : ROUTES.PRIVATE_ROUTES.ticket;

      push(`${redirectTo}`);
    } catch (e) {
      setError(e.message || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container bg-black flex justify-center items-center px-10 md:p-32 md:pt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <div className={styles.subtitle}>Login</div>

          <Input
            {...register("email", {
              required: "Please type in your email",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email",
              },
            })}
            type="email"
            placeholder="Email address"
            error={errors.email?.message}
          />

          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            icon={
              <ReactSVG
                src={
                  showPass
                    ? `${BASE_PATH}/svg/eye.svg`
                    : `${BASE_PATH}/svg/eye-off.svg`
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
              required: "Please type in your password",
            })}
            error={errors.password?.message}
          />

          {error && (
            <div className="text-base text-center text-red-500 py-3">
              {error}
              <br />
              <Link href={ROUTES.PUBLIC_ROUTES.register}>
                <a className="underline">Register here</a>
              </Link>{" "}
              if you don´t have an account
            </div>
          )}

          <div className="flex justify-center pt-5 mb-5">
            <Button type="submit" variant="black" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>

          <div className="pt-2 text-center flex flex-col">
            <div>
              Don´t have an account yet?{" "}
              <Link href={ROUTES.PUBLIC_ROUTES.register}>
                <a className="underline">Register here</a>
              </Link>
            </div>

            <div className="pt-5">
              <Link href={ROUTES.PUBLIC_ROUTES.forgot}>
                <a className="underline">Forgot your password?</a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
