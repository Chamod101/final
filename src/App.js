import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Department } from './pages/Department';
import { Employee } from './pages/Employee';
import { Error } from './pages/Error';
import { Navbar } from './components/Navbar';
import { AddDepartment } from './pages/AddDepartment';
import { AddEmployee } from './pages/AddEmployee';
import { UpdateDepartment } from './pages/UpdateDepartment';
import { UpdateEmployee } from './pages/UpdateEmployee';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/adddepartment" element={<AddDepartment />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/updatedepartment/:idD" element={<UpdateDepartment />} />
          <Route path="/updateemployee/:idE" element={<UpdateEmployee />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
