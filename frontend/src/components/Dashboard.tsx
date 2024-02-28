import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Asegúrate de actualizar la URL según tu configuración de backend
        const res = await axios.get(`http://localhost:3001/api/task?page=${currentPage}&limit=${tasksPerPage}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        {tasks.map((task) => (
          <Col key={task.id} sm={12} md={6} lg={4} xl={3}>
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>${task.price}</Card.Text>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-3">
        <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        {' '}
        <Button variant="secondary" onClick={handleNextPage}>
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;
