import Image from "next/image";
import React from "react";

type Props = {};

const NavigatorBar = (props: Props) => {
  const navItems = [
    {
      name: "Home",
    },
    {
      name: "Explore",
    },
    {
      name: "Reels",
    },
    {
      name: "Notifications",
    },
    {
      name: "Bookmarks",
    },
    {
      name: "Settings",
    },
  ];
  return (
    <div className="absolute top-24 left-5 flex flex-col gap-5">
      <div className="flex items-center gap-2 bg-white p-5 rounded-md shadow-primary ">
        <Image src="" alt="" className="w-8 h-8 rounded-full bg-gray-800" />
        <div className="flex flex-col">
          {" "}
          <div>Aziz Özenir</div>
          <div className="text-xs text-gray-600 font-semibold ">@zyzoznr</div>
        </div>
      </div>
      <div className="flex flex-col bg-white p-5 shadow-primary rounded-md">
        {navItems.map((e, i) => {
          return (
            <div
              className="w-full py-3 font-semibold hover:text-primary"
              key={i + "navitem"}
            >
              {e.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigatorBar;
