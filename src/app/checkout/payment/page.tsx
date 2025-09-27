'use client'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentPage() {
    const initialOptions = {
        "clientId": "AebVKvwiysJoWeETrQGCIqQvCw3P89xvF4PRg2IPhsZYTfKHTUrE-oYcl8lVoKrfNo1MAHeM6wu3Ttb9",
        "enable-funding": "venmo",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-details",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

    return <div>
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{
                    shape: "rect",
                    layout: "vertical",
                    color: "gold",
                    label: "paypal",
                }} />
        </PayPalScriptProvider>
    </div>
}