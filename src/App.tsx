import React, { useState } from 'react';
import { getCountryWeatherPost } from './services/Api';
import WeatherCard from './components/WeatherCard';
import { GradientColor } from './enums';

function App() {
	return (
		<div className="flex w-full h-screen">
			<div className="flex-1 h-full flex justify-center items-center">
				<WeatherCard gradientColor={GradientColor.TealToBlue} />
			</div>
			<div className="flex-1 h-full flex justify-center items-center">
				<WeatherCard gradientColor={GradientColor.YellowToMagenta} />
			</div>
		</div>
	);
}

export default App;
