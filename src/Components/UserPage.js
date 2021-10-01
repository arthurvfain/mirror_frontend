import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import UserCard from './UserCard'
import Loading from './Loading'
import { Grid } from '@material-ui/core'
import { Button } from 'react-bootstrap'
function UserPage({currentUser}){
    
    const params = useParams();
    
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [friend, setFriend] = useState(false)
    const [requested, setRequested] = useState(false)
    const [inverseRequested, setInverseRequested] = useState(false)
    const [friendRequestId, setFriendRequestId] = useState('')
    const [friendList, setFriendList] = useState([])
    
    console.log(params)
    
    useEffect(() => {
        fetch(`https://fierce-everglades-57964.herokuapp.com/users/${params.id}`).then(r=>r.json()).then((data) => {
            setUser(data)
            console.log(data.friends)
            setLoading(false)
            setFriendList(data.friends)
            if (data.friends.some(friend => friend.id === currentUser.id)) {
                setFriend(true)
            }
            if (data.friend_requests.some(request => request.requester_id === currentUser.id)) {
                setRequested(true)
            }
            if (currentUser && currentUser.friend_requests.some(request => request.requester_id === data.id)) {
                setFriendRequestId(currentUser.friend_requests.find(request => request.requester_id === data.id).id)
                setInverseRequested(true)
            }
        })
    }, [currentUser, params.id, params])

    function addFriend() {
        console.log('clicked')
        fetch('/friend_requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requester_id: currentUser.id,
                requestee_id: user.id
            })
        })
        .then(resp => resp.json())
        .then(() => setRequested(true))
    }

    function cancelRequest() {
        console.log(currentUser)
        console.log(user)
        fetch(`/cancel_request/${currentUser.id}/${user.id}`, {
            method: 'DELETE'
        })
        .then(() => setRequested(false))
    }

    function acceptRequest() {
        fetch(`/friendships`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({friend_request_id: friendRequestId, user_id: user.id, friend_id: currentUser.id})
        })
        .then(() => {
            setFriend(true)
            setInverseRequested(false)
        })
    }

    function unfriend() {
        fetch(`/unfriend/${currentUser.id}/${user.id}`, {method: 'DELETE'})
        .then(() => {
            setFriend(false)
            setRequested(false)
            setInverseRequested(false)
            let newFriends = friendList.filter(friend => friend.id !== currentUser.id)
            setFriendList(newFriends)
        })
    }
    
    
    function generateUserPage(user){
        // let publicEvents = user.events.filter(event => event.public)
        return (
            <div>
                <h1>{user.username}'s Page</h1>
                {currentUser ? !friend ? requested ? <Button variant="primary" onClick={() => cancelRequest()}>Cancel Friend Request</Button> : inverseRequested ? <Button variant="primary" onClick={() => acceptRequest()}>Accept Friend Request</Button>: <Button variant="primary" onClick={() => addFriend()}>Add Friend</Button> : <Button variant="primary" onClick={() => unfriend()}>Unfriend</Button>:null}
                <h3>User Events</h3>
                {/* <Grid container align='center' justifyContent='center' spacing={2}>
                    {publicEvents.map(event => <Grid item xs={6} sm={3} key={event.id}><EventCard event={event}/></Grid>)}
                </Grid> */}
                <h3>User Friends</h3>
                <Grid container justifyContent='center' spacing={2}>
                    {friendList.map(friend => <Grid item xs={6} sm={3} key={friend.id}><UserCard friend={friend}/></Grid>)}
                </Grid>
            </div>
        )
    }

    return (
        <div className='pageContent'>
            {loading ? <Loading /> : generateUserPage(user)}
        </div>
    )
}
export default UserPage;