import { createYoga, createSchema } from "graphql-yoga";
import { join } from "path";
import { readFileSync } from "fs";
import { prisma } from "../../../lib/prisma";
import type { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import currencyFormatter from 'currency-formatter';

export type GraphQLContext = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
  };
}

const currencyCode = 'USD';

const typeDefs = readFileSync(join(process.cwd(), "schema.graphql"), {
  encoding: "utf-8",
});

const { handleRequest: yoga } = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: {
      Query: {
        cart: async (_, { id }) => {
          let cart = await prisma.cart.findUnique({
            where: {
              id,
            },
          });

          if (!cart) {
            cart = await prisma.cart.create({
              data: {
                id,
              },
            });
          }

          return cart;
        },
      },
      Cart: {
        items: async ({ id }, _) => {
          const items = await prisma.cart
          .findUnique({
            where: {
              id,
            }
          }).items();
          return items;
        },
        totalItems: async ({ id }, _) => {
          const items = await prisma.cart.findUnique({
            where: {
              id
            }
          }).items();
          return items?.reduce((total, item) => total + item.quantity || 1, 0);
        },
        subTotal: async ({ id }, _) => {
          const items = await prisma.cart.findUnique({
            where: {
              id
            }
          }).items();
          const amount = items?.reduce((total, item) => total + (item.quantity  * item.price) || 0, 0) ?? 0
          return {
            formatted: currencyFormatter.format(amount / 100, {
              code: currencyCode
            }),
            amount: amount
          };
        }
      },
    },
  }),
  context: createContext(),
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
});

export { yoga as GET, yoga as POST };
