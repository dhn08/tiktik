import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";
const Footer = () => {
  const List = ({ items, mt }) => (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {items.map((item, index) => (
        <p
          key={index}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt={true} />
      <List items={footerList3} mt={true} />
      <p>DHN-TIKTIK</p>
    </div>
  );
};

export default Footer;
