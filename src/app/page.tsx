import HeroCollection from "@/components/HeroCollection";
import ProductPanel from "@/components/ProductPanel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[600px] flex flex-col gap-12 mx-24 py-12">
      <HeroCollection />
      <div className="grid grid-cols-4 gap-8">
        <ProductPanel />
        <ProductPanel />
        <ProductPanel />
        <ProductPanel />
      </div>
    </div>
  );
}
