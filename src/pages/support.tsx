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

    {/* <div className="py-10">
      <SupportContactForm />
    </div> */}
  </div>
);

export default Support;
