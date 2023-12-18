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
import { useContext } from "react";
import {
	DndContext,
	DragEndEvent,
	closestCenter,
	useSensors,
	useSensor,
	PointerSensor,
	KeyboardSensor
} from "@dnd-kit/core";
import { AppContext, TAppContext, TPlayer } from "../App";
import SortablePlayer from "./SortablePlayer";
import AddPlayerModal from "./AddPlayerModal";

type Props = {
	togglePlaying: () => void
}

export default function Welcome({ togglePlaying }: Props) {
	const {isOpen, onOpen, onClose} = useDisclosure()
	const { players, setPlayers } = useContext(AppContext) as TAppContext
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
    setPlayers((players) => {
      const oldIndex = players.findIndex((player) => player.id === active.id);
      const newIndex = players.findIndex((player) => player.id === over.id);
      return arrayMove(players, oldIndex, newIndex);
    });
	}

	const removePlayer = (playerId: string) => {
		setPlayers(players.filter((player: TPlayer) => player.id != playerId))
	}

	return (
		<Flex direction="column" h="full">
			<AddPlayerModal isOpen={isOpen} onClose={onClose} />

			<Heading as="h1" size="4xl" mb={4}>Turn taker</Heading>
			<Text mb={4}>This simple application helps you remember who takes turn in a game.</Text>
			{players.length === 0 ? <Text>Click "Add players" to get started.</Text> : null}
			{players.length > 0 ? <Heading as="h2" size="lg" mb={4}>Players:</Heading> : null}
			<Box flex={1} overflow="auto">
			{players.length > 0 ? (
				<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} sensors={sensors}>
					<Box mb={4}>
						<SortableContext items={players} strategy={verticalListSortingStrategy}>
							{players.map(player => {
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
				{players.length > 0 ? (<Button flex={1} colorScheme="green" size="lg" onClick={togglePlaying}>Start playing</Button>): null}
			</Flex>
		</Flex>
	)
}