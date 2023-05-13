import { createYoga, createSchema } from "graphql-yoga";

const { handleRequest: yoga } = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
        name: String
      }
    `,
    resolvers: {
      Query: {
        greetings: () =>
          "This is the `greetings` field of the root `Query` type",
        name: ()=>{
          return "Bahman World"
        }
      },
    },
  }),
  fetchAPI: {
    Request: Request,
    Response: Response
  }
});

export { yoga as GET, yoga as POST };
