import React, { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import StatusCodes from "../utils/StatusCodes";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [show, setShow] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const handleAddToCart = (item) => {
        dispatch(add(item));
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

    if(products.status === StatusCodes.LOADING) {
        return <h3 style={{padding: "4rem 0 0"}}>Loading...</h3>
    }

    if(products.status === StatusCodes.ERROR) {
        return <Alert variant="danger">Something went wrong! Please try later.</Alert>
    }

    const cards = products.data.map((item) => {
        return (
            <div key={item.id} className="col-md-3" style={{marginBottom: "10px"}}>
                <Card key={item.id} className="h-100">
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
                        <Button variant="primary" onClick={() => handleAddToCart(item)}>
                            Add To Cart
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    })
    
    console.log(timeoutId);
    return (
        <div style={{padding: "4rem 0 0"}}>
            <Alert show={show} key="success" variant="success" onClose={() => handleCloseAlert()} dismissible>
                Product added successfully!
            </Alert>
            <h2 style={{padding: "0rem 0 1rem"}}>Product Dashboard</h2>
            <div className="row">
                {cards}
            </div>
        </div>
    );
}

export default Products;