"use client";
import Header from "@/components/header";
import NavigatorBar from "@/components/navigator_bar";
import PostCreate from "@/components/post_create";
import PostCard from "@/components/postCard";
import Requests from "@/components/requests";
import Stories from "@/components/stories";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Stories />
      <PostCreate />
      <PostCard />
      <NavigatorBar />
      <Requests />
    </main>
  );
};

export default Page;
