import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import Cart from './components/Cart';
import PrivateRoute from './components/PrivateRoute';
import AuctionDetails from './components/AuctionDetails';
import TaskDetails from './components/TaskDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route element={<PrivateRoute />}>
                </Route>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-task" element={<AddTask />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/auction/:taskId" element={<AuctionDetails />} />
                    <Route path="/task/:taskId" element={<TaskDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
