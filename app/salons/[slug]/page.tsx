import { notFound } from "next/navigation";
import SalonDetailView from "@/components/salon-detail-view";
import { salons } from "@/data/salons";

export function generateStaticParams() {
  return salons.map((salon) => ({
    slug: salon.slug
  }));
}

export default async function SalonDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const salon = salons.find((entry) => entry.slug === slug);

  if (!salon) {
    notFound();
  }

  return <SalonDetailView salon={salon} />;
}
