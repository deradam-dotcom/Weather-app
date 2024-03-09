import { useWeatherContext } from './contexts/WeatherContext';
import { GradientColor } from './enums';
import WeatherCard from './components/WeatherCard';

function App() {
	const {
		handleSubmit1,
		setCountry1,
		weatherData1,
		handleSubmit2,
		setCountry2,
		weatherData2,
	} = useWeatherContext();

	return (
		<div className="flex w-full h-screen">
			<div className="flex-1 h-full flex justify-center items-center">
				<WeatherCard
					gradientColor={GradientColor.TealToBlue}
					onSubmit={handleSubmit1}
					setCountry={setCountry1}
					weatherData={weatherData1}
				/>
			</div>
			<div className="flex-1 h-full flex justify-center items-center">
				<WeatherCard
					gradientColor={GradientColor.YellowToMagenta}
					onSubmit={handleSubmit2}
					setCountry={setCountry2}
					weatherData={weatherData2}
				/>
			</div>
		</div>
	);
}

export default App;
