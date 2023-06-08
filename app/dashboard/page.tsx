import { getCartId } from "@/lib/cart.client";
import { useClient } from "@/lib/client";
import { useGetCartQuery } from "@/types";

export default async function Cart() {
  //const cartId = await getCartId();
  const client = useClient();
  const { data } = useGetCartQuery({ variables: { id: 'graphqlrocks' }, client});

  return (
    <div className="min-h-screen flex flex-col">
      <main className="p-8 min-h-screen">
        <div className="mx-auto max-w-xl space-y-8">
          <h1 className="text-4xl">Cart</h1>
          <div>Items: {data?.cart?.totalItems}</div>
          <div className="border-t pt-4 flex justify-between">
            <div>Subtotal</div>
            <div>{data?.cart?.subtotal?.formatted}</div>
          </div>
        </div>
      </main>
    </div>
  )
}


