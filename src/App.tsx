import { Container } from '@chakra-ui/react'
import { GameProvider } from './context'
import Wrapper from './components/Wrapper'
import DiceModal from './components/DiceModal'

function App() {
  return (
		<>
			<GameProvider>
				<Container h="100vh" py={4}>
					<Wrapper />
					<DiceModal />
				</Container>
			</GameProvider>
		</>
  )
}

export default App
