import { ApolloClient, InMemoryCache } from "@apollo/client"
import { useMemo } from "react";

export const useClient = () => {
  const client = useMemo(() => 
    new ApolloClient({
      uri: `$origin/api`,
      cache: new InMemoryCache(),
    }), []);
    return client;
}