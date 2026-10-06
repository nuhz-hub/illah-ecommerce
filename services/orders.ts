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

  const items = input.items.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  const { data: orderId, error: orderError } = await supabase.rpc(
    "create_order_atomic",
    {
      p_customer_name: input.customerName,
      p_customer_email: input.customerEmail,
      p_customer_phone: input.customerPhone || null,
      p_shipping_address: input.shippingAddress || null,
      p_items: items,
    },
  );

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

  if (!orderId) {
    return {
      data: null,
      error: "Order was created but no order ID was returned.",
    };
  }

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (fetchError) {
    console.error(
      "Error fetching created order:",
      fetchError.message,
    );

    return {
      data: null,
      error: fetchError.message,
    };
  }

  return {
    data: order,
    error: null,
  };
}

export async function getMyOrders() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "You must be logged in to view your orders.",
    };
  }

  // Get all orders for the logged-in user
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error fetching orders:",
        error.message,
      );

      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: orders ?? [],
      error: null,
    };
  }

  export async function getMyOrder(orderId: string) {
  const supabase = await createClient();

const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "You must be logged in to view your order.",
    };
  }

  // Get one specific order belonging to the logged-in user
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (orderError) {
    console.error(
      "Error fetching order:",
      orderError.message,
    );

    return {
      data: null,
      error: orderError.message,
    };
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (itemsError) {
    console.error(
      "Error fetching order items:",
      itemsError.message,
    );

    return {
      data: null,
      error: itemsError.message,
    };
  }

  return {
    data: {
      order,
      items: items ?? [],
    },
    error: null,
  };
}