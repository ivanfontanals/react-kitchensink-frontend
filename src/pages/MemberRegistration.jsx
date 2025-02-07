import React, { useState, useEffect } from 'react';
import { registerMember, listAllMembers } from '../api/member_client';
import { Table, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../App.css';

/**
 * MemberRegistration component handles the registration of new members
 * and displays a list of registered members.
 */
const MemberRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [members, setMembers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all members when the component is mounted
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const membersList = await listAllMembers();
            setMembers(membersList);
        } catch (err) {
            setError('Failed to fetch members.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newMember = { name, email, phoneNumber };
            await registerMember(newMember);
            setMessage('Member registered successfully!');
            setError('');
            fetchMembers(); // Refresh the list of members
        } catch (err) {
            setError('Failed to register member.');
            setMessage('');
        }
    };

    return (
        <Container>
            <h1>Welcome to JBoss!!!!</h1>
            <p>You have successfully deployed a Jakarta EE Enterprise Application.</p>

            <Form onSubmit={handleRegister}>
                <h2>Member Registration</h2>
                <p>Enforces annotation-based constraints defined on the model class.</p>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Phone #:</Form.Label>
                            <Form.Control
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-3">
                    Register
                </Button>
            </Form>

            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <h2 className="mt-5">Members</h2>
            {members.length === 0 ? (
                <em>No registered members.</em>
            ) : (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone #</th>
                            <th>REST URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phoneNumber}</td>
                                <td>
                                    <a href={`http://localhost:8080/api/members/${member.id}`}>
                                        /rest/members/{member.id}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5">
                                REST URL for all members: <a href="http://localhost:8080/api/members">/rest/members</a>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )}
        </Container>
    );
};

export default MemberRegistration;