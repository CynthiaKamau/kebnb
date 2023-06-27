'use client';

import React from 'react'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/lisitngs/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface FavouriteClientProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[]
}

const FavouritesClient: React.FC<FavouriteClientProps> = ({ currentUser, listings }) => {
  return (
    <div>
      <Container>
        <Heading title="Favorites" subtitle="List of places you have favorited!" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default FavouritesClient