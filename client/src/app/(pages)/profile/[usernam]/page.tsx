"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth_context";
import { tokenType } from "@/types/types";
import { BASE_URL } from "@/consts";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { example } from "../../../../../public";
import Link from "next/link";
import Router from "next/router";

const Page = () => {
  const { authToken, logout } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
    bio: "",
    location: "",
    profileImage: "",
    backgroundImage: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    posts: [],
    comments: [],
    likes: [],
    followers: [],
    following: [],
    messagesSent: [],
    messagesReceived: [],
    groups: [],
    groupMemberships: [],
    eventsOrganized: [],
    eventAttendance: [],
    sentRequests: [],
    receivedRequests: [],
    activityLogs: [],
  });

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode<tokenType>(authToken);
        setUsername(decoded.username);
        setLoggedInUser(pathname.split("/").pop() === decoded.username);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [authToken]);

  useEffect(() => {
    if (username) {
      axios
        .get(`${BASE_URL}getUser/${username}`)
        .then((res) => {
          console.log("result", res.data);
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [username]);

  const deleteAccount = () => {
    axios.delete(`${BASE_URL}deleteUser/${username}`);
    logout();
  };

  const [activeTab, setActiveTab] = useState("Posts");

  const sections = [
    { name: "Posts" },
    { name: "Comments" },
    { name: "Groups" },
    { name: "Events Attendance" },
    ...(loggedInUser
      ? [{ name: "Saved" }, { name: "Messages" }, { name: "Settings" }]
      : []),
  ];

  const updateBackgroundImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${BASE_URL}updateUser/${username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      // Handle success
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  };

  const [isHoveredBG, setIsHoveredBG] = useState(false);
  const [isHoveredPP, setIsHoveredPP] = useState(false);
  return (
    <div className="relative">
      <div className="relative w-full h-96">
        <form encType="multipart/form-data">
          <Image
            src={user.backgroundImage !== "" ? user.backgroundImage : example}
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
          <div
            className={classNames(
              "cusor-pointer absolute w-full h-full bg-black  flex items-center justify-center transition-all duration-500 text-white text-xl font-bold",
              {
                "bg-opacity-40 backdrop-blur-sm": isHoveredBG,
                "bg-opacity-0 backdrop-blur-none": !isHoveredBG,
              }
            )}
          >
            <div
              className={classNames("transition-all duration-500", {
                "opacity-100": isHoveredBG,
                "opacity-0": !isHoveredBG,
              })}
            >
              Upload An Image
            </div>
          </div>
          <input
            type="file"
            name="image"
            className="w-full h-full absolute top-0 opacity-0"
            onMouseEnter={(e) => setIsHoveredBG(true)}
            onMouseLeave={(e) => setIsHoveredBG(false)}
            onChange={(e) => {
              updateBackgroundImage(e);
            }}
          />{" "}
        </form>

        <div className="absolute bottom-0 left-10 transform translate-y-1/2">
          <form>
              <Image
                src={user.profileImage == "" ? example : user.profileImage}
                alt="Profile"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary object-cover w-32 h-32 bg-black"
              />
            <div
            className={classNames(
              "cusor-pointer rounded-full absolute top-0 p-4 w-full h-full bg-black  flex items-center justify-center transition-all duration-500 text-white text-xs text-center font-bold",
              {
                "bg-opacity-40 backdrop-blur-sm": isHoveredPP,
                "bg-opacity-0 backdrop-blur-none": !isHoveredPP,
              }
            )}
          >
            <div
              className={classNames("transition-all duration-500", {
                "opacity-100": isHoveredPP,
                "opacity-0": !isHoveredPP,
              })}
            >
              Upload An Image
            </div>
          </div>
          <input
            type="file"
            name="image"
            className="w-full h-full absolute top-0 opacity-0 rounded-full"
            onMouseEnter={(e) => setIsHoveredPP(true)}
            onMouseLeave={(e) => setIsHoveredPP(false)}
            onChange={(e) => {
              updateBackgroundImage(e);
            }}
          />{" "}
          </form>
        </div>

        <div className="absolute bottom-0 left-44 p-4 text-white">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-lg">{user.email}</p>
          <p>{user.bio}</p>
          <p>{user.followers.length} Followers</p>
          <p>{user.following.length} Following</p>
        </div>
      </div>

      <div
        onClick={() => {
          router.back();
        }}
        className="absolute top-4 left-4 border-2 border-primary text-primary font-bold py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
      >
        Back
      </div>

      <div className="mt-20 px-4">
        <div className="flex space-x-4">
          {sections.map((tab) => (
            <button
              key={tab.name}
              className={`py-2 px-4 rounded-lg ${
                activeTab === tab.name
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-primary hover:text-white transition-colors duration-300"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "Posts" && (
                <Posts
                  posts={user.posts}
                  loggedInUser={loggedInUser}
                  username={username}
                />
              )}
              {activeTab === "Comments" && (
                <Comments
                  comments={user.comments}
                  loggedInUser={loggedInUser}
                  username={username}
                />
              )}
              {activeTab === "Groups" && (
                <Groups
                  groups={user.groups}
                  loggedInUser={loggedInUser}
                  username={username}
                />
              )}
              {activeTab === "Events Attendance" && (
                <EventsAttendance
                  events={user.eventAttendance}
                  loggedInUser={loggedInUser}
                  username={username}
                />
              )}
              {activeTab === "Saved" && loggedInUser && <div>Saved Items</div>}
              {/* <Saved savedItems={user.savedItems} /> */}
              {activeTab === "Messages" && loggedInUser && (
                <Messages messages={user.messagesReceived} />
              )}
              {activeTab === "Settings" && loggedInUser && (
                <Settings user={user} deleteAccount={deleteAccount} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Page;

/* POSTS */

import {
  Post,
  Comment,
  ActivityLog,
  EventAttendee,
  Follow,
  FriendRequest,
  Event,
  Group,
  GroupMember,
  Like,
  Message,
  PostTag,
  Tag,
  User,
} from "@/types/types";
import classNames from "classnames";

interface PostsProps {
  posts: Post[];
  loggedInUser: boolean;
  username: string;
}
const Posts: React.FC<PostsProps> = ({ posts, loggedInUser, username }) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.content}</h3>
            <p>{post.imageUrl}</p>
          </div>
        ))
      ) : (
        <p>{loggedInUser ? "You have no posts" : `${username} has no posts`}</p>
      )}
    </div>
  );
};

interface CommentsProps {
  comments: Comment[];
  loggedInUser: boolean;
  username: string;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  loggedInUser,
  username,
}) => {
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>
          {loggedInUser
            ? "You have no comments"
            : `${username} has no comments`}
        </p>
      )}
    </div>
  );
};

interface GroupsProps {
  groups: Group[];
  loggedInUser: boolean;
  username: string;
}

const Groups: React.FC<GroupsProps> = ({ groups, loggedInUser, username }) => {
  return (
    <div>
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.id} className="group">
            <h3>{group.name}</h3>
            <p>{group.description}</p>
          </div>
        ))
      ) : (
        <p>
          {loggedInUser
            ? "You are not part of any groups"
            : `${username} is not part of any groups`}
        </p>
      )}
    </div>
  );
};

interface EventsAttendanceProps {
  events: EventAttendee[];
  loggedInUser: boolean;
  username: string;
}

const EventsAttendance: React.FC<EventsAttendanceProps> = ({
  events,
  loggedInUser,
  username,
}) => {
  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="event">
            <h3>{event.event.name}</h3>
            <p>{event.event.description}</p>
          </div>
        ))
      ) : (
        <p>
          {loggedInUser
            ? "You have not attended any events"
            : `${username} has not attended any events`}
        </p>
      )}
    </div>
  );
};

interface SavedItem {
  id: number;
  title: string;
  description: string;
}

interface SavedProps {
  savedItems: SavedItem[];
}

const Saved: React.FC<SavedProps> = ({ savedItems }) => {
  return (
    <div>
      {savedItems.length > 0 ? (
        savedItems.map((item) => (
          <div key={item.id} className="saved-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <p>You have no saved items</p>
      )}
    </div>
  );
};

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <p>You have no messages</p>
      )}
    </div>
  );
};

interface SettingsProps {
  user: User;
  deleteAccount: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, deleteAccount }) => {
  return (
    <div>
      <h2>Settings</h2>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
};
