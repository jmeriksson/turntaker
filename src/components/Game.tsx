import { useContext, useEffect, useState } from "react";
import { AppContext, TAppContext, TPlayer } from "../App";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

type Props = {
	togglePlaying: () => void
}

export default function Game({togglePlaying}: Props) {
	const { players } = useContext(AppContext) as TAppContext
	const [ currentPlayer, setCurrentPlayer ] = useState<TPlayer>(players[0])
	const [ playersInGame, setPlayersInGame ] = useState<TPlayer[]>(players)
	useEffect(() => {
		if (playersInGame.length === 0) {
			togglePlaying()
		}
	}, [playersInGame])

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

	// const toggleDice = () => {

	// }

	return (
			<Flex direction="column" minH="full">
				{currentPlayer && playersInGame.length === 1 ? (
					<>
						<Flex justify="flex-end">
							<Button colorScheme="red" onClick={togglePlaying}>End game</Button>
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
							<Button colorScheme="purple">Dice</Button>
							<Spacer />
							<Button colorScheme="red" onClick={togglePlaying}>End game</Button>
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