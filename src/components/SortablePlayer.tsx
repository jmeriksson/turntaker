import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody, IconButton, Text, Flex, ButtonGroup } from "@chakra-ui/react";
import { DeleteIcon, UpDownIcon } from "@chakra-ui/icons";
import { TPlayer } from "../context";

type Props = TPlayer & {
	removePlayer: (id: string) => void
}

export default function SortablePlayer({id, name, removePlayer}: Props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({id: id})
	const style = {
		transition,
		transform: CSS.Transform.toString(transform)
	}

	const handleRemovePlayer = () => {
		removePlayer(id)
	}
	return (
		<>
			<Card
				ref={setNodeRef}
				style={style}
				mb={4}
			>
				<CardBody>
					<Flex align="center">
						<Text flex={1}>{name}</Text>
						<ButtonGroup>
							<IconButton variant="solid" colorScheme="red" aria-label="Remove" icon={<DeleteIcon />} onClick={handleRemovePlayer} />
							<IconButton variant="solid" colorScheme="teal" aria-label="Move" icon={<UpDownIcon />} {...attributes} {...listeners} cursor="grab" className="touch-action-none" />
						</ButtonGroup>
					</Flex>
				</CardBody>
			</Card>
		</>
	)
}