import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../../GlobalState';
import axios from 'axios';
import PayPalButton from './PayPalButton';

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total);
        }

        getTotal();

    }, [cart]);

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1;
                if (item.quantity > item.exist){
                    alert("Cửa hàng không đủ số lượng sản phẩm yêu cầu");
                    item.quantity = item.exist;
                }
            }
        })

        setCart([...cart]);
        addToCart(cart);
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })

        setCart([...cart]);
        addToCart(cart);
    }

    const removeProduct = id => {
        if (window.confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")){
            cart.forEach((item, index) => {
                if (item._id === id){
                    cart.splice(index, 1);
                }
            })

            setCart([...cart]);
            addToCart(cart);
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        const transaction = "Đã thanh toán";

        await axios.post('/api/payment', {cart, paymentID, address, transaction}, {
            headers: {Authorization: token}
        })

        setCart([]);
        addToCart([]);
        alert("Bạn đã lên đơn hàng thành công");   
    }

    const isShipping = async() => {
        const paymentID = "Giao hàng tận nơi"

        const transaction = "Đang giao hàng";

        await axios.post('/api/payment', {cart, paymentID, transaction}, {
            headers: {Authorization: token}
        })

        setCart([]);
        addToCart([]);
        alert("Bạn đã lên đơn hàng thành công");   
    }

    if (cart.length === 0)
        return <h3 style={{textAlign: 'center'}}>Không có sản phẩm nào trong giỏ hàng</h3>

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>
                            <span>{product.price} VND</span>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div className="delete" 
                                onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Thành tiền: {total} VND</h3>
                <PayPalButton 
                    total={total} 
                    tranSuccess={tranSuccess} />
                <button id="btn_ship" onClick={() => isShipping()}>Đặt hàng</button>
            </div>
        </div>
    );
}

export default Cart;