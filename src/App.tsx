import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, CalendarDays, Navigation, LocateFixed } from 'lucide-react';
import { WeatherData, ForecastData } from './components/Interface';

export default function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cb937fd5aa9076f6f89cef484a380f95&units=metric&lang=pt_br`
        );
        setCity(response.data.name);
        setWeatherData(response.data);
        setPosition([latitude, longitude]);
      } catch (error) {
        console.error('Erro ao buscar localização atual:', error);
      }
    });
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const weatherResponse = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb937fd5aa9076f6f89cef484a380f95&units=metric&lang=pt_br`
        );
        setWeatherData(weatherResponse.data);
        setPosition([weatherResponse.data.coord.lat, weatherResponse.data.coord.lon]);

        const forecastResponse = await axios.get<ForecastData>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cb937fd5aa9076f6f89cef484a380f95&units=metric&lang=pt_br`
        );
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
  };


  useEffect(() => {
    if (position) {
    }
  }, [position]);

  const processForecastData = () => {
    if (!forecastData) return [];

    const dailyData: { [date: string]: { min: number; max: number } } = {};

    forecastData.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString('pt-BR');
      if (!dailyData[date]) {
        dailyData[date] = {
          min: entry.main.temp_min,
          max: entry.main.temp_max,
        };
      } else {
        dailyData[date].min = Math.min(dailyData[date].min, entry.main.temp_min);
        dailyData[date].max = Math.max(dailyData[date].max, entry.main.temp_max);
      }
    });

    return Object.entries(dailyData)
      .slice(0, 5)
      .map(([date, temps]) => ({
        date,
        min: Math.round(temps.min),
        max: Math.round(temps.max),
      }));
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-900 text-zinc-200">
      <header className="p-4 flex justify-between items-center bg-zinc-800">
        <h1 className="text-2xl font-bold">Lab</h1>
        <div className="flex flex-col items-center flex-grow">
          <div className="relative w-500">
            <input
              type="text"
              placeholder="Pesquise pela cidade"
              className="bg-zinc-700 w-full p-2 pl-10 rounded-md text-sm"
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleSearch}
              value={city}
            />
            <Navigation className="absolute left-2 top-2 text-zinc-400" />
          </div>
        </div>
        <button
          onClick={getCurrentLocation}
          className="bg-zinc-700 p-2 rounded-md flex items-center space-x-2 hover:bg-zinc-600"
        >
          <LocateFixed />
          <span>Localização Atual</span>
        </button>
      </header>


      <main className="flex flex-2 p-5">
        {weatherData && (
          <div className="w-2/6 p-10 bg-zinc-800 rounded-lg">
            <div className="flex items-center space-x-6">
              <div>
              <h2 className="text-7xl font-bold">{Math.round(weatherData.main.temp)}°C</h2>
              <p className='text-xl mt-5'>{weatherData.weather[0].description}</p>
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Ícone do Clima"
                  className="w-35 h-35"
                />

              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-zinc-500 flex flex-col gap-2">
              <p className="text-lg">
                <CalendarDays className="inline mr-2" />
                {new Date(weatherData.dt * 1000).toLocaleString('pt-BR', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
              <p className="text-lg">
                <MapPin className="inline mr-2" />
                {weatherData.name}, {weatherData.sys.country}
              </p>
            </div>
          </div>
        )}
        {position && (
          <div className="w-4/6 ml-5 border-5 rounded-lg h-96">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{weatherData?.name}, {weatherData?.sys.country}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </main>

      {forecastData && (
        <footer className="p-2">
          <div className="flex justify-center space-x-10">
            {processForecastData().map((day, index) => (
              <div key={index} className="p-4 bg-zinc-800 rounded-lg text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CalendarDays className="w-5 h-5" />
                  <p>{day.date}</p>
                </div>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
                  alt="Ícone do Clima"
                  className="w-10 h-10 mx-auto"
                />
                <p>{day.max}°/{day.min}°</p>
              </div>

            ))}
          </div>
        </footer>
      )}
    </div>
  );
}
