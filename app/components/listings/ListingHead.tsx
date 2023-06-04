"use client";
import React from "react";

import { safeUser } from "@/app/types";
import useCountries from "../hooks/useCountries";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  id: string;
  imageSrc: string;
  currentUser: safeUser | null | undefined;
}

const ListingHead: React.FC<ListingHeadProps> = (props) => {
  const { title, locationValue, imageSrc, currentUser, id } = props;

  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region} , ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="w-full object-cover"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
