const getUrlForCoffeeStores = (near, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&near=${near}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
    const response = await fetch(getUrlForCoffeeStores('oslo', 'coffee', 6), {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
    })

    const data = await response.json();

    return data.results;
  }