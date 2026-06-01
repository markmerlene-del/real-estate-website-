import type { Metadata } from "next";
import type { Property } from "@/types";
import propertiesData from "@/data/properties.json";
import { createClient } from "@/lib/supabase/server";
import PropertiesUploadClient from "./PropertiesUploadClient";

export const metadata: Metadata = { title: "Property Photos | TPG CRM" };

export default async function CRMPropertiesPage() {
  const supabase = await createClient();
  const { data: imageRows } = await supabase
    .from("property_images")
    .select("property_id, image_url");

  const imageMap: Record<string, string> = Object.fromEntries(
    (imageRows ?? []).map((r) => [r.property_id, r.image_url])
  );

  const properties = (propertiesData as Property[]).map((p) => ({
    id: p.id,
    title: p.title,
    address: p.address,
    currentImage: imageMap[p.id] ?? p.image ?? null,
  }));

  return <PropertiesUploadClient properties={properties} />;
}
