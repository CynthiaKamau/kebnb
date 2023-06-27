import { Inter } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { ILisitngsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/lisitngs/ListingCard";

interface HomeProps {
  searchParams: ILisitngsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();


  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing) => (
            <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home;