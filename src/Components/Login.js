import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function Login({setCurrentUser}) {
    const [formData, setFormData] = useState({username: '', password: ''})
    const [error, setError] = useState('')

    let history = useHistory()

    function handleChange(e) {
        let prop = e.target.name
        let val = e.target.value

        let newData = {
            ...formData,
            [prop]: val
        }
        setFormData(newData)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        // let resp = await fetch('https://fierce-everglades-57964.herokuapp.com/sessions', {
        let resp = await fetch('http://localhost:3000/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData)
        })

        if (resp.ok) {
            setError([])
            resp.json().then(data => {
                console.log('login compnent' + data)
                setCurrentUser(data)
                history.push('/home')
            }) // TO DO: ADD REDIRECT
        } else {
            resp.json().then(data => {
                console.log(data)
                setError(data.error)})
        }
    }

    return (
        <div className='pageContent'>
            {/* <form onSubmit={handleSubmit}>
                <label>Username: <input onChange={handleChange} type='text' name='username' value={formData.username}></input></label>
                <label>Password: <input onChange={handleChange} type='password' name='password' value={formData.password}></input></label>
                <input type='submit'></input>
            </form> */}
            <Form onSubmit={handleSubmit} style={{maxWidth: '18rem', margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={handleChange} name='username' value={formData.username}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name='password' value={formData.password}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {error ? <li>{error}</li> : null}
        </div>
    )
}

export default Login