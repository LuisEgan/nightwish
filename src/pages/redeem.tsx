import React, { useState } from "react";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import styles from "../components/Pages/Login/login.module.scss";
import Input from "../components/Input";
import api from "../api";
import Button from "../components/Button";

interface IForm {
  code: string;
}

const LoginRedeem = () => {
  //   const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      await api.redeemTicket(values);
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
          <div className={styles.subtitle}>Enter your ticket code</div>

          <Input
            {...register("code", {
              required: "Please input your ticket",
            })}
            placeholder="Ticket code"
            error={errors.code?.message}
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
              {loading ? "Loading..." : "Redeem"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginRedeem;
