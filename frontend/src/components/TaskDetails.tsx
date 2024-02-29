import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/authContext';

interface Task {
  id: number;
  title: string;
  description: string;
  price: number;
}

const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/task/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setErrorMessage('Failed to fetch task details.');
      }
    };

    fetchTask();
  }, [taskId]);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/purchase', {
        taskId: task?.id,
        bidderId: user.id,
        amount: task?.price,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/');
    } catch (error) {
      console.error('Error making purchase:', error);
      setErrorMessage('Failed to make purchase. Please try again.');
    }
  };

  if (errorMessage) {
    return <Alert variant="danger">{errorMessage}</Alert>;
  }

  return (
    <Container>
      {task ? (
        <Card>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Card.Text>${task.price}</Card.Text>
            <Button variant="primary" onClick={handlePurchase}>Buy Now</Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default TaskDetails;
