import type { Metadata } from "next";
import type { Property } from "@/types";
import propertiesData from "@/data/properties.json";
import { createClient } from "@/lib/supabase/server";
import FadeUp from "@/components/shared/FadeUp";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = { title: "Properties | Texas Platinum Group" };

export default async function PropertiesPage() {
  const supabase = await createClient();
  const { data: imageRows } = await supabase
    .from("property_images")
    .select("property_id, image_url");

  const imageMap: Record<string, string> = Object.fromEntries(
    (imageRows ?? []).map((r) => [r.property_id, r.image_url])
  );

  const properties = (propertiesData as Property[]).map((p) => ({
    ...p,
    image: imageMap[p.id] ?? p.image,
  }));

  return (
    <>
      <section className="bg-navy text-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest text-gold font-medium mb-4">
              Listings
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold">Properties</h1>
          </FadeUp>
        </div>
      </section>

      <PropertiesClient properties={properties} />
    </>
  );
}
