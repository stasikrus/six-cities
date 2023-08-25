export type OffersData = {
  id: number,
  href: string,
  img: string,
  price: number,
  name: string,
  type: string,
  premium: boolean,
  location: OffersDataLocation,
  city: string
}

export type OffersDataLocation = {
  latitude: number,
  longitude: number
}
