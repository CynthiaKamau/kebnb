import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null | undefined;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: String;
};

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing" > & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
}
