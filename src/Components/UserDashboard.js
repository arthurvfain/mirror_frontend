// import {useState, useEffect} from 'react'

function UserDashboard({currentUser}){

    // const [loading, setLoading] = useState(true)
    // const [events, setEvents] = useState([])

    // useEffect(() => { 
    //     fetch(`/event_users/${currentUser.id}`).then(r=>r.json()).then(data=>{
    //         setEvents(data)
    //         setLoading(false)
    //     })
    // }, [])

    return (
        <div className='pageContent'>
            {/* <UserEvents loading={loading} events={events}/>
            <PendingInvitations setEvents={setEvents} events={events} currentUser={currentUser}/> */}
        </div>
    )

}
export default UserDashboard