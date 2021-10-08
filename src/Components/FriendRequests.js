import Loading from './Loading'
import FrRequest from './FrRequest'
import {useState, useEffect} from 'react'
import { Grid }  from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function FriendRequests({currentUser}) {
    
    const [loading, setLoading] = useState(true)
    const [friendRequests, setFriendRequests] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:3000/friend_requests/${currentUser.id}`).then(r=>r.json()).then(data=>{
            setFriendRequests(data)
            setLoading(false)
        })
        
    }, [])

    function acceptRequest(id, requesteeId, requesterId) {
        fetch(`http://localhost:3000/friendships`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({friend_request_id: id, user_id: requesteeId, friend_id: requesterId})
        })
        .then(resp => resp.json())
        .then(() => {
            let newFriendRequests = friendRequests.filter(req => req.id !== id)
            setFriendRequests(newFriendRequests)
        })
    }

    function rejectRequest(id) {
        fetch(`http://localhost:3000/friend_requests/${id}`, {
            method: 'DELETE'
        })
        // .then(resp => resp.json())
        .then(() => {
            let newFriendRequests = friendRequests.filter(req => req.id !== id)
            setFriendRequests(newFriendRequests)
        })
    }

    return (
    <>
    <h1>Friend Requests</h1>
    {loading ? <Loading /> : friendRequests.length > 0 ? <Grid container align='center' justifyContent='center' spacing={2}>{friendRequests.map(request => <Grid item xs={6} sm={3} key={request.id}><FrRequest request={request} rejectRequest={rejectRequest} acceptRequest={acceptRequest}/></Grid>)}</Grid> : <LinkContainer to='/user_list'><Button variant='secondary'>Get Out There !</Button></LinkContainer>}
    </>
    )
}
export default FriendRequests