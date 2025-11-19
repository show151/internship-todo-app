import { TodoProvider } from './context/TodoContext';
import { Home } from './pages/Home';

const App = () => {
  return (
    <TodoProvider>
      <Home />
    </TodoProvider>
  );
};

export default App;
