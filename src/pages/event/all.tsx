import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { ROUTES } from "../../lib/constants";

interface IForm {
  code: string;
}

interface IRow {
  date: string;
  onClick: () => void;
  countdown?: string;
  buttonText?: string;
}
const Row = (props: IRow) => {
  const { date, countdown, onClick, buttonText = "Buy now" } = props;

  return (
    <div
      className={`rounded-3xl border-brown-main border-2 flex flex-col p-10 mt-5 md:flex-row md:items-center ${
        countdown ? "bg-brown-main text-black" : "text-brown-main"
      }`}
    >
      <div className="flex-1 mb-5 md:mb-0 md:text-2xl">VIP Europe | {date}</div>

      {countdown && (
        <div className="text-2xl mb-5 md:mb-0 md:px-10">
          Start in {countdown}
        </div>
      )}

      <Button
        className="md:w-1/5"
        onClick={onClick}
        variant={countdown ? "brown" : "primary"}
      >
        {countdown ? "Watch soon" : buttonText}
      </Button>
    </div>
  );
};

interface IConcert extends Partial<IRow> {
  date: string;
}

const Events = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const concerts = () => {
    const c: IConcert[] = [
      { date: "Fri, May 28th, 17:00" },
      { date: "Fri, May 29th, 17:00", buttonText: "Owned" },
      { date: "Fri, May 30th, 17:00" },
      { date: "Fri, May 31th, 17:00", countdown: "42 minutes" },
    ];

    return c;
  };

  const handleRedeem = async ({ code }: IForm) => {
    try {
      await api.redeemTicket({ code });
    } catch (error) {
      console.error("handleRedeem - error: ", error);
    }
  };

  const handleConcertClick = (concert: IConcert) => {
    console.error("concert: ", concert);
  };

  return (
    <div className="page-container px-7 md:px-60">
      <div className="py-12">
        <div className="flex flex-col">
          <span className="text-brown-main text-3xl">Redeem your ticket</span>

          <div className="flex flex-col py-10 md:items-center md:flex-row">
            <Input
              {...register("code", {
                required: "Please input your ticket",
              })}
              placeholder="Ticket code"
              error={errors.code?.message}
              className="flex-1"
              outline
            />

            <Button className="md:ml-5" onClick={handleSubmit(handleRedeem)}>
              Validate
            </Button>
          </div>
        </div>

        <div>
          <span className="text-brown-main text-4xl">Available concerts</span>
          {concerts().map((concert) => (
            <Row
              key={concert.date}
              {...concert}
              onClick={() => handleConcertClick(concert)}
            />
          ))}
        </div>

        <div className="text-center text-brown-main py-5">
          Need Help?{" "}
          <Link href={ROUTES.PUBLIC_ROUTES.support}>
            <a className="underline">Click here</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
