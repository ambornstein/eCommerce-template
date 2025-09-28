import Footer from "@/components/page/Footer";
import Header from "@/components/page/Header";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <Header />
        <div className="m-auto min-h-[600px] max-w-[90%] flex flex-col gap-8 py-4">
            {children}
        </div>
        <Footer />
    </div>
}