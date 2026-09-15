import { supabaseAdmin } from "./supabaseAdmin";

// Ganti kalau nama bucket kamu berbeda.
const BUCKET = "pandanara-bucket";

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, file, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal upload gambar: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}