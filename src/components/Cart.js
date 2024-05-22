import React, { useEffect, useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { remove } from '../store/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart);
    const [show, setShow] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    
    const handleRemoveItem = (id) => {
        dispatch(remove(id));
        setShow(true);
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setShow(false);
        }, 6000);
        setTimeoutId(newTimeoutId);
    }

    const handleCloseAlert = () => {
        setShow(false);
    }

    if(cartData.length === 0) {
        return <div style={{padding: "4rem 0 0", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h2>Cart is empty</h2>
        </div>
    }
    
    return (
        <div style={{padding: "4rem 0 0"}}>
            <Alert show={show} key="success" variant="success" onClose={() => handleCloseAlert()} dismissible>
                Product removed successfully!
            </Alert>
            <h2 style={{padding: "0rem 0 1rem"}}>Cart</h2>
            <div className='row'>
                {cartData.map((item) => (
                    <div key={item.id} className="col-md-3" style={{marginBottom: "10px"}}>
                        <Card className="h-100">
                            <div className="text-center">
                                <Card.Img variant="top" src={item.image} style={{width: "100px", height: "130px"}} />
                            </div>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                INR: {item.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: "#fff"}}>
                                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                    Remove
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart; 