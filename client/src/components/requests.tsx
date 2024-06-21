import Image from "next/image";
import React from "react";

type Props = {};

const Requests = (props: Props) => {
  return (
    <div className="absolute right-5 top-24 pr-10  gap-5 flex flex-col">
      <div>Request</div>
      <div className="flex items-center gap-2  bg-white p-5 rounded-md shadow-primary ">
        <div className="flex gap-2">
          <Image src="" alt="" className="w-8 h-8 rounded-full bg-gray-800" />
          <div className="flex flex-col ">
            <div className="text-sm font-semibold ">Aziz Özenir</div>
            <div className="text-xs text-gray-600 font-semibold ">@zyzoznr</div>
          </div>
        </div>
        <div className="flex gap-2">

        </div>
      </div>
    </div>
  );
};

export default Requests;
