import Footer from "@/components/page/Footer";
import Header from "@/components/page/Header";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <Header />
        {children}
        <Footer />
    </div>
}