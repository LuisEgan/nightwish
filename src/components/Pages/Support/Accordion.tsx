import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import { ReactSVG } from "react-svg";
import { BASE_PATH } from "../../../lib/constants";

export interface IAccordionItem {
  title: string | JSX.Element;
  description: string | JSX.Element;
}

interface ISupportAccordion {
  items: IAccordionItem[];
}

interface ITitle {
  title: string | JSX.Element;
  expanded: boolean;
}
const Title = (props: ITitle) => {
  const { title, expanded } = props;

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">{title}</div>

      <div className="px-5">
        <ReactSVG
          src={
            expanded
              ? `${BASE_PATH}/svg/minus.svg`
              : `${BASE_PATH}/svg/plus.svg`
          }
          height={30}
          width={30}
          beforeInjection={(svg) => {
            svg.setAttribute("style", `width: ${30}px; height: ${30}px;`);
          }}
        />
      </div>
    </div>
  );
};

const SupportAccordion = (props: ISupportAccordion) => {
  const { items } = props;

  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      {items.map(({ title, description }) => (
        <AccordionItem key={`${Math.random()}_${description}`}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <AccordionItemState>
                {({ expanded }) => <Title {...{ title, expanded }} />}
              </AccordionItemState>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{description}</AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SupportAccordion;
