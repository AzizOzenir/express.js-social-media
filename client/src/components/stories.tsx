import Image, { StaticImageData } from "next/image";
import React from "react";
import { example, logo } from "../../public/images";

const Stories = () => {
  const stories = [
    {
      imageUrl: "https://example.com/story1.jpg",
      storyImage: example,
    },
    {
      imageUrl: "https://example.com/story1.jpg",
      storyImage: example,
    },
    {
      imageUrl: "https://example.com/story1.jpg",
      storyImage: example,
    },
  ];
  return (
    <div className="flex justify-center items-center w-full bg-black">
      {stories.map((story, index) => (
        <Story key={index} storyUrl={""} storyImage={story.storyImage} />
      ))}
    </div>
  );
};

export default Stories;

interface StoryProps {
  storyUrl: String;
  storyImage: StaticImageData; // in seconds
}

const Story: React.FC<StoryProps> = ({ storyUrl, storyImage }) => {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 animate-rotate">
      <div className=" absolute inset-1 bg-white rounded-full overflow-hidden ">
        <Image src={storyImage} alt="" className=" h-[88px] w-[88px] rounded-full object-cover"/>
      </div>
    </div>
  );
};
