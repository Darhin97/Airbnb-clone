import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { safeUser } from "@/app/types";
// import axios from "axios";
import useLoginModal from "./useLoginModal";
import { toast } from "react-hot-toast";

const axios = require("axios").default;

interface IUseFavorite {
  listingId: string;
  currentUser: safeUser | null | undefined;
}

const useFavorite = (props: IUseFavorite) => {
  const { listingId, currentUser } = props;

  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
