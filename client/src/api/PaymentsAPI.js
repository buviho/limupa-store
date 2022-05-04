import {useState, useEffect} from 'react';
import axios from 'axios';

function PaymentsAPI(){
    const [payments, setPayments] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getPayments = async () => {
            const res = await axios.get('/api/payment');
            setPayments(res.data);
        }
        getPayments();
    }, [callback])

    return{
        payments: [payments, setPayments],
        callback: [callback, setCallback]
    }
}

export default PaymentsAPI;