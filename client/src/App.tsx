import { ChoiceProvider } from './contexts/dialogContext';
import { MenuProvider } from './contexts/menuContext';
import AppRoutes from './Routes';

function App() {
  return (
    <>
      <ChoiceProvider>
        <MenuProvider>
          <AppRoutes />
        </MenuProvider>
      </ChoiceProvider>
    </>
  )
}

export default App