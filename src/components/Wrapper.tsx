import useGame from "../hooks/useGame"
import Game from "./Game"
import Welcome from "./Welcome"

export default function Wrapper() {
	const { state } = useGame()

	return (
		<>
			{state.isPlaying ? (
				<Game />
			): (
				<Welcome />
			)}
		</>
	)
}