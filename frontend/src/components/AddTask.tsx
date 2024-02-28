import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Asegúrate de actualizar la URL según tu configuración de backend
      await axios.post('http://localhost:3001/api/task', {
        title,
        description,
        price: Number(price),
      });

      // Redireccionar al dashboard tras la creación exitosa
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default AddTask;
