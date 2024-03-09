import React, { useState } from 'react';
import { GradientColor } from '../../enums';
import { Weather } from '../../types';
import { useWeatherContext } from '../../contexts/WeatherContext';
import SearchIcon from '../../assets/search.png';
import HumidityIcon from '../../assets/humidity.png';
import WindIcon from '../../assets/wind.png';

type WeatherCardProps = {
	gradientColor: GradientColor;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	setCountry: React.Dispatch<React.SetStateAction<string>>;
	weatherData: Weather | null;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
	gradientColor,
	onSubmit,
	setCountry,
	weatherData,
}) => {
	function kelvinToCelsius(kelvin: number): number {
		return Number((kelvin - 273.15).toFixed(1));
	}

	return (
		<div
			className={`flex flex-col w-auto h-[829px] rounded-[12px] bg-gradient-to-b ${gradientColor}`}
		>
			<form
				onSubmit={onSubmit}
				className="flex justify-center gap-[14px] pt-[60px] px-[80px]"
			>
				<input
					type="text"
					placeholder="Search"
					onChange={(e) => setCountry(e.target.value)}
					className="flex h-[50px] w-[280px] px-5 bg-white border-none outline-none rounded-[40px] text-black text-[20px] font-normal"
				/>
				<button
					type="submit"
					className="flex justify-center items-center h-[50px] w-[50px] rounded-[50px] bg-white cursor-pointer"
				>
					<img src={SearchIcon} alt="search-icon" />
				</button>
			</form>
			{weatherData && (
				<div className="flex flex-col flex-grow w-full justify-between items-center p-10">
					<div className="flex w-full flex-col items-center">
						<img src="weatherImage" alt="weather-icon" />
						<span className="text-[120px] font-bold text-text">
							{kelvinToCelsius(weatherData.main.temp)}&deg;C
						</span>
						<span className="text-[60px] font-bold text-text">London</span>
						<span className="text-[30px] font-bold text-text">Rain</span>
					</div>
					<div className="flex flex-col flex-grow w-full justify-end">
						<div className="w-full flex justify-between items-center text-[20px] font-bold text-text">
							<span>Páratartalom</span>
							<span className="flex items-center">
								<img
									src={HumidityIcon}
									alt="wind-icon"
									className="w-[20px] h-[20px] mr-3 mt-1 "
								/>
								90%
							</span>
						</div>
						<div className="w-full flex justify-between items-center text-[20px] font-bold text-text">
							<span>Szélsebesség</span>
							<span className="flex items-center">
								<img
									src={WindIcon}
									alt="wind-icon"
									className="w-[20px] h-[20px] mr-3 "
								/>
								80km/h
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WeatherCard;
