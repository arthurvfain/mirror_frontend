import {Card, Button} from 'react-bootstrap'
function FrRequest({request, rejectRequest, acceptRequest})
{
    return (
        <Card className = 'text-center' style={{ maxWidth: '18rem'  }}>
            <Card.Header as="h5">{request.requester.first_name + ' ' + request.requester.last_name} wants to be your friend !</Card.Header>
            <Card.Body>
                <Card.Text>Would you like to: </Card.Text>
                <Button variant="outline-primary" onClick={() => acceptRequest(request.id, request.requestee_id, request.requester_id)}>Accept</Button>
                <Button variant="outline-danger" onClick={() => rejectRequest(request.id)}>REJECT</Button>
            </Card.Body>
        </Card>
    )
}
export default FrRequest;