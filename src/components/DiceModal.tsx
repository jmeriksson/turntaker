import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import { useState } from "react";

type TDie = "d3" | "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100"

export default function DiceModal() {
	const { state, dispatch } = useGame()
	const [dieType, setDieType] = useState<TDie>("d20")
	const [numberOfDice, setNumberOfDice] = useState<number>(1)
	const [rolledDice, setRolledDice] = useState<number[]>([0])

	const handleClose = () => {
		dispatch({ type: "setDiceModalIsOpen", data: false })
	}

	const handleDieSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDieType(e.target.value as TDie)
	}

	const handleNumberOfDiceSelection = (value: number) => {
		setNumberOfDice(value)
	}

	const handleRoll = () => {
		dispatch({ type: "setDiceIsRolling", data: true })
		// Roll dice every 100ms, seven times
    	for (let i = 1; i <= 7; i++) {
			setTimeout(rollDice, 100 * i)
		}

		// Roll dice every 200ms, five times, after the previous rolls
		for (let i = 1; i <= 5; i++) {
			setTimeout(rollDice, 700 + 200 * i)
		}

		// Roll dice every 400ms, twice, after the previous rolls
		for (let i = 1; i <= 2; i++) {
			setTimeout(rollDice, 1700 + 400 * i)
		}

		setTimeout(() => {
			dispatch({ type: "setDiceIsRolling", data: false })
		}, 2500)
	}

	const rollDice = () => {
		const rolledDice: number[] = []
		for (let i = 0; i < numberOfDice; i++) {
			rolledDice.push(rollDie(dieType))
		}
		setRolledDice(rolledDice)
	}

	const rollDie = (die: TDie) => {
		return Math.floor(Math.random() * (parseInt(die.substring(1)))) + 1
	}

	const sumRolledDice = () => {
		return rolledDice.reduce((accumulator, currentValue) => {
			return accumulator + currentValue
		}, 0)
	}

	return (
		<Modal isOpen={state.diceModalIsOpen} onClose={handleClose}>
			<ModalOverlay />
			<ModalContent pb={4}>
				<ModalHeader>Roll the dice</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex direction="column" align="center" justify="center" w="full" h="full">
						<Text fontSize="6xl">{sumRolledDice()}</Text>
						{state.diceIsRolling
							? <Text>Rolling...</Text>
							: (<Text>({rolledDice.map((rolledDie: number, index) => {
								let value = rolledDie.toString()
								if (index !== rolledDice.length - 1) {
									value += ', '
								}
								return value
							})})</Text>)
						}
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Flex direction="column" gap="4" w="full">
						<Select variant="filled" onChange={handleDieSelection}>
							<option value="d3">D3</option>
							<option value="d4">D4</option>
							<option value="d6">D6</option>
							<option value="d8">D8</option>
							<option value="d10">D10</option>
							<option value="d12">D12</option>
							<option selected value="d20">D20</option>
							<option value="d100">D100</option>
						</Select>
						<Slider aria-label="number of dice" defaultValue={1} min={1} max={10} onChange={handleNumberOfDiceSelection}>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb color="blackAlpha.800" fontSize='sm' boxSize="32px" children={numberOfDice} />
						</Slider>
						<Button colorScheme="blue" onClick={handleRoll}>Roll</Button>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}