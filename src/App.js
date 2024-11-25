import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './mc/Home';
import AllAppointments from './mc/AllAppointments';
import AlreadyVisited from './mc/AlreadyVisited';
// import Navbar from './mc/Navbar';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/all-appointment" element={<AllAppointments />}></Route>
        <Route path="/already-visited" element={<AlreadyVisited />}></Route>


      </Routes>
    </>
  );
}

export default App;
