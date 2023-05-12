"use client";
import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <Image
      alt=""
      width={30}
      height={30}
      src={"/images/placeholder.jpg"}
      className="rounded-full"
    />
  );
};

export default Avatar;
