import './global.css'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from './components/Home';
import Alert from './components/utils/Alert'
import Submission from './components/Submission';
import CreateHackathonSubmission from './components/CreateHackathonSubmission';
import EditHackathonSubmission from './components/EditHackathonSubmission';
import Protected from './components/utils/Protected';
import { verifyToken } from './utils';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import DetailPage from './components/DetailPage';

function App() {
  const [alert, setAlert] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function fetchState() {
      const verify = await verifyToken(localStorage.getItem('access'));

      setIsLogged(verify);
    }
    fetchState();

  }, [])






  const showAlert = (type, title, msg) => {
    setAlert({
      msg: msg,
      type: type,
      title: title
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }



  return (
    <>
      <BrowserRouter>
        <Navbar title="HackthonX" isLogged={isLogged} setIsLogged={setIsLogged} />
        <Alert alert={alert} />

        <Routes>
          <Route path="/login" element={<Login setIsLogged={setIsLogged} showAlert={showAlert} isLogged={isLogged} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route
            path="/"
            element={
              <Protected isLogged={isLogged}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/hackathon/create"
            element={
              <Protected isLogged={isLogged} >
                <CreateHackathonSubmission showAlert={showAlert} />
              </Protected>
            }
          />
          <Route
            path="/hackathon/:title/edit"
            element={
              <Protected isLogged={isLogged} >
                <EditHackathonSubmission showAlert={showAlert} />
              </Protected>
            }
          />
          <Route
            path="/submission/:title/edit"
            element={
              <Protected isLogged={isLogged} >
                <Submission showAlert={showAlert} />
              </Protected>
            }
          />
          <Route
            path="/hackathon/:title"
            element={
              <Protected isLogged={isLogged} >
                <DetailPage
                  showAlert={showAlert} />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
