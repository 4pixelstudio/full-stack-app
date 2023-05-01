import { useEffect } from "react";
import DraggableCards from "./pages/DraggableCards/DraggableCards";
import data from "./data/data.json";
import { CARDS_STORAGE_KEY_NAME } from "./constants/constants";

function App() {
  useEffect(() => {
    const storedData = localStorage.getItem(CARDS_STORAGE_KEY_NAME);

    if (!storedData)
      localStorage.setItem(CARDS_STORAGE_KEY_NAME, JSON.stringify(data));
  }, []);

  return (
    <div className="App">
      <DraggableCards />
    </div>
  );
}

export default App;
