import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

interface TaskInCart {
  id: number;
  title: string;
  price: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<TaskInCart[]>([]);

  useEffect(() => {
    // Aquí deberías cargar los ítems del carrito, ya sea desde el estado global de la aplicación, localStorage, o una API
    // Por ahora, vamos a usar datos de ejemplo
    const itemsInCart: TaskInCart[] = [
      { id: 1, title: 'Tarea de Matemáticas', price: 10 },
      { id: 2, title: 'Ensayo de Historia', price: 20 },
    ];
    setCartItems(itemsInCart);
  }, []);

  const handleRemoveFromCart = (taskId: number) => {
    setCartItems(cartItems.filter(item => item.id !== taskId));
  };

  const handleCheckout = () => {
    // Aquí implementarías la lógica para proceder al pago
    console.log('Procediendo al pago con los ítems del carrito');
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <Container>
      <h2>Carrito</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <h4>Total: ${calculateTotal()}</h4>
        <Button variant="success" onClick={handleCheckout}>
          Pagar
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
