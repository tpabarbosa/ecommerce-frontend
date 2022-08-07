import { ThemedApp } from './contexts/Theme';
import { CartProvider } from './contexts/Cart';
import { UserProvider } from './contexts/User';
import AppRoutes from './routes';

function App() {
  return (
    <ThemedApp mode="light">
      <UserProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </UserProvider>
    </ThemedApp>
  );
}

export default App;
