"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { createProductAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { uploadProductImage } from "@/services/product-images";
const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Product slug is required"),
  description: z.string().min(5, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  image_url: z.string(),
  category: z.string().min(2, "Category is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

export default function NewProductPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
setLoading(true);

if (!imageFile) {
  setError("Please select a product image.");
  setLoading(false);
  return;
}

const validation = productSchema.safeParse({
      name,
      slug,
      description,
      price: Number(price),
      image_url: "",
      category,
      stock: Number(stock),
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

const supabase = createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  setError("You must be logged in to upload a product image.");
  setLoading(false);
  return;
}

const uploadResult = await uploadProductImage(
  imageFile,
  user.id,
);

if (uploadResult.error || !uploadResult.url) {
  setError(uploadResult.error ?? "Image upload failed.");
  setLoading(false);
  return;
}

const result = await createProductAction({
  name: validation.data.name,
  slug: validation.data.slug,
  description: validation.data.description,
  price: validation.data.price,
  image_url: uploadResult.url,
  category: validation.data.category,
  stock: validation.data.stock,
});

setLoading(false);

if (result.error) {
  setError(result.error);
  return;
}

    router.replace("/marketplace");
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Premium Plumbing Kit"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="premium-plumbing-kit"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe your product"
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
                  placeholder="Plumbing"
                  required
                />
              </div>

              <div className="space-y-2">
  <Label htmlFor="image">Product image</Label>
  <Input
    id="image"
    type="file"
    accept="image/*"
    onChange={(event) =>
      setImageFile(event.target.files?.[0] ?? null)
    }
  />
  <p className="text-sm text-muted-foreground">
    Select a product image. Maximum size: 5MB.
  </p>
</div>

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating product..." : "Create product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}