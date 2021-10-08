import Loading from './Loading'
import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { Button } from 'react-bootstrap'

function ReflectionModule({currentUser})
{
    
    let history = useHistory()
    const params = useParams();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState('')
    const [criteria, setCriteria] = useState([])
    const [reflection, setReflection] = useState({or: '', ol: '', cr: '', cl: '', er: '', el: '', ar: '', al: '', nr: '', nl: ''})
    const [error, setError] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/reflection_gen')
        .then(r=>r.json())
        .then(data => setCriteria((Object.keys(data).map(key => [key, data[key]]))))
        setLoading(false)
        fetch(`http://localhost:3000/users/${params.id}`).then(r => r.json()).then(data => setUser(`${data.first_name +' '+ data.last_name}`))
        console.log(user)
        console.log(currentUser)
    }, [])


    function handleChange(e) {
        let prop = e.target.name
        let val = e.target.value

        let newData = {
            ...reflection,
            [prop]: val
        }
        setReflection(newData)
        // debugger
        // console.log(reflection)
    }

    async function handleSubmit(e) {
        console.log(reflection)
        e.preventDefault()
        let resp = await fetch(`http://localhost:3000/reflect/${currentUser.id}/${params.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reflection)
        })

        if (resp.ok) {
            setError([])
            resp.json().then(history.push(`/user_page/${params.id}`))
            // TO DO: ADD REDIRECT
        } else {
            resp.json().then(data => setError(data.errors))
        }
    }

    function generateReflection()
    {
        return(
            <div className='pageContent'>
                <h3>{user}'s Reflection</h3>
                <form onChange={handleChange} onSubmit={handleSubmit}>
                    <label>What do you see ?</label>
                    {criteria.map(criterion => <><h4>{criterion[1]}</h4><select className = 'custom-select' name={criterion[0]} defaultValue='default'><option disabled value='default'>---</option>{[...Array(10).keys()].map(number => <option value={number}>${number}</option>)}</select></>)}
                    
                    <Button variant="outline-secondary" as="input" type='submit' value='Reflect'/>
                </form>
            </div>
        )
    }

    return (
        <>
            {loading ? <Loading /> : generateReflection()}
            {error ? <li>{error}</li> : null}
        </>
    )
}

export default ReflectionModule;