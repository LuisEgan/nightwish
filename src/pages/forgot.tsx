import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import Input from "../components/Input";
import { EMAIL_REGEX, ROUTES } from "../lib/constants";
import styles from "../components/Pages/Login/login.module.scss";
import Button from "../components/Button";
import api from "../api";

interface IForm {
  email: string;
}

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      const res = await api.forgotPasword(values);

      const { success: successRes } = res;

      if (successRes) {
        setSuccess(successRes);
      } else {
        throw new Error("The was a problem");
      }
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
          <div className={styles.subtitle}>Forgot</div>

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

          {error && (
            <div className="text-base text-center text-red-500 py-3">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-5">
            {!success ? (
              <Button type="submit" variant="black" disabled={loading}>
                {loading ? "Loading..." : "Send email"}
              </Button>
            ) : (
              <div className="text-center">
                We sent you an email to reset your password
              </div>
            )}
          </div>

          <div className="pt-2 text-center">
            <Link href={ROUTES.PUBLIC_ROUTES.login}>
              <a className="underline">Go back</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
