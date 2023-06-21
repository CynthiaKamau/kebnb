"use client";

import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/lisitngs/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeLisitng, SafeUser } from "@/app/types";
import React, { useMemo } from "react";
import ListingHead from "../../components/lisitngs/ListingHead";

interface ListingClientProps {
  reservations?: [];
  listing?: SafeLisitng & { user: SafeUser };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing?.title}
            imageSrc={listing?.imgSrc}
            locationValue={listing?.locationValue}
            id={listing?.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing?.user}
              category={category}
              description={listing?.description}
              roomCount={listing?.roomCount}
              guestCount={listing?.guestCount}
              bathrromCount={listing?.bathroomCount}
              locationValue={listing?.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
