import "./App.css";
import { Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";

function App() {
  return (
    <main className="min-h-screen bg-gray-800 text-white flex flex-col">
      <Routes>
        <Route path="/" element={<Todos />} />
      </Routes>
    </main>
  );
}

export default App;
