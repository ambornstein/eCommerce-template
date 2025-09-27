import HeroCollection from "@/components/page/HeroCollection";
import ProductDisplay from "@/components/page/ProductDisplay";

export default function Home() {
  return (
    <div className="min-h-[600px] flex flex-col gap-8 py-4 ">
      <HeroCollection />
      <ProductDisplay />
    </div>
  );
}
