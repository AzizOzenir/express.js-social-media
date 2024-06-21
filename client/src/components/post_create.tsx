"use client";
import Image from "next/image";
import React from "react";

type Props = {};

const PostCreate = (props: Props) => {
  const handleFocus = () => {
    const expandingMenu = document.getElementById("expandingMenu");
    const main = document.getElementById("main");
    const postcreateitem = document.querySelectorAll(".post-create-item");

    expandingMenu?.classList.remove("h-0");
    expandingMenu?.classList.add("h-20");
    main?.classList.remove("rounded-full");
    main?.classList.add("rounded-3xl");

    setTimeout(() => {
      postcreateitem.forEach((e, i) => {
        e.classList.remove("hidden");
        e.classList.remove("opacity-0");
        e.classList.remove("opacity-100");
      });
    }, 500);
  };

  return (
    <div
      className="flex flex-col p-3 bg-white rounded-full shadow-primary transition-all duration-500"
      id="main"
    >
      <div className="flex ">
        {" "}
        <div className="flex items-center ">
          <Image src="" alt="" className="w-9 h-9 rounded-full" />
          <input
            type="text"
            placeholder="What's on your mind, Aziz Özenir?"
            className="ml-2 mr-14 text-gray-500 border-none focus:outline-none flex-grow"
            onFocus={handleFocus}
          />
        </div>
        <div className="bg-primary text-white rounded-full py-2 px-3">POST</div>
      </div>
      <div
        className=" justify-around mt-0  h-0 transition-all duration-500"
        id="expandingMenu"
      >
        <div className="post-create-item flex-col items-center hidden opacity-0 transition-all duration-500">
          <span className="icon">📷</span>
          <span className="text-sm text-gray-500">Photo</span>
        </div>
        <div className="post-create-item flex-col items-center hidden opacity-0 transition-all duration-500">
          <span className="icon">📹</span>
          <span className="text-sm text-gray-500">Video</span>
        </div>
        <div className="post-create-item flex-col items-center hidden opacity-0 transition-all duration-500">
          <span className="icon">😊</span>
          <span className="text-sm text-gray-500">Feeling/Activity</span>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
