import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employees from './components/Employees';
import Footer from './components/Footer';
import Header from './components/Header';
import employeeData from './components/EmployeeData';
import Nav from './components/Nav';
import GroupedTeamMembers from './components/GroupedTeamMembers';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selectedTeam')) || "Team B");
  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeList')) || employeeData);

  useEffect(() => {
    localStorage.setItem('employeeList', JSON.stringify(employees))
  }, [employees]);
  useEffect(() => {
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam))
  }, [selectedTeam]);

  function handleTeamSelectionChange(event) {
    setTeam(event.target.value)
  }

  function handleEmployeeCardClick(event) {
    const transformedEmployees = employees.map((employee) => employee.id === parseInt(event.currentTarget.id)
      ? (employee.teamName === selectedTeam) ? { ...employee, teamName: '' } : { ...employee, teamName: selectedTeam }
      : employee);
    setEmployees(transformedEmployees)
  }

  return (
    <Router>
      <Nav />
      <Header
        selectedTeam={selectedTeam}
        teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length}
      />

      <Routes>
        <Route
          path="/"
          element={<Employees
            employees={employees}
            selectedTeam={selectedTeam}
            handleEmployeeCardClick={handleEmployeeCardClick}
            handleTeamSelectionChange={handleTeamSelectionChange}
          />}
        >
        </Route>

        <Route path="/GroupedTeamMembers" element={<GroupedTeamMembers employees={employees} selectedTeam={selectedTeam} setTeam={setTeam} />}>
        </Route>

        <Route path="*" element={<NotFound />} ></Route>

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
