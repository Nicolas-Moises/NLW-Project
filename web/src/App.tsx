import './styles/main.css';
import logoImg from './assets/logo-nlw.svg'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { api } from './lib/api';

import { ToastContainer, toast } from 'react-toastify';

import { CreateAdModal } from './components/CreateAdModal';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { CircleNotch } from 'phosphor-react';

import 'react-toastify/dist/ReactToastify.min.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}
function App() {

  
  const [isFetching, setIsFetching] = useState(true)
  const [games, setGames] = useState<Game[]>([])

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 6,
      spacing: 20,
    }
  })

  async function fecthGames() {
    try {
      const response = await api.get('/games')
    setGames(response.data)
    } catch(err) {
      console.log(err)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fecthGames()
  }, [])

  if(isFetching) {
    return (
      <div className='w-screen h-screen flex items-center justify-center bg-black'>
        <CircleNotch size={40} className='animate-spin ease-linear text-zinc-300' />
      </div>
    )
  }

  return (
    <div className='max-w-[1200px] mx-auto flex flex-col items-center my-10'>
      <img src={logoImg} alt="" className="w-[200px]" />

      <h1 className='text-4xl text-white font-black mt-10'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div
        ref={sliderRef}
        className='mt-10 keen-slider max-w-[1100px]'
      >

        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              class='keen-slider__slide'
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}

      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />

      </Dialog.Root>

      <ToastContainer />
    </div>
  )
}

export default App
