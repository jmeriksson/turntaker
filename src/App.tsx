import { Container } from '@chakra-ui/react'
import { GameProvider } from './context'
import Wrapper from './components/Wrapper'

function App() {
  return (
		<>
			<GameProvider>
				<Container h="100vh" py={4}>
					<Wrapper />
				</Container>
			</GameProvider>
		</>
  )
}

export default App
