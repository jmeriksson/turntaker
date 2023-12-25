import { useContext } from "react"
import { GameContext, TGameContext } from "../context"

export default function useGame(): TGameContext {
  const context = useContext(GameContext)
	if (context === undefined) {
		return {
			state: {
				isPlaying: false,
				players: [],
				diceModalIsOpen: false,
				diceIsRolling: false
			},
			dispatch: () => {}
		}
	}
  return context
}