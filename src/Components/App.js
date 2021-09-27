import logo from '../logo.svg';
import '../App.css';
import NavBar from './NavBar'
import SignUp from './SignUp'
import Login from './Login'
import {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'


function App() {
  const [currentUser, setCurrentUser] = useState('')
  
  useEffect(() => {
    fetch('https://fierce-everglades-57964.herokuapp.com/me').then(r=>r.json()).then(user=>{
      if (user)
      {
        setCurrentUser(user)
      }
    })
  }, [])

  return (
    <>
    <NavBar />
    <Switch>
      <Route exact path='/signup'>
        <SignUp setCurrentUser={setCurrentUser}/>
      </Route>
      <Route exact path='/login'>
        <Login setCurrentUser={setCurrentUser}/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
