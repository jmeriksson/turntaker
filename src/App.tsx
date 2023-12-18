import { Container } from '@chakra-ui/react'
import { useState, createContext, SetStateAction, Dispatch, useEffect } from "react"
import Welcome from './components/Welcome'
import Game from './components/Game'

export type TPlayer = {
	id: string
	name: string
}

export type TAppContext = {
	players: TPlayer[]
	setPlayers: Dispatch<SetStateAction<TPlayer[]>>
}

export const AppContext = createContext<TAppContext | null>(null)

function App() {
	const [playing, setPlaying] = useState(false)
	const [players, setPlayers] = useState<Array<TPlayer>>([])

	// Get players from local storage on page load.
	useEffect(() => {
		const storedPlayers = localStorage.getItem('players')
		if (storedPlayers) {
			const storedPlayersArray = storedPlayers.split('&')
			setPlayers(storedPlayersArray.map(player => {
				return JSON.parse(player) as TPlayer
			}))
		}
	}, [])

	// Store players in local storage on change
	useEffect(() => {
		const arrayOfPlayers = Array.from(players, (player => {
			return JSON.stringify(player)
		}))
		const storableData = arrayOfPlayers.join('&')
		localStorage.setItem('players', storableData)
	}, [players])

	const togglePlaying = () => {
		setPlaying(!playing)
	}

  return (
		<AppContext.Provider value={{ players, setPlayers }}>
			<Container h="100vh" py={4}>
				{!playing ? (
					<Welcome
						togglePlaying={togglePlaying}
					/>
				): (
					<Game togglePlaying={togglePlaying} />
				)}
			</Container>
		</AppContext.Provider>
  )
}

export default App
