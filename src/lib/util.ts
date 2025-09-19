export function isMobile() {
  return window.matchMedia('(width <= 450px)').matches
}

export function getBaseUrl() {
  if (process.env.NODE_ENV == "development")
    return "http://localhost:3000"
  else if (process.env.NODE_ENV == "production")
    return "http://localhost:3000" //Prod URL here
}