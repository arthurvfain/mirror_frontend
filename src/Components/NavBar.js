import {useHistory} from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


function NavBar({currentUser, setCurrentUser}) {

    let history = useHistory()
    async function handleLogout() {
        // let resp = await fetch('https://fierce-everglades-57964.herokuapp.com/sessions', {
        let resp = await fetch('http://localhost:3000/sessions', {
            method: 'DELETE',
            credentials: 'include'
        })

        if(resp.ok) {
            setCurrentUser('')
            history.push('/login')
        }
        //DO WE WANT/NEED SOMETHING TO HANDLE FAILURE?
    }

    return (

        <Navbar bg="black" variant="dark">
        <Container>
        <LinkContainer to='/' style={{ fontWeight:'bold' }}>
            <Navbar.Brand >{currentUser ? `${currentUser.first_name}'s `: null}MIЯROR</Navbar.Brand>
        </LinkContainer>     
        {currentUser ?  
            <Nav className="me-auto">
                <LinkContainer to='/home'><Nav.Link>Home</Nav.Link></LinkContainer>
                <LinkContainer to='/friends'><Nav.Link>Friends List</Nav.Link></LinkContainer>
                <LinkContainer to='/user_list'><Nav.Link>Users List</Nav.Link></LinkContainer>
                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            </Nav> 
            :
            <Nav className="me-auto">
                <LinkContainer to='/signup'><Nav.Link >Sign Up</Nav.Link></LinkContainer>
                <LinkContainer to='/login'><Nav.Link >Log In</Nav.Link></LinkContainer>
            </Nav>}
        </Container>
        </Navbar>
    )
}
export default NavBar