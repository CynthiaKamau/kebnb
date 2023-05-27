import { PrismaClient, CartItem } from "@prisma/client";
import Stripe from "stripe";
import { Product } from "./products";

export const currencyCode = "USD";

export async function findOrCreateCart(prisma: PrismaClient, id: string) {
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
}

export function validateCartItems(
  inventory: Product[],
  cartItems: CartItem[],
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const checkOutItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for(const item of cartItems) {
    const product = inventory.find(({ id }) => id === item.id);
    if(!product) {
      throw new Error(`Item with id ${item.id} is not in the inventory`);
    }

    checkOutItems.push({
      quantity: item.quantity,
      price_data: {
        currency: currencyCode,
        unit_amount: product.price,
        product_data: {
          name: item.name,
          description: item?.description || undefined,
          images: item.image ? [item.image] : []
        }
      }
    })
  }
  return checkOutItems;
}
