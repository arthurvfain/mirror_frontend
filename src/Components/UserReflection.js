import {useState, useEffect} from 'react'
import Loading from './Loading'


function UserReflection ({currentUser})
{
    
    const [loading, setLoading] = useState(true)
    const [reflection, setReflection] = useState([])
    
    useEffect(() => {
        // fetch(`https://fierce-everglades-57964.herokuapp.com/friendships/${currentUser.id}`).then(r=>r.json()).then(data=>{
        fetch(`http://localhost:3000/reflections/${currentUser.id}`).then(r=>r.json()).then(data=>{
            console.log(data[0])
            console.log(((data[0]+10)/20)*100)
            setReflection(data)
            setLoading(false)
        })
        
    }, [])
    console.log('from UsersReflection' + currentUser)

    function generateReflection()
    {
        return(
            <>
                <h1>Reflection</h1>

                    <img src='/Openness.png' alt='Openness' style={{width: '100%'}}/>
                    <img src='/uparrow.png' alt='uparrow' style={{width: '5%', position: 'absolute', right: `${((reflection[0]+10)/20)*100}%`, top: '26%'}}/>

                    <img src='/Conscientiousness.png' alt='Conscientiousness' style={{width: '100%'}}/>
                    <img src='/uparrow.png' alt='uparrow' style={{width: '5%', position: 'absolute', right: `${((reflection[1]+10)/20)*100}%`, top: '38%'}}/>

                    <img src='/Extraversion.png' alt='Extraversion' style={{width: '100%'}}/>
                    <img src='/uparrow.png' alt='uparrow' style={{width: '5%', position: 'absolute', right: `${((reflection[2]+10)/20)*100}%`, top: '50%'}}/>

                    <img src='/Agreeableness.png' alt='Agreeableness' style={{width: '100%'}}/>
                    <img src='/uparrow.png' alt='uparrow' style={{width: '5%', position: 'absolute', right: `${((reflection[3]+10)/20)*100}%`, top: '62%'}}/>

                    <img src='/Neuroticism.png' alt='Neuroticism' style={{width: '100%'}}/>
                    <img src='/uparrow.png' alt='uparrow' style={{width: '5%', position: 'absolute', right: `${((reflection[4]+10)/20)*100}%`, top: '74%'}}/>
            </>
        )
    }
    return (
        <div className = 'pageContent'>
            {loading ?  <Loading/> : generateReflection()}
        </div>
    )
}

export default UserReflection;