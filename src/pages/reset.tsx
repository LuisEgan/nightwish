import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";
import Input from "../components/Input";
import { BASE_PATH, ROUTES } from "../lib/constants";

import styles from "../components/Pages/Login/login.module.scss";
import Button from "../components/Button";
import api from "../api";
import { getUrlParameter } from "../lib/strings";

interface IForm {
  password: string;
  passwordConfirm: string;
}

const Reset = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>();

  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPassConfirm, setShowPassConfirm] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [resetToken, setResetToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // * Check there's a code and an email in the url
  useEffect(() => {
    const urlToken = getUrlParameter("t");
    const urlEmail = getUrlParameter("email");
    if (!urlToken || !urlEmail) {
      push(ROUTES.PUBLIC_ROUTES.login);
    } else {
      setResetToken(`${urlToken}`);
      setEmail(`${urlEmail}`);
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (values: IForm) => {
    setLoading(true);
    try {
      const res = await api.resetPassword({
        email,
        password: values.password,
        resetToken,
      });

      const { success: successRes } = res;

      if (!successRes) {
        throw new Error("There was a problem");
      }
      setSuccess(successRes);
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
          <div className={styles.subtitle}>Reset</div>

          <Input
            type={showPass ? "text" : "password"}
            placeholder="Min. 8 characters password"
            title="Enter your new password"
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
            title="Cofirm your new password"
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
            {success ? (
              <div className="flex flex-col">
                <div className="text-green-700 pb-5">
                  Success! You updated your password
                </div>
                <Button
                  type="button"
                  variant="black"
                  disabled={loading}
                  onClick={() => push(ROUTES.PUBLIC_ROUTES.login)}
                >
                  Go to login page
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                className=""
                variant="black"
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset password"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reset;
