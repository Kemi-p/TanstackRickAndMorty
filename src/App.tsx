import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CharacterPage } from "./pages/characterPage";
import { DashboardPage } from "./pages/dashboardPage";





function App() {
  return (
   <Routes>
    <Route path="/" element={<CharacterPage />}/>
     <Route path="/dashboard" element={<DashboardPage />}/>
   </Routes>
  );
}

export default App;
