import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";
import SingleHotel from "./pages/SingleHotel/SingleHotel";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/hotels" element={<List />}/>
      <Route path="/hotels/:id" element={<SingleHotel />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
