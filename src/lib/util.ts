import { ItemOrderData } from "./types"

export function isMobile() {
  return window.matchMedia('(width <= 450px)').matches
}

export function getBaseUrl() {
  if (process.env.NODE_ENV == "development")
    return "http://localhost:3000"
  else if (process.env.NODE_ENV == "production")
    return "http://localhost:3000" //Prod URL here
}

export function formatTotal(item: ItemOrderData) {
  return formatPrice(item.product.price * item.quantity)
}

export function formatPrice(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const clamp = (min: number, max: number, val: number) => {
    return Math.max(Math.min(max, val), min)
}