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
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>();

  const { push } = useRouter();
  const { login } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPassConfirm, setShowPassConfirm] = useState<boolean>(false);

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      const res = await api.register(values);

      const { accessToken, user } = res;

      await login({ accessToken, user });

      push(ROUTES.PRIVATE_ROUTES.ticket);
    } catch (e) {
      setError(e.message || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container bg-black flex justify-center items-center px-10 md:p-32 md:pt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3
          className={styles.title}
          style={{ maxWidth: "32rem", marginLeft: "auto" }}
        >
          You need to create an account in order to register your ticket
        </h3>
        <div className={styles.content}>
          <div className={styles.subtitle}>Register</div>

          <Input
            title="Enter your email address"
            type="email"
            placeholder="your@email.com"
            containerClassName="mb-2"
            {...register("email", {
              required: "Please input your email",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email",
              },
            })}
            error={errors.email?.message}
          />

          <Input
            title="Confirm your email"
            type="email"
            placeholder="your@email.com"
            containerClassName="mb-10"
            {...register("emailConfirm", {
              required: "Please validate your email",
              validate: (value) =>
                value !== getValues("email") ? "Emails don't match" : true,
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email",
              },
            })}
            error={errors.emailConfirm?.message}
          />

          <Input
            type={showPass ? "text" : "password"}
            placeholder="Min. 8 characters password"
            title="Choose a password"
            containerClassName="mb-2"
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
              required: "Please input your password",
            })}
            error={errors.password?.message}
          />

          <Input
            type={showPassConfirm ? "text" : "password"}
            placeholder="Min. 8 characters password"
            title="Cofirm your password"
            icon={
              <ReactSVG
                src={
                  showPassConfirm
                    ? `${BASE_PATH}/svg/eye.svg`
                    : `${BASE_PATH}/svg/eye-off.svg`
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
              required: "Please confirmirm your password",
              validate: (value) =>
                value !== getValues("password") ? "Password don't match" : true,
            })}
            error={errors.passwordConfirm?.message}
          />

          {error && (
            <div className="text-base text-center text-red-500 py-3">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-5">
            <Button
              type="submit"
              className=""
              variant="black"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </div>

          <div className="pt-6 text-center">
            Already registered?{" "}
            <Link href={ROUTES.PUBLIC_ROUTES.login}>
              <a className="underline">Login here</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
