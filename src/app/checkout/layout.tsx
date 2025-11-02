import CheckoutTotal from "@/components/checkout/CheckoutTotal";

export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="min-h-screen w-[55%]">
        <CheckoutTotal />
        <div className="w-md h-full lg:ml-auto flex flex-col gap-12 p-8">
            {children}
        </div>
    </div>
}