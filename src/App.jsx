import { Home } from "./assets/Home/Home";
// import Login from './assets/Login/Log'
import { TaskAndList } from "./assets/TaskAndList/TaskAndList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        {/* <Route path="/Login" element={<Login />}></Route> */}
        <Route exact path="/TaskAndList" element={<TaskAndList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
