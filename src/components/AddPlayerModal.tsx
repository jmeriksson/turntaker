import {
	Text,
	UnorderedList,
	ListItem,
	Button,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	Input,
	ModalFooter,
	FormControl,
} from "@chakra-ui/react"
import { AppContext, TAppContext } from "../App"
import { useContext, useState } from "react"

type Props = {
	isOpen: boolean
	onClose: () => void
}

export default function AddPlayerModal({isOpen, onClose}: Props) {
	const { players, setPlayers } = useContext(AppContext) as TAppContext
	const [inputValue, setInputValue] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const addPlayer = (playerName: string) => {
		const id = Date.now().toString()
		setPlayers([...players, {id: id, name: playerName}])
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const validateAndAddPlayer = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!inputValue || inputValue.length == 0) {
			console.log('There was an error')
			setErrorMessage('Please add a name.')
			return
		}
		addPlayer(inputValue)
		setInputValue('')
		setErrorMessage('')
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent pb={4}>
					<ModalHeader>Add players</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={validateAndAddPlayer}>
						<ModalBody>
						{players.length > 0 ? (
							<>
								<Text>Players:</Text>
								<UnorderedList mb="4">
									{players.map(player => {
										return (
											<ListItem key={player.id}>
												{player.name}
											</ListItem>
										)
									})}
								</UnorderedList>
							</>
						): null}
						<FormControl isRequired>
							<Input
								type="text"
								size="lg"
								value={inputValue}
								onChange={handleInputChange}
							/>
							{errorMessage ? (
								<p>Error: {errorMessage}</p>
							): null}
						</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type="submit"
								colorScheme="teal"
								size="lg"
								width="full">
									Add
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
	)
}