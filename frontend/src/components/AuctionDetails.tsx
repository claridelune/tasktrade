import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/authContext';

interface AuctionDetail {
    id: number;
    title: string;
    description: string;
    price: number;
    bids: {amount: number; bidderId: number}[];
}

const AuctionDetails: React.FC = () => {
    const {taskId} = useParams<{taskId: string}>();
    const [auctionDetail, setAuctionDetail] = useState<AuctionDetail | null>(null);
    const [bidAmount, setBidAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const {data} = await axios.get(`/api/auction/${taskId}`);
                setAuctionDetail(data);
            } catch (error) {
                console.error('Error fetching auction details:', error);
                setErrorMessage('Failed to fetch auction details.');
            }
        };

        fetchAuctionDetails();
    }, [taskId]);

    const handleBidSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const {data} = await axios.post(`/api/auction/${taskId}/bid`, {
                bidderId: user.id,
                amount: bidAmount,
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            setAuctionDetail(prev => {
                if (!prev) return null;

                return {
                    ...prev,
                    bids: [...prev.bids, data]
                };
            });
            setBidAmount('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error making a bid:', error);
            setErrorMessage('Failed to make a bid. Please try again.');
        }
    };

    return (
        <Container>
            {auctionDetail ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{auctionDetail.title}</Card.Title>
                        <Card.Text>{auctionDetail.description}</Card.Text>
                        <Card.Text>Starting Price: ${auctionDetail.price}</Card.Text>
                        <Card.Text>Current Highest Bid: ${Math.max(...auctionDetail.bids.map(bid => bid.amount), 0)}</Card.Text>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form onSubmit={handleBidSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Bid Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    min={0}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Make a Bid</Button>
                        </Form>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default AuctionDetails;
