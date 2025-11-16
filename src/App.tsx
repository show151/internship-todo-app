import { useState } from "react";
import WelcomeMessage from "./WelcomeMessage";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <WelcomeMessage name="Show" />
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={countUp}
        >
          count is {count}
        </button>
    </div>
  );
};

export default App;