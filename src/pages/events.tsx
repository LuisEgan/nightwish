import Link from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import party from "party-js";

import api from "../api";
import Button from "../components/Button";
import Input from "../components/Input";
import { UserContext } from "../contexts/user/user.context";
import { EVENTS_BY_ID, ROUTES } from "../lib/constants";
import EventRow, { IEventRow } from "../components/Pages/Event/EventRow";

interface IForm {
  code: string;
}

interface IEvent extends IEventRow {
  owned: boolean;
}

const Events = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const { setUser, user } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const boom = () => {
    const element = document.getElementById("redeem");
    party.confetti(element, {
      count: party.variation.range(20, 40),
    });
  };

  const events = () => {
    const c: IEvent[] = Object.keys(EVENTS_BY_ID).map((eventId) => {
      const { title, date } = EVENTS_BY_ID[eventId];
      return {
        eventId,
        title,
        date,
        owned: user?.eventAccess.includes(+eventId),
      };
    });

    // This sorts the events first by owned and then by date
    c.sort((a, b) =>
      a.owned === b.owned ? (a.date < b.date ? -1 : 1) : a.owned ? -1 : 1,
    );
    // c.sort((a, b) => (a.date < b.date ? -1 : 1));
    return c;
  };

  const handleRedeem = async (body: IForm) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.redeemTicket(body);
      const { user: updatedUser } = res;
      setUser(updatedUser);
      boom();
      setSuccess("Success! Enjoy the show 🤘");
    } catch (e) {
      setError(e.message || e);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container px-7 md:px-40">
      <div className="conffetti" />
      <div className="py-4">
        <div className="flex flex-col items-end">
          <span className="text-brown-main text-3xl">Register your ticket</span>

          <div className="flex flex-col py-6">
            <div className="flex flex-col md:flex-row">
              <Input
                {...register("code", {
                  required: "Please type in your ticket code",
                })}
                placeholder="Type your ticket code here"
                error={errors.code?.message}
                className="flex-1 mb-4"
                style={{ minWidth: "16rem" }}
                outline
              />

              <Button
                className="md:ml-5 mb-5"
                onClick={handleSubmit(handleRedeem)}
                disabled={loading}
              >
                {loading ? "Validating..." : "Register"}
              </Button>
            </div>

            {error && (
              <div className="text-base text-red-500 py-3">{error}</div>
            )}

            {success && (
              <div className="text-base text-green-400 py-3">{success}</div>
            )}
          </div>
        </div>

        <div>
          <span className="text-brown-main text-4xl">Events</span>
          {events().map((event) => (
            <EventRow key={event.title} {...event} />
          ))}
        </div>

        <div className="text-center text-xl text-brown-main py-5 mt-4">
          Need Help? Visit our{" "}
          <Link href={ROUTES.PUBLIC_ROUTES.support}>
            <a className="underline">Support</a>
          </Link>{" "}
          page
        </div>
      </div>
    </div>
  );
};

export default Events;
