"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";
import { uploadProductImage } from "@/services/product-images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Product slug is required"),
  description: z.string().min(5, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  image_url: z.string(),
  category: z.string().min(2, "Category is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

type EditProductFormProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    image_url: string | null;
    category: string | null;
    stock: number;
  };
};

export function EditProductForm({
  product,
}: EditProductFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [description, setDescription] = useState(
    product.description ?? "",
  );
  const [price, setPrice] = useState(String(product.price));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState(product.category ?? "");
  const [stock, setStock] = useState(String(product.stock));

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to edit a product.");
        return;
      }

      const validation = productSchema.safeParse({
        name,
        slug,
        description,
        price: Number(price),
        image_url: product.image_url ?? "",
        category,
        stock: Number(stock),
      });

      if (!validation.success) {
        setError(validation.error.issues[0].message);
        return;
      }

      let imageUrl = product.image_url ?? "";
      if (imageFile) {
        const uploadResult = await uploadProductImage(imageFile, user.id);
        if (uploadResult.error || !uploadResult.url) {
          setError(uploadResult.error ?? "Image upload failed.");
          return;
        }
        imageUrl = uploadResult.url;
      }

      const { error: updateError } = await supabase
        .from("products")
        .update({
          name: validation.data.name,
          slug: validation.data.slug,
          description: validation.data.description,
          price: validation.data.price,
          image_url: imageUrl || null,
          category: validation.data.category,
          stock: validation.data.stock,
        })
        .eq("id", product.id)
        .eq("seller_id", user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      router.push("/dashboard/products");
      router.refresh();
    } catch {
      setError("Unable to save product changes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Listing</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              className="min-h-28 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>
<div className="space-y-2">
  <Label htmlFor="image">Replace product image</Label>

  <Input
    id="image"
    type="file"
    accept="image/*"
    onChange={(event) =>
      setImageFile(event.target.files?.[0] ?? null)
    }
  />

  {product.image_url && (
    <p className="text-sm text-muted-foreground">
      Current product image is already uploaded.
    </p>
  )}

  <p className="text-sm text-muted-foreground">
    Leave empty to keep the current image. Maximum size: 5MB.
  </p>
</div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving changes..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}