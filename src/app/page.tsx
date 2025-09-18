import HeroCollection from "@/components/HeroCollection";
import ProductDisplay from "@/components/ProductDisplay";

export default function Home() {
  return (
    <div className="min-h-[600px] flex flex-col gap-12 mx-24 py-12">
      <HeroCollection />
      <ProductDisplay />
    </div>
  );
}
