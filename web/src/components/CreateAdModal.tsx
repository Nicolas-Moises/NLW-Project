import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Form/input';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



interface Game {
    id: string;
    title: string;
}

interface CreateAdModalProps {
    games: Game[]
}

export function CreateAdModal(props:CreateAdModalProps) {

    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        console.log(data)
        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {

                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "useVoiceChannel": useVoiceChannel
            })

            toast.success('Anuncio criado com sucesso', {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: "dark"
            })
        } catch (err) {
            console.log(err);
            alert('Erro ao criar anúncio!');
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed">
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-2xl font-bold">Publique um anúncio</Dialog.Title>

                    <form onSubmit={handleCreateAd} className="mt-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold " htmlFor="game">Qual o game?</label>

                            <Select.Root name="game">
                                <Select.Trigger aria-label="games" className="group bg-zinc-900 py-3 px-4 flex justify-between rounded text-sm text-zinc-500 items-center">
                                    <Select.Value placeholder="Selecione o game que deseja jogar" />
                                    <Select.Icon>
                                        <CaretDown size={20} className="text-violet-500" />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Content className="bg-zinc-900 rounded-md z-20 w-[400px] translate-y-20 p-1">

                                    {props.games.map(game => {
                                        return (
                                            <Select.Item
                                                key={game.id}
                                                value={game.id}
                                                className="cursor-pointer hover:bg-zinc-700 p-3 rounded flex justify-between items-center"
                                            >
                                                <Select.ItemText>
                                                    {game.title}
                                                </Select.ItemText>
                                                <Select.ItemIndicator>
                                                    <Check className="text-violet-500" />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        )
                                    })}
                                </Select.Content>
                            </Select.Root>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                        </div>


                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="discord" className="font-semibold">Qual seu Discord</label>
                                <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>

                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid grid-cols-4 gap-2"
                                    onValueChange={setWeekDays}
                                    value={weekDays}
                                >
                                    <ToggleGroup.Item value="0"
                                        title="Domingo"
                                        className={`w-10 h-10 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        D
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value="1"
                                        title="Segunda"
                                        className={`w-10 h-10 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value="2"
                                        title="Terça"
                                        className={`w-10 h-10 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value="3"
                                        title="Quarta"
                                        className={`w-10 h-10 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value="4"
                                        title="Quinta"
                                        className={`w-10 h-10 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value="5"
                                        title="Sexta"
                                        className={`w-10 h-10 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item value="6"
                                        title="Sábado"
                                        className={`w-10 h-10 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label  className="font-semibold">Qual horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                        <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                        <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <label className="mt-2 flex gap-2 text-sm items-center select-none">
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                className="w-6 h-6 p-1 rounded bg-zinc-900"
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        setUseVoiceChannel(true)
                                    } else {
                                        setUseVoiceChannel(false)
                                    }
                                }}
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </label>

                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close
                                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-all ease-in"
                                type="button"

                            >
                                Cancelar
                            </Dialog.Close>
                            <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md flex items-center font-semibold gap-3 hover:bg-violet-600 transition-all ease-in">
                                <GameController size={20} />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}