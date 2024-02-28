import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [ownerID, setOwnerId] = useState('');
    const [startingBid, setStartingBid] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwnerId = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/user/currentUser')
                setOwnerId(response.data.ownerID);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOwnerId();
    },
    []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/task', {
                title,
                description,
                status,
                category,
                ownerID: Number(ownerID),
                startingBid: Number(ownerID),
            });

            navigate('/');
        } catch (err) {
            console.error(err);
            // Manejar el error adecuadamente (mostrar mensaje al usuario, etc.)
        }
    };

    return (
        <Container>
            <h2>Add Task</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="taskTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the task's title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="taskDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Describe the task"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="taskPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Set a price"
                        value={startingBid}
                        onChange={(e) => setStartingBid(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='taskStatus'>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Sell</option>
                        <option value="Auction">Auction</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='taskCategory'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={category}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Humanities">Humanities</option>
                        <option value="Languages">Languages</option>
                        <option value="Art">Art</option>
                        <option value="Technology">Technology</option>

                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </Container>
    );
};

export default AddTask;
