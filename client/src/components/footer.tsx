"use client";
import React, { useState } from "react";
import {
  home,
  home_fill,
  liked,
  liked_fill,
  profile,
  profile_fill,
  reels,
  reels_fill,
  search,
  search_fill,
} from "../../public/images";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  const footerItems = [
    [home, home_fill],
    [search, search_fill],
    [reels, reels_fill],
    [liked, liked_fill],
    [profile, profile_fill],
  ];

  const [selected, setselected] = useState(0);
  return (
    <div className="h-screen absolute ml-12 flex items-center ">
      <div className="px-9 py-20 rounded-full  bg-primary flex flex-col gap-20 h-min">
        {footerItems.map((item, i) => (
          <Image
            src={selected == i ? item[1] : item[0]}
            alt=""
            className="w-10 h-10"
            onClick={(e) => setselected(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
