import Loading from './Loading'
import UserCard from './UserCard'
import {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import {LinkContainer} from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'

function FriendsList({currentUser}) {
    
    const [loading, setLoading] = useState(true)
    const [friends, setFriends] = useState([])
    
    useEffect(() => {
        // fetch(`https://fierce-everglades-57964.herokuapp.com/friendships/${currentUser.id}`).then(r=>r.json()).then(data=>{
        fetch(`http://localhost:3000/friendships/${currentUser.id}`).then(r=>r.json()).then(data=>{
            console.log(data)
            setFriends(data)
            setLoading(false)
        })
        
    }, [])

    return (
    <div className = 'pageContent'>
    <h1>Friends</h1>
    {loading ? <Loading /> : friends.length > 0 ? <Grid container justifyContent='center' spacing={2}>{friends.map(user => <Grid item xs={6} sm={3} key={user.id}><UserCard user={user}/></Grid>)}</Grid> : <LinkContainer to='/user_list'><Button variant='secondary'>Get Out There !</Button></LinkContainer>}
    </div>
    )
}


export default FriendsList 