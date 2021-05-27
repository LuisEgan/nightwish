import React from "react";
import dynamic from "next/dynamic";
import FAQItems from "../components/Pages/Support/FAQItems";
// import SupportContactForm from "../components/Pages/Support/ContactForm";

const SupportAccordion = dynamic(
  () => import("../components/Pages/Support/Accordion"),
  { ssr: false },
);

const Support = () => (
  <div className="page-container px-7 md:px-36">
    <div className="flex justify-center pt-5 text-brown-main text-6xl w-full">
      FAQ
    </div>

    <div className="py-10">
      <SupportAccordion items={FAQItems} />
    </div>

    <div className="py-10 mb-6 md:mb-10">
      <h2 className="text-6xl mb-10 text-brown-main">Support</h2>
      <div className="md:flex">
        <div className="flex-1 pr-0 md:pr-8 lg:pr-24">
          <p className="text-brown-main text-xl">
            If you couldn´t find help from the FAQ, please contact our customer
            service and technical support here. Questions will be answered as
            soon as possible.
          </p>
        </div>
        <div className="py-4 mt-14 md:mt-0 text-center md:text-right">
          <a
            href="mailto:support@burst.fi"
            className="px-16 lg:px-20 py-4 rounded-full bg-brown-main cursor-pointer"
          >
            Email Support Now
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Support;
