import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "product-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadProductImage(
  file: File,
  userId: string,
) {
  if (!file.type.startsWith("image/")) {
    return {
      url: null,
      error: "Please select an image file.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      url: null,
      error: "Image must be smaller than 5MB.",
    };
  }

  const supabase = createClient();

  const fileExtension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const filePath = `${userId}/${crypto.randomUUID()}.${fileExtension}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Error uploading product image:", error.message);

    return {
      url: null,
      error: error.message,
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    error: null,
  };
}
