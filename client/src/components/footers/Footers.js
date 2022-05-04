import React from 'react';

function Footers() {
    return (
        <footer>
            <div className="footer-content">
                <img src="./icon/jaguar_logo.png" alt=""/>
                <h3>Limupa Store</h3>
                <p>Limupa Store - cửa hàng công nghệ ra mắt từ tháng 4 năm 2022, với mục tiêu mang đến cho khách hàng dịch vụ tốt nhất và những sản phẩm công nghệ, kỹ thuật số chất lượng cao nhất.</p>
                <ul className="socials">
                    <li><a href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i></a></li>
                    <li><a href="https://twitter.com/?lang=vi"><i class="fa-brands fa-twitter"></i></a></li>
                    <li><a href="https://mail.google.com/"><i class="fa-brands fa-google-plus"></i></a></li>
                    <li><a href="https://youtube.com/"><i class="fa-brands fa-youtube"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>© 2022 Ecommerce Website Created & Developed By: Bui Van Viet Hoang.</p>
                
            </div>

    </footer>
    );
}

export default Footers;