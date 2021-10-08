// import {useState, useEffect} from 'react'
import UserReflection from './UserReflection'
import FriendRequests from './FriendRequests'

function UserDashboard({currentUser}){

    // const [loading, setLoading] = useState(true)
    // const [reflection, setReflection] = useState([])

    // useEffect(() => { 
    //     fetch(`http://localhost:3000/reflections/${currentUser.id}`).then(r=>r.json()).then(data=>{
    //         setReflection(data)
    //         setLoading(false)
    //     })
    // }, [])

    return (
        <div className='pageContent'>
            <UserReflection currentUser={currentUser}/>
            <FriendRequests currentUser={currentUser}/>
        </div>
    )

}
export default UserDashboard