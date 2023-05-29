import { createYoga, createSchema } from "graphql-yoga";
import { join } from "path";
import { readFileSync } from "fs";
import { prisma } from "../../../lib/prisma";
import type { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import currencyFormatter from "currency-formatter";
import { currencyCode, findOrCreateCart, validateCartItems } from "@/lib/cart";
import { GraphQLError } from "graphql";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export type GraphQLContext = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma,
  };
}

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
          return findOrCreateCart(prisma, id);
        },
        user: async (_, { id }) => {
          const u = await prisma.user.findUnique({
            where: {
              id,
            },
          });
          return u;
        },
        users: async () => {
          const users = await prisma.user.findMany();
          return users;
        },
        roles: async () => {
          const r = await prisma.role.findMany();
          return r;
        },
        role: async (_, { id }) => {
          const r = await prisma.role.findUnique({
            where: {
              id,
            },
          });
          return r;
        },
      },
      Cart: {
        items: async ({ id }, _) => {
          const items = await prisma.cart
            .findUnique({
              where: {
                id,
              },
            })
            .items();
          return items;
        },
        totalItems: async ({ id }, _) => {
          const items = await prisma.cart
            .findUnique({
              where: {
                id,
              },
            })
            .items();
          return items?.reduce((total, item) => total + item.quantity || 1, 0);
        },
        subTotal: async ({ id }, _) => {
          const items = await prisma.cart
            .findUnique({
              where: {
                id,
              },
            })
            .items();
          const amount =
            items?.reduce(
              (total, item) => total + item.quantity * item.price || 0,
              0
            ) ?? 0;
          return {
            formatted: currencyFormatter.format(amount / 100, {
              code: currencyCode,
            }),
            amount,
          };
        },
      },
      CartItem: {
        unitTotal: (item) => {
          const amount = item.price;
          return {
            amount,
            formatted: currencyFormatter.format(amount / 100, {
              code: currencyCode,
            }),
          };
        },
        lineTotal: (item) => {
          const amount = item.quantity * item.price;
          return {
            amount,
            formatted: currencyFormatter.format(amount / 100, {
              code: currencyCode,
            }),
          };
        },
      },
      Mutation: {
        // cart actions
        addItem: async (_, { input }) => {
          const cart = await findOrCreateCart(prisma, input.cartId);

          await prisma.cartItem.upsert({
            create: {
              cartId: cart.id,
              id: input.id,
              name: input.name,
              description: input.description,
              image: input.image,
              price: input.price,
              quantity: input.quantity || 1,
            },
            update: {
              quantity: {
                increment: input.quantity || 1,
              },
            },
            where: {
              id_cartId: {
                id: input.id,
                cartId: cart.id,
              },
            },
          });
          return cart;
        },
        removeItem: async (_, { input }) => {
          const { cartId } = await prisma.cartItem.delete({
            where: {
              id_cartId: {
                id: input.id,
                cartId: input.cartId,
              },
            },
            select: { cartId: true },
          });
          return findOrCreateCart(prisma, cartId);
        },
        increaseCartItem: async (_, { input }) => {
          const { cartId } = await prisma.cartItem.update({
            data: {
              quantity: {
                increment: 1,
              },
            },
            where: {
              id_cartId: {
                id: input.id,
                cartId: input.cartId,
              },
            },
            select: {
              cartId: true,
            },
          });
          return findOrCreateCart(prisma, cartId);
        },
        decreaseCartItem: async (_, { input }) => {
          const { cartId, quantity } = await prisma.cartItem.update({
            data: {
              quantity: {
                decrement: 1,
              },
            },
            where: {
              id_cartId: {
                id: input.id,
                cartId: input.cartId,
              },
            },
            select: {
              cartId: true,
              quantity: true,
            },
          });
          if (quantity < 0) {
            await prisma.cartItem.delete({
              where: {
                id_cartId: {
                  id: input.id,
                  cartId: input.cartId,
                },
              },
            });
          }
          return findOrCreateCart(prisma, cartId);
        },
        createCheckoutSession: async (_, { input }) => {
          const { cartId } = input;
          const cart = await prisma.cart.findUnique({
            where: {
              id: cartId,
            },
          });

          if (!cart) {
            throw new GraphQLError("Cart does not exisit");
          }

          const cartItems = await prisma.cart
            .findUnique({
              where: {
                id: cartId,
              },
            })
            .items();

          if (!cartItems || cartItems?.length === 0) {
            throw new GraphQLError("Cart is empty");
          }

          const line_items = validateCartItems(products, cartItems);

          const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            metadata: {
              cartId: cart.id,
            },
            success_url:
              "http://localhost:3000/thankyou?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cart?cancelled=true",
          });

          return {
            id: session.id,
            url: session?.url,
          };
        },
        //user actions
        addUser: async (_, { input }) => {
          const newUser = await prisma.user.create({ data: input });
          return newUser;
        },
        // role actions
        addRole: async (_, { input }) => {
          const role = await prisma.role.create({ data: input });
          return role;
        },
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
