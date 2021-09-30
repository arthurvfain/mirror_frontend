import '../App.css';
import HomeLogo from './HomeLogo'
import NavBar from './NavBar'
import SignUp from './SignUp'
import Login from './Login'
import UserDashboard from './UserDashboard'
import Users from './Users'
import UserPage from './UserPage'
import {useState, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'


function App() {
  const [currentUser, setCurrentUser] = useState('')
  
  useEffect(() => {
    fetch('https://fierce-everglades-57964.herokuapp.com/me', {
      method: 'GET',
      credentials: 'include'
    }).then(r=>r.json()).then(user=>{
      if (user)
      {
        setCurrentUser(user)
      }
    })
    // fetch('https://fierce-everglades-57964.herokuapp.com/me').then(console.log)
  }, [])

  return (
    <>
    <NavBar />
    <Switch>
      <Route exact path='/'>
        <HomeLogo />
      </Route>
      <Route exact path='/signup'>
        <SignUp setCurrentUser={setCurrentUser}/>
      </Route>
      <Route exact path='/login'>
        <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      </Route>
      <Route exact path='/home'>
        <UserDashboard currentUser={currentUser}/>
      </Route>
      <Route exact path='/user_list'>
        <Users currentUser={currentUser}></Users>
      </Route>
      <Redirect from={`/x_user_page/:id`} to={`/user_page/:id`} />
      <Route exact path='/user_page/:id'>
        <UserPage currentUser={currentUser}/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
