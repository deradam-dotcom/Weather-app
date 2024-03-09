import { Weather } from '../types';

const API_BASE_URL = 'https://api.openweathermap.org/';
const API_KEY: string | undefined = process.env.REACT_APP_WEATHER_API_KEY;

export const getCountryWeatherPost = async (
	country: string
): Promise<Weather> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}data/2.5/weather?q=${country}&appid=${API_KEY}`
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		} else {
			const data: Weather = await response.json();
			return data;
		}
	} catch (e) {
		console.error('Error fetching weather data:', e);
		throw e;
	}
};
