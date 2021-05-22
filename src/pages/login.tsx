import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { ReactSVG } from "react-svg";
import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../components/Input";
import { EMAIL_REGEX, ROUTES } from "../lib/constants";

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

  const { push } = useRouter();
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      const res = await api.login(values);

      const { accessToken, user } = res;

      await login({ accessToken, user });

      push(ROUTES.PRIVATE_ROUTES.redeem);
    } catch (e) {
      setError(e.message || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container bg-black flex justify-center items-center px-10 md:p-32">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <div className={styles.subtitle}>Login</div>

          <Input
            {...register("email", {
              required: "Please input your email",
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
                src={showPass ? "/svg/eye.svg" : "/svg/eye-off.svg"}
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

          {error && (
            <div className="text-base text-center text-red-500 py-3">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-5">
            <Button type="submit" variant="black" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>

          <div className="pt-2 text-center">
            Don&apos;t have an account yet?{" "}
            <Link href={ROUTES.PUBLIC_ROUTES.register}>
              <a className="underline">Register here</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
