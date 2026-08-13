import { createClient } from "@/lib/supabase/server";

export type CreateOrderItem = {
  id: string;
  name: string;
  quantity: number;
};

export type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: string;
  items: CreateOrderItem[];
};

export async function createOrder(input: CreateOrderInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "You must be logged in to place an order.",
    };
  }

  if (input.items.length === 0) {
    return {
      data: null,
      error: "Your cart is empty.",
    };
  }

  const productIds = input.items.map((item) => item.id);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, price, stock")
    .in("id", productIds);

  if (productsError) {
    console.error(
      "Error fetching products for order:",
      productsError.message,
    );

    return {
      data: null,
      error: productsError.message,
    };
  }

  if (!products || products.length !== input.items.length) {
    return {
      data: null,
      error: "One or more products in your cart are no longer available.",
    };
  }

  const orderItems = [];

  for (const item of input.items) {
    const product = products.find(
      (product) => product.id === item.id,
    );

    if (!product) {
      return {
        data: null,
        error: `Product "${item.name}" could not be found.`,
      };
    }

    if (product.stock < item.quantity) {
      return {
        data: null,
        error: `Not enough stock available for "${product.name}".`,
      };
    }

    orderItems.push({
      product_id: product.id,
      product_name: product.name,
      unit_price: product.price,
      quantity: item.quantity,
      subtotal: product.price * item.quantity,
    });
  }

  const subtotal = orderItems.reduce(
    (total, item) => total + item.subtotal,
    0,
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      subtotal,
      total: subtotal,
      customer_name: input.customerName,
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone || null,
      shipping_address: input.shippingAddress || null,
    })
    .select()
    .single();

  if (orderError) {
    console.error(
      "Error creating order:",
      orderError.message,
    );

    return {
      data: null,
      error: orderError.message,
    };
  }

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(
      orderItems.map((item) => ({
        ...item,
        order_id: order.id,
      })),
    );

  if (itemsError) {
    console.error(
      "Error creating order items:",
      itemsError.message,
    );

    return {
      data: null,
      error: itemsError.message,
    };
  }

  return {
    data: order,
    error: null,
  };
}