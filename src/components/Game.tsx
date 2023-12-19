import { useEffect, useState } from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { TPlayer } from "../context";
import useGame from "../hooks/useGame";

export default function Game() {
	const { state, dispatch } = useGame()
	const [ currentPlayer, setCurrentPlayer ] = useState<TPlayer>(state.players[0])
	const [ playersInGame, setPlayersInGame ] = useState<TPlayer[]>(state.players)
	useEffect(() => {
		if (playersInGame.length === 0) {
			dispatch({
				type: "setIsPlaying",
				data: false
			})
		}
	}, [dispatch, playersInGame.length])

	const eliminateCurrentPlayer = () => {
		setPlayersInGame(playersInGame.filter((player: TPlayer, index: number) => {
			if (player.id == currentPlayer.id) {
				if (playersInGame[index + 1]) {
					setCurrentPlayer(playersInGame[index + 1])
				} else {
					setCurrentPlayer(playersInGame[0])
				}
				return false
			}
			return true
		}))
	}

	const switchPlayer = () => {
		const indexOfCurrentPlayer = playersInGame.indexOf(currentPlayer)
		if (playersInGame[indexOfCurrentPlayer + 1]) {
			setCurrentPlayer(playersInGame[indexOfCurrentPlayer + 1])
		} else {
			setCurrentPlayer(playersInGame[0])
		}
	}

	const handleEndGame = () => {
		dispatch({
			type: "setIsPlaying",
			data: false
		})
	}

	return (
			<Flex direction="column" minH="full">
				{currentPlayer && playersInGame.length === 1 ? (
					<>
						<Flex justify="flex-end">
							<Button colorScheme="red" onClick={handleEndGame}>End game</Button>
						</Flex>
						<Flex flex="1" direction="column" align="center" justify="center">
							<Text>You're the only player left,</Text>
							<Heading as="h1" size="4xl" textAlign="center">{currentPlayer.name}</Heading>
						</Flex>
					</>
				): null}
				{ currentPlayer && playersInGame.length > 1 ? (
					<>
						<Flex>
							<Button colorScheme="red" onClick={handleEndGame}>End game</Button>
						</Flex>
						<Flex flex="1" direction="column" align="center" justify="center">
							<Text>It's your turn,</Text>
							<Heading as="h1" size="4xl" textAlign="center">{currentPlayer.name}</Heading>
						</Flex>
						<Flex justify="center">
							<Flex gap="2" w="full">
								<Button flex="1" size="lg" colorScheme="green" onClick={switchPlayer}>End turn</Button>
								<Button flex="1" size="lg" colorScheme="red" onClick={eliminateCurrentPlayer}>Eliminate player</Button>
							</Flex>
						</Flex>
					</>
				): null}
			</Flex>
	)
}