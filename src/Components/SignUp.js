import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function SignUp ({setCurrentUser}) {
    const [formData, setFormData] = useState({username: '', password: '', email: '', first_name: '', last_name: ''})
    const [errors, setErrors] = useState([])

    let history = useHistory()

    function handleChange(e) {
        let prop = e.target.name
        let val = e.target.value

        let newData = {
            ...formData,
            [prop]: val
        }
        setFormData(newData)
        // console.log(formData)
    }

    async function handleSubmit(e) {
        console.log(formData)
        e.preventDefault()
        let resp = await fetch('https://fierce-everglades-57964.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (resp.ok) {
            setErrors([])
            resp.json().then(user=>{
                setCurrentUser(user)
                history.push('/')
            })
            // TO DO: ADD REDIRECT
        } else {
            resp.json().then(data => setErrors(data.errors))
        }
    }
    return (
        <div className='pageContent'>
            <Form onSubmit={handleSubmit} style={{maxWidth: '18rem', margin: 'auto'}}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={handleChange} name='first_name' value={formData.first_name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={handleChange} name='last_name' value={formData.last_name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={handleChange} name='username' value={formData.username}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" onChange={handleChange} name='email' value={formData.email}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name='password' value={formData.password}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {errors ? errors.map(error => <li>{error}</li>) : null}
        </div>
    )
}

export default SignUp