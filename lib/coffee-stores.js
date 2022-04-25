import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfVenuePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 40,
    });

    
    const unsplashResults = photos.response.results;
    
    return unsplashResults.map(result => result.urls['small'])
}

export const fetchCoffeeStores = async (latLong = '59.911491,10.757933', limit = 6) => {

    const photos = await getListOfVenuePhotos();

    const response = await fetch(getUrlForCoffeeStores(latLong, 'coffee', limit), {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
    })
    const data = await response.json();

    return data.results.map((venue, i) => {
        return {
            ...venue,
            imgUrl: photos[i]
        }
    });
  }