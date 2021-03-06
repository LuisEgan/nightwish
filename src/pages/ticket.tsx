import React, { useContext, useState } from "react";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../components/Pages/Login/login.module.scss";
import Input from "../components/Input";
import api from "../api";
import Button from "../components/Button";
import { UserContext } from "../contexts/user/user.context";
import { ROUTES } from "../lib/constants";

interface IForm {
  code: string;
}

const LoginRedeem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const { push } = useRouter();
  const { setUser, ticketCode, setTicketCode } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.redeemTicket(values);

      const { user } = res;
      setUser(user);
      setTicketCode(null);
      setSuccess("Success! Enjoy the show 🤘");

      setTimeout(() => {
        push(ROUTES.PRIVATE_ROUTES.events);
      }, 3000);
    } catch (e) {
      setError(e.message || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container bg-black flex justify-center items-center px-10 md:p-32">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3
          className={styles.title}
          style={{
            maxWidth: "32em",
            marginLeft: "auto",
          }}
        >
          Register your ticket
        </h3>
        <div className={styles.content}>
          <div className={styles.subtitle}>Enter your ticket code</div>

          <Input
            {...register("code", {
              required: "Please type in your ticket code",
            })}
            placeholder="Ticket code here"
            className="text-center"
            error={errors.code?.message}
            defaultValue={ticketCode}
          />

          {error && (
            <div className="text-base text-center text-red-500 py-3">
              {error}
            </div>
          )}

          {success && (
            <div className="text-base text-center text-green-700 py-3">
              {success}
            </div>
          )}

          <div className="flex justify-center pt-5">
            <Button
              id="redeem"
              type="submit"
              className=""
              variant="black"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register ticket"}
            </Button>
          </div>

          <div className="pt-6 text-center">
            Need help? See our{" "}
            <Link href={ROUTES.PUBLIC_ROUTES.support}>
              <a className="underline">Support</a>
            </Link>{" "}
            page
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginRedeem;
