import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function UserCard({user}){
    console.log("from user card", user)
    return (
        <>
        <LinkContainer target='_self' to={`/x_user_page/${user.id}`}><div className="d-grid gap-2"><Button variant="outline-primary" size="lg" as='h1'>{user.first_name+' '+user.last_name}</Button></div></LinkContainer>
        </>
    )
}


export default UserCard