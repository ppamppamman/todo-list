import "./App.css";
import PopupMessage from "./Components/PopupMessage/PopupMessage";
import HistoryCard from "./Components/SideNavigator/History/HistoryCard";

// pages에서 불러오도록
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
