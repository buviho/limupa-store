import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../../GlobalState';
import {Link} from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.paymentsAPI.callback;

    const deletePayment = async(id) => {
        try{

            const deletePayment = axios.delete(`/api/payment/${id}`, {
                headers: {Authorization: token}
            });

            await deletePayment;
            alert("Bạn đã hủy đơn hàng thành công");
            setCallback(!callback);
        }
        catch(err){
            alert(err.response.data.msg);
        }
    }

    useEffect(() => {
        if (token){
            const getHistory = async() => {
                if (isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    });
                    setHistory(res.data);
                }
                else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    });
                    setHistory(res.data);
                }
            }
            getHistory();
        }
    }, [token, isAdmin, setHistory]);
    
    return (
        <div className="history-page">
            <h2>Lịch sử mua hàng</h2>

            <h4>Bạn có {history.length} đơn hàng</h4>

            <table>
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Ngày mua</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td>{items.transaction}</td>
                                <td><Link to={`/history/${items._id}`}>Chi tiết</Link></td>
                                <td><Link to="#!" onClick={() => deletePayment(items._id)}>Hủy đơn</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;