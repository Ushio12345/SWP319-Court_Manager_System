import React from 'react';
import './index.css';
import '../../App.css';
import Footer from '../../components/footer/index.jsx'
import Banner from '../../components/banner';
import { Link } from 'react-router-dom'
const RoleSelector = () => {
  const handleRoleSelection = (role) => {
    alert(`Selected ${role}`);
  };
    return (
      <div>
        <div className="header-bot">
                    <Link to="/" className="active">
                        Trang Chủ
                    </Link>
                    <Link to="/about">Giới Thiệu</Link>
                    <Link to="/historyOrder">Lịch sử đặt sân</Link>
                    <Link to="/contact">Liên hệ</Link>
                    <Link to="/rules">Quy định</Link>
                </div>
        <Banner />
        <Footer />
      </div>
    );
};

export default RoleSelector;
