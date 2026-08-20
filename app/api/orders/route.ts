import { NextResponse } from "next/server";

import {
  createOrder,
  type CreateOrderInput,
} from "@/services/orders";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input: CreateOrderInput = {
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      shippingAddress: body.shippingAddress,
      items: Array.isArray(body.items)
        ? body.items.map(
            (item: {
              id: string;
              name: string;
              quantity: number;
            }) => ({
              id: item.id,
              name: item.name,
              quantity: Number(item.quantity),
            }),
          )
        : [],
    };

    if (!input.customerName?.trim()) {
      return NextResponse.json(
        { error: "Customer name is required." },
        { status: 400 },
      );
    }

    if (!input.customerEmail?.trim()) {
      return NextResponse.json(
        { error: "Customer email is required." },
        { status: 400 },
      );
    }

    if (!input.shippingAddress?.trim()) {
      return NextResponse.json(
        { error: "Shipping address is required." },
        { status: 400 },
      );
    }

    if (input.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 },
      );
    }

    const result = await createOrder(input);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        data: result.data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to process your order.",
      },
      { status: 500 },
    );
  }
}