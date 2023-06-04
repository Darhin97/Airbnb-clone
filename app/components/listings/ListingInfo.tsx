"use client";
import React from "react";

import { safeUser } from "@/app/types";
import { IconType } from "react-icons";
import dynamic from "next/dynamic";

import useCountries from "../hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: safeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  category: { icon: IconType; label: string; description: string } | undefined;

  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = (props) => {
  const {
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    category,
    locationValue,
  } = props;

  const { getByValue } = useCountries();

  const coordinate = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfo;