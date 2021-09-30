import {useEffect, useState} from 'react'
import Loading from './Loading'
import UserCard from './UserCard'
import { Grid } from '@material-ui/core'

function Users({currentUser}){

    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch('/users').then(r=>r.json()).then((data) => {
            setUserList(data)
            setLoading(false)
        })
    }, [])

    const filteredUsers = userList.filter(user => user.id !== currentUser.id)

    return (
        <div className='pageContent'>
            <h1>Mirrors</h1>
            {loading ? <Loading /> : <Grid container justifyContent='center' spacing={2}>{filteredUsers.map(user => <Grid item xs={6} sm={3} key={user.id}><UserCard friend={user}/></Grid>)}</Grid>}
        </div>
    )
}
export default Users