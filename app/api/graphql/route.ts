import { createYoga, createSchema } from "graphql-yoga";

const yoga = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
      }
    `,
    resolvers: {
      Query: {
        greetings: () =>
          "This is the `greetings` field of the root `Query` type",
      },
    },
  })
});

export async function POST(request: Request) {
  const result = await yoga.fetch(request.url, {
    method: 'POST',
    headers: request.headers,
    body: await request.text(),
  });

  return new Response(result.body, {
    status: result.status,
    headers: result.headers,
  });
}

// export { yoga as GET, yoga as POST };
