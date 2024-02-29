import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  description: string;
  price: number;
  status: 'AVAILABLE' | 'SOLD' | 'AUCTION';
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('/api/task');
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Container>
      <Row>
        {tasks.map((task) => (
          <Col key={task.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>${task.price}</Card.Text>
                {task.status === 'AVAILABLE' && (
                  <Button variant="primary" onClick={() => navigate(`/task/${task.id}`)}>Buy</Button>
                )}
                {task.status === 'AUCTION' && (
                  <Button variant="warning" onClick={() => navigate(`/auction/${task.id}`)}>Make a Bid</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
