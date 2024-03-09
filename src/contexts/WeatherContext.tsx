import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Weather } from '../types';
import { getCountryWeatherPost } from '../services/Api';

type WeatherContextType = {
	country1: string;
	setCountry1: React.Dispatch<React.SetStateAction<string>>;
	weatherData1: Weather | null;
	handleSubmit1: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	country2: string;
	setCountry2: React.Dispatch<React.SetStateAction<string>>;
	weatherData2: Weather | null;
	handleSubmit2: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
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

	const value: WeatherContextType = {
		country1,
		setCountry1,
		weatherData1,
		handleSubmit1,
		country2,
		setCountry2,
		weatherData2,
		handleSubmit2,
	};

	return (
		<WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
	);
};
