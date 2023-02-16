import { ChoiceProvider } from './contexts/dialogContext';
import AppRoutes from './Routes';


function App() {
  return (
    <>
      <ChoiceProvider>
        <AppRoutes />
      </ChoiceProvider>
    </>
  )
}

export default App