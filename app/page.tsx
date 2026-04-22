import SalonDirectory from "@/components/salon-directory";
import { featuredTags, salons } from "@/data/salons";

export default function HomePage() {
  return (
    <main>
      <SalonDirectory featuredTags={featuredTags} salons={salons} />
    </main>
  );
}
