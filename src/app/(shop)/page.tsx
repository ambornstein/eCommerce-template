import HeroCollection from "@/components/page/HeroCollection";
import ProductDisplay from "@/components/page/ProductDisplay";
import { getBaseUrl } from "@/lib/util";

export default async function Home() {
  const data = await fetch(`${getBaseUrl()}/api/product`)
  const products = await data.json()
  
  return <>
    <HeroCollection />
    <ProductDisplay products={products} />
  </>
}
