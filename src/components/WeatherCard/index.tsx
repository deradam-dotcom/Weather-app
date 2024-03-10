import React from 'react';
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
	const { kelvinToCelsius, msToKmh, getIconFileName, capitalizeString } =
		useWeatherContext();

	return (
    <div
      className={`flex flex-col w-[300px] lg:w-auto  h-[550px] lg:h-[829px] my-10 lg:mt-[0px] rounded-[12px] bg-gradient-to-b ${gradientColor} shadow-2xl transform hover:scale-105 transition-transform duration-300`}
    >
      <form
        onSubmit={onSubmit}
        className="flex justify-center items-center gap-[14px] pt-[60px] px-[10px] lg:px-[80px]"
      >
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setCountry(e.target.value)}
          className="flex h-[50px] w-[200px] lg:w-[280px] px-5 bg-white border-none outline-none rounded-[40px] text-black text-[20px] font-normal"
        />
        <button
          type="submit"
          className="flex justify-center items-center h-[50px] w-[50px] rounded-[50px] bg-white cursor-pointer"
        >
          <img src={SearchIcon} alt="search-icon" />
        </button>
      </form>
      {weatherData ? (
        <div className="flex flex-col flex-grow w-full justify-between items-center p-5 pb-0 lg:p-10">
          <div className="flex w-full flex-col items-center">
            {weatherData.weather.length > 1 ? (
              <div className="flex text-[30px] font-bold text-text">
                <img
                  src={getIconFileName(weatherData.weather[0].icon)}
                  alt="weather-icon"
                />
                <img
                  src={getIconFileName(weatherData.weather[1].icon)}
                  alt="weather-icon"
                />
              </div>
            ) : (
              <img
                src={getIconFileName(weatherData.weather[0].icon)}
                alt="weather-icon"
              />
            )}
            <span className="text-[50px] lg:text-[120px] font-bold text-text">
              {kelvinToCelsius(weatherData.main.temp)}&deg;C
            </span>
            <span className="text-[30px] lg:text-[60px] font-bold text-text">
              {weatherData.name}
            </span>
            {weatherData.weather.length > 1 ? (
              <div className="flex text-[30px] font-bold text-text">
                <span>
                  {capitalizeString(weatherData.weather[0].description)},
                </span>
                <span>
                  &nbsp;{capitalizeString(weatherData.weather[1].description)}
                </span>
              </div>
            ) : (
              <span className="text-[15px]  lg:text-[30px] font-bold text-text">
                {capitalizeString(weatherData.weather[0].description)}
              </span>
            )}
          </div>
          <div className="flex flex-col flex-grow w-full justify-center lg:justify-end">
            <div className="w-full flex justify-between items-center text-[15px] lg:text-[20px] font-bold text-text">
              <span>Humidity</span>
              <span className="flex items-center">
                <img
                  src={HumidityIcon}
                  alt="wind-icon"
                  className="w-[20px] h-[20px] mr-3 mt-1 "
                />
                {weatherData.main.humidity} %
              </span>
            </div>
            <div className="w-full flex justify-between items-center text-[15px] lg:text-[20px] font-bold text-text">
              <span>Wind speed</span>
              <span className="flex items-center">
                <img
                  src={WindIcon}
                  alt="wind-icon"
                  className="w-[20px] h-[20px] mr-3 "
                />
                {msToKmh(weatherData.wind.speed)} km/h
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow justify-center items-center mb-10 text-[20px] font-bold text-text">
          <h1 className="text-center">
            CHOOSE A CAPITAL OR COUNTRY
            <br />
            TO GET THE CURRENT WEATHER CONDITIONS
          </h1>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
