import { useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from '../store/store-context';

const UseTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false); 

    const { dispatch, state } = useContext(StoreContext)

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload:  { latLong: `${latitude},${longitude}`}
        })
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    }

    const error = () => {
        setIsFindingLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");
    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true);
        if (!navigator?.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            setIsFindingLocation(false);
        } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }


    return {
        latLong: state.latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation
    }
}

export default UseTrackLocation;