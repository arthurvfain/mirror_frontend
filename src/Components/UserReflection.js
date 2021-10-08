import {useState, useEffect} from 'react'
import Loading from './Loading'


function UserReflection ({currentUser})
{
    
    const [loading, setLoading] = useState(true)
    const [reflection, setReflection] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    
    useEffect(() => {
        // fetch(`https://fierce-everglades-57964.herokuapp.com/friendships/${currentUser.id}`).then(r=>r.json()).then(data=>{
        fetch(`http://localhost:3000/reflections/${currentUser.id}`).then(r=>r.json()).then(data=>{
            console.log(data)
            // console.log(((data[0]+10)/20)*100)
            setReflection(data)
            setLoading(false)
        })
        
    }, [])

    useEffect(() => {
        window.addEventListener("resize", () => setWindowSize(window.innerWidth));
        // console.log(windowSize)
    }, [])
    // console.log('from UsersReflection' + currentUser)

    function generateReflection()
    {
        return(
            <>
                <h1>Reflection</h1>

                    <div justifyContent='center'>
                        <img src='/Openness.png' alt='Openness' style={{position: 'static', width: '800px'}}/>
                        <img src='/uparrow.png' alt='uparrow' style={{width: '40px', position: 'absolute', right: `${((windowSize/2)-20)-(reflection[0]/9)*(-320)}px`, top: '250px'}}/>
                    </div>
                    <div>
                        <img src='/Conscientiousness.png' alt='Conscientiousness' style={{width: '800px'}}/>
                        <img src='/uparrow.png' alt='uparrow' style={{width: '40px', position: 'absolute', right: `${((windowSize/2)-20)-(reflection[1]/9)*(-320)}px`, top: '395px'}}/>
                    </div>
                    <div>
                        <img src='/Extraversion.png' alt='Extraversion' style={{width: '800px'}}/>
                        <img src='/uparrow.png' alt='uparrow' style={{width: '40px', position: 'absolute', right: `${((windowSize/2)-20)-(reflection[2]/9)*(-320)}px`, top: '540px'}}/>
                    </div>
                    <div>
                        <img src='/Agreeableness.png' alt='Agreeableness' style={{width: '800px'}}/>
                        <img src='/uparrow.png' alt='uparrow' style={{width: '40px', position: 'absolute', right: `${((windowSize/2)-20)-(reflection[3]/9)*(-320)}px`, top: '680px'}}/>
                    </div>
                    <div>
                        <img src='/Neuroticism.png' alt='Neuroticism' style={{width: '800px'}}/>
                        <img src='/uparrow.png' alt='uparrow' style={{width: '40px', position: 'absolute', right: `${((windowSize/2)-20)-(reflection[4]/9)*(-320)}px`, top: '815px'}}/>
                    </div>
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