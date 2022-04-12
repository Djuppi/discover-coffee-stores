import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (near, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&near=${near}&limit=${limit}`
}

const getListOfVenuePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 10,
    });

    
    const unsplashResults = photos.response.results;
    
    return unsplashResults.map(result => result.urls['small'])
}

export const fetchCoffeeStores = async () => {

    const photos = await getListOfVenuePhotos();

    const response = await fetch(getUrlForCoffeeStores('oslo', 'coffee', 6), {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
    })
console.log(response)
    const data = await response.json();

    return data.results.map((venue, i) => {
        return {
            ...venue,
            imgUrl: photos[i]
        }
    });
  }