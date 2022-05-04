import { useEffect, useState } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (token){
            const getUser = async() => {
                try{
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    setCart(res.data.cart);
                }
                catch(err){
                    alert(err.response.data.msg);
                }
            }

            getUser()
        }
    }, [token])
    
    const addCart = async(product) => {
        if (!isLogged) return alert("Đăng nhập để mua hàng");

        const check = cart.every(item => {
            return item._id !== product._id;
        })
        
        if(check){
            if (product.exist < 1) {
                return alert("Cửa hàng không còn sản phẩm này");
            }
            else{
                setCart([...cart, {...product, quantity: 1}]);
    
                await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                    headers: {Authorization: token}
                }) 
            }
        }
        else{
            alert("Sản phẩm này đã có trong giỏ hàng");
        }
    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI;