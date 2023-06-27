import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavouriteListings();

  if(favorites?.length === 0) {
    <ClientOnly>
      <EmptyState title="No favorites found" subtitle="Looks like you have no favorite lisitngs" />
    </ClientOnly>
  }

  return (
    <ClientOnly>
      <FavouritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavouritesPage;