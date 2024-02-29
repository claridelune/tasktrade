import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

interface TaskInCar {
  id: number;
  title: string;
  price: number;
}

const Car: React.FC = () => {
  const [carItems, setCarItems] = useState<TaskInCar[]>([]);

  useEffect(() => {
    // Aquí deberías cargar los ítems del carrito, ya sea desde el estado global de la aplicación, localStorage, o una API
    // Por ahora, vamos a usar datos de ejemplo
    const itemsInCar: TaskInCar[] = [
      { id: 1, title: 'Tarea de Matemáticas', price: 10 },
      { id: 2, title: 'Ensayo de Historia', price: 20 },
    ];
    setCarItems(itemsInCar);
  }, []);

  const handleRemoveFromCar = (taskId: number) => {
    setCarItems(carItems.filter(item => item.id !== taskId));
  };

  const handleCheckout = () => {
    // Aquí implementarías la lógica para proceder al pago
    console.log('Procediendo al pago con los ítems del carrito');
  };

  const calculateTotal = () => {
    return carItems.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <Container>
      <h2>Car</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveFromCar(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <h4>Total: ${calculateTotal()}</h4>
        <Button variant="success" onClick={handleCheckout}>
          Pay
        </Button>
      </div>
    </Container>
  );
};

export default Car;
