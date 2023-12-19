import { ReactNode, createContext, useEffect, useReducer } from "react"

export type TPlayer = {
	id: string
	name: string
}

export type TGameState = {
	isPlaying: boolean
	players: TPlayer[]
	diceModalIsOpen: boolean
}

export type TGameAction =
  | { type: "setIsPlaying"; data: boolean }
  | { type: "setPlayers"; data: TPlayer[] }
  | { type: "setDiceModalIsOpen"; data: boolean }

export type TSearchResultsDispatch = (action: TGameAction) => void

export type TGameDispatch = (action: TGameAction) => void

export type TGameContext = {
  state: TGameState
  dispatch: TGameDispatch
}

function gameReducer(
	state: TGameState,
	action: TGameAction
): TGameState {
	switch (action.type) {
		case "setIsPlaying": {
			return {
				...state,
				isPlaying: action.data
			}
		}
		case "setPlayers": {
			return {
				...state,
				players: action.data
			}
		}
		case "setDiceModalIsOpen": {
			return {
				...state,
				diceModalIsOpen: action.data
			}
		}
	}
}

export const GameContext = createContext<
  TGameContext | undefined
>(undefined)

export type TGameProviderProps = {
	children: ReactNode
}

function GameProvider({ children } : TGameProviderProps) {
	const [state, dispatch] = useReducer(gameReducer, {
		isPlaying: false,
		players: [],
		diceModalIsOpen: false
	})

	// Get players from local storage on page load.
	useEffect(() => {
		const storedPlayers = localStorage.getItem('players')
		if (storedPlayers) {
			const storedPlayersArray = storedPlayers.split('&')
			dispatch({
				type: "setPlayers",
				data: storedPlayersArray.map(player => {
					return JSON.parse(player) as TPlayer
				})
			})
		}
	}, [])

	// Store players in local storage on change
	useEffect(() => {
		const arrayOfPlayers = Array.from(state.players, (player => {
			return JSON.stringify(player)
		}))
		const storableData = arrayOfPlayers.join('&')
		localStorage.setItem('players', storableData)
	}, [state.players])
	

	const value = { state, dispatch }

	return (
		<GameContext.Provider value={ value }>
			{children}
		</GameContext.Provider>
	)
}

export { GameProvider }
