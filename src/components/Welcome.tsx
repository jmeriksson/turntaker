import { 
	Heading,
	Text,
	Button,
	useDisclosure,
	Box,
	Flex
} from "@chakra-ui/react";
import { 
	SortableContext,
	verticalListSortingStrategy,
	sortableKeyboardCoordinates,
	arrayMove
} from "@dnd-kit/sortable";
import {
	DndContext,
	DragEndEvent,
	closestCenter,
	useSensors,
	useSensor,
	PointerSensor,
	KeyboardSensor
} from "@dnd-kit/core";
import SortablePlayer from "./SortablePlayer";
import AddPlayerModal from "./AddPlayerModal";
import { TPlayer } from "../context";
import useGame from "../hooks/useGame";

export default function Welcome() {
	const {isOpen, onOpen, onClose} = useDisclosure()
	const { state, dispatch } = useGame()
	const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
    if (over === null || active.id === over.id) {
      return;
    }

		const oldIndex = state.players.findIndex((player) => player.id === active.id);
      const newIndex = state.players.findIndex((player) => player.id === over.id);

		dispatch({
			type: "setPlayers",
			data: arrayMove(state.players, oldIndex, newIndex)
		})
	}

	const removePlayer = (playerId: string) => {
		const remainingPlayers = state.players.filter((player: TPlayer) => player.id != playerId)
		
		dispatch({
			type: "setPlayers",
			data: remainingPlayers
		})
	}

	const handleStartGame = () => {
		dispatch({
			type: "setIsPlaying",
			data: true
		})
	}

	return (
		<Flex direction="column" h="full">
			<AddPlayerModal isOpen={isOpen} onClose={onClose} />

			<Heading as="h1" size="4xl" mb={4}>Turn taker</Heading>
			<Text mb={4}>This simple application helps you remember who takes turn in a game.</Text>
			{state.players.length === 0 ? <Text>Click "Add players" to get started.</Text> : null}
			{state.players.length > 0 ? <Heading as="h2" size="lg" mb={4}>Players:</Heading> : null}
			<Box flex={1} overflow="auto">
			{state.players.length > 0 ? (
				<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
					<Box mb={4}>
						<SortableContext items={state.players} strategy={verticalListSortingStrategy}>
							{state.players.map(player => {
								return (
									<SortablePlayer key={player.id} removePlayer={removePlayer} {...player} />
								)
							})}
						</SortableContext>
					</Box>
				</DndContext>
			): null}
			</Box>
			<Flex gap="2">
				<Button flex={1} colorScheme="teal" size="lg" onClick={onOpen}>Add players</Button>
				{state.players.length > 0 ? (<Button flex={1} colorScheme="green" size="lg" onClick={handleStartGame}>Start playing</Button>): null}
			</Flex>
		</Flex>
	)
}