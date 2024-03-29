import 'keen-slider/keen-slider.min.css';

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
    class: string
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a href="" 
            className={`relative rounded-lg overflow-hidde ${props.class}`}
        >
            <img src={props.bannerUrl} alt="game" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-o right-0'>
                <strong className='font-bold text-white block'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncios</span>
            </div>
        </a>
    )
}