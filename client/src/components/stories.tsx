import Image from 'next/image';
import React from 'react';

const Stories: React.FC = () => {
    const userData = [
        {
            name: "John Doe",
            profilePic: "",
            storyImage: ""
        },
        {
            name: "Jane Smith",
            profilePic: "",
            storyImage: ""
        },
        {
            name: "John Doe",
            profilePic: "",
            storyImage: ""
        },
        {
            name: "Jane Smith",
            profilePic: "",
            storyImage: ""
        },

        {
            name: "John Doe",
            profilePic: "",
            storyImage: ""
        },
     
   
    ];

    return (
        <div className="flex overflow-x-auto w-[500px] whitespace-nowrap relative">
            {userData.map((user, index) => {
                return (
                    <div key={index} className="story relative w-1/5 h-24 cursor-pointer rounded-xl overflow-hidden mx-2">
                        <div className="overlay absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-indigo-900 opacity-60"></div>
                        <Image src={user.storyImage} alt="" className="w-full h-full object-cover absolute" />
                        <Image src={user.profilePic} alt="" className="w-6 h-6 object-cover absolute top-1 left-1 rounded-full ring-2 ring-white" />
                        <div className="name text-xs text-white absolute bottom-1 left-1 z-10">{user.name}</div>
                    </div>
                );
            })}
        </div>
        
    );
};

export default Stories;