"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { src } = props;
  return (
    <Image
      alt=""
      width={30}
      height={30}
      src={src || "/images/placeholder.jpg"}
      className="rounded-full"
    />
  );
};

export default Avatar;
