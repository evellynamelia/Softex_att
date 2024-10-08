import { Home as HomeIcon, Search, Bolt, Cloud } from 'lucide-react'


export default function App() {
  return (
    <div className="h-screen flex flex-col">

      <div className="flex flex-1">
        <aside className="w-60 bg-zinc-950 p-6">
          <div className='flex items-center gap-2'>
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <nav className="mt-10">
            <a href="" className="flex items-center gap-4 text-sm font-semibold text-zinc-200 mb-2">
              <HomeIcon />
              Home
            </a>
          </nav>
          <nav>
            <a href="" className="flex items-center gap-4 text-sm font-semibold text-zinc-200">
              <Bolt />
              Configuração
            </a>
          </nav>
        </aside>


        <main className="flex-1 p-7 bg-zinc-900">
          <div className="flex justify-between items-center ">
            <input
              type="text"
              placeholder="Digite sua cidade..."
              className="bg-zinc-700 p-2 rounded-md text-sm"
            />
            <button className="bg-purple-500 px-4 py-2 rounded-md">Localização atual</button>
          </div>


          <div className="mt-6 grid grid-cols-2 gap-6">

            <div className="flex items-start gap-4">
              <Cloud className="text-zinc-200 w-10 h-10" />
              <div>
                <h1 className="text-5xl text-zinc-200 font-bold">27°C</h1>
                <p className="text-lg text-zinc-200">Recife</p>
                <p className="text-sm text-zinc-200 mt-2">Recife, PE - Segunda, 02 Out</p>
              </div>
            </div>



            <div className="bg-zinc-700 text-zinc-200 p-6 rounded-lg hover:bg-white/10">
              <h2 className="text-lg font-bold mb-4">Qualidade do Ar</h2>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xl">0</p>
                  <p className="text-xs">PM2.5</p>
                </div>
                <div>
                  <p className="text-xl">0</p>
                  <p className="text-xs">SO2</p>
                </div>
                <div>
                  <p className="text-xl">0</p>
                  <p className="text-xs">NO2</p>
                </div>
                <div>
                  <p className="text-xl">0</p>
                  <p className="text-xs">O3</p>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-6 grid grid-cols-4 gap-4 bg-zinc-700 text-zinc-200 p-6 rounded-lg hover:bg-white/10">
            <div className="text-center">
              <p className="text-lg">Humidade</p>
              <p className="text-xl">0%</p>
            </div>
            <div className="text-center">
              <p className="text-lg">Vento</p>
              <p className="text-xl">0Km</p>
            </div>
            <div className="text-center">
              <p className="text-lg">Visibilidade</p>
              <p className="text-xl">0km</p>
            </div>
            <div className="text-center">
              <p className="text-lg">Minima</p>
              <p className="text-xl">0°C</p>
            </div>
          </div>


          <div className="mt-6 text-zinc-200 ">
            <h2 className="text-lg font-bold mb-4 ">5 Dias Consecutivos</h2>
            <div className="grid grid-cols-5 gap-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-zinc-700 p-4 rounded-lg text-center hover:bg-white/10">
                    <p>7 Out</p>
                    <p className="text-2xl">0°C</p>
                    <p className="text-sm">...</p>
                  </div>
                ))}
            </div>
          </div>
        </main>

      </div>

    </div>
  );
}