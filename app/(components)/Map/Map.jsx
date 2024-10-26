import { GoogleMap, LoadScript } from '@react-google-maps/api';

const GoogleMapComponent = () => {
	return (
		<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} >
			<GoogleMap mapContainerStyle={{ width: '500px', height: '500px' }} center={{ lat: 50.4492, lng: 30.4695 }} zoom={19} >
			</GoogleMap>
		</LoadScript>
	);
};

export default GoogleMapComponent;
