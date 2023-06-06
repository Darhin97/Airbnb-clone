"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, safeUser } from "../types";
import { toast } from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

const axios = require("axios").default;

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser?: safeUser | null;
}

const ReservationsClient: React.FC<ReservationClientProps> = (props) => {
  const { reservations, currentUser } = props;
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your property" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            reservation={reservation}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={reservation.id === deletingId}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
