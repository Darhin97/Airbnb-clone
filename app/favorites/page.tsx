import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import FavoritesClient from "./FavoritesClient";

const FovoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favListings = await getFavoritesListings();

  if (favListings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorites listings"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient currentUser={currentUser} listings={favListings} />
    </ClientOnly>
  );
};

export default FovoritesPage;
