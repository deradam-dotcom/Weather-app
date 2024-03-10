import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Weather } from '../types';
import { getCountryWeatherPost } from '../services/Api';

const CELSIUS_CHANGE_RATE = 273.15;
const MS_KMH_RATE = 3.6;
const BASE_WEATHER_ICONS_URL = 'https://openweathermap.org/img/wn/';

type WeatherContextType = {
	country1: string;
	setCountry1: React.Dispatch<React.SetStateAction<string>>;
	weatherData1: Weather | null;
	handleSubmit1: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	country2: string;
	setCountry2: React.Dispatch<React.SetStateAction<string>>;
	weatherData2: Weather | null;
	handleSubmit2: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	kelvinToCelsius: (kelvin: number) => number;
	msToKmh: (windSpeedM: number) => number;
	getIconFileName: (icon: string) => string;
	capitalizeString: (str: string) => string;
	getBackgroundImageForWeather: (condition: string) => string;
};

type WeatherProviderProps = {
	children: ReactNode;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherContext = () => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error('useWeatherContext must be used within a WeatherProvider');
	}
	return context;
};

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
	children,
}) => {
	const [country1, setCountry1] = useState('');
	const [weatherData1, setWeatherData1] = useState<Weather | null>(null);

	const [country2, setCountry2] = useState('');
	const [weatherData2, setWeatherData2] = useState<Weather | null>(null);

	const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = await getCountryWeatherPost(country1);
			setWeatherData1(data);
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	};

	const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = await getCountryWeatherPost(country2);
			setWeatherData2(data);
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	};

	function kelvinToCelsius(kelvin: number): number {
		return Number((kelvin - CELSIUS_CHANGE_RATE).toFixed(1));
	}

	function msToKmh(windSpeedMs: number): number {
		const windSpeedKmh = windSpeedMs * MS_KMH_RATE;

		return Number(windSpeedKmh.toFixed(1));
	}

	function capitalizeString(str: string): string {
		if (!str) return '';
		const words = str.split(' ');
		if (words.length === 1) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return (
				words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words[1]
			);
		}
	}

	function getIconFileName(icon: string): string {
		switch (icon) {
			case '01d':
			case '01n':
			case '02d':
			case '02n':
			case '03d':
			case '03n':
			case '04d':
			case '04n':
			case '09d':
			case '09n':
			case '10d':
			case '10n':
			case '11d':
			case '11n':
			case '13d':
			case '13n':
			case '50d':
			case '50n':
				return `${BASE_WEATHER_ICONS_URL}${icon}@2x.png`;
			default:
				return icon;
		}
	}
	function getBackgroundImageForWeather(condition: string): string {
		let weatherCondition: string;

		switch (condition) {
			case 'Rain':
				weatherCondition = 'rain.png';
				break;
			case 'Mist':
				weatherCondition = 'mist.png';
				break;
			case 'Thunderstorm':
				weatherCondition = 'thunderstorm.png';
				break;
			case 'Snow':
				weatherCondition = 'snow.png';
				break;
			case 'Clouds':
				weatherCondition = 'clouds.png';
				break;
			case 'Clear':
				weatherCondition = 'clear_sky.png';
				break;
			case 'Atmosphere':
				weatherCondition = 'atmosphere.png';
				break;
			default:
				return 'clear.png';
		}
		return weatherCondition;
	}

	const value: WeatherContextType = {
		country1,
		setCountry1,
		weatherData1,
		handleSubmit1,
		country2,
		setCountry2,
		weatherData2,
		handleSubmit2,
		kelvinToCelsius,
		msToKmh,
		getIconFileName,
		capitalizeString,
		getBackgroundImageForWeather,
	};

	return (
		<WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
	);
};
