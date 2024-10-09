import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

// css
import '../css/reset.css';
import '../css/adminMain.css';
import Header from '../include/Header'; 
import Footer from '../include/Footer';

const AdminMain = () => {
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [storeList, setStoreList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [totalPriceSum, setTotalPriceSum] = useState(0); // State for the total sum of totalPrice
    const [userCount, setUserCount] = useState(0);
    const [waitingCount, setWaitingCount] = useState(0);
    const [deliveringCount, setDeliveringCount] = useState(0);

    /*---일반 메소드 -----------------------------*/
    const getStoreList = () => {
        axios({
            method: 'get', // put, post, delete
            url: `${process.env.REACT_APP_API_URL}/api/admin/store`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            // Slice the last 3 items
            const limitedData = response.data.apiData.slice(-3);
            setStoreList(limitedData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getProductList = () => {
        axios({
            method: 'get', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/admin/product`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터

            const limitedData = response.data.apiData.slice(-3);
            setProductList(limitedData);
        }).catch(error => {
            console.log(error);
        });
    };

    const getHistoryListData = () => {
        axios({
            method: 'get', // put, post, delete
            url: `${process.env.REACT_APP_API_URL}/api/admin/history`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
    
            // Get the count based on the length of the returned array
            const count = response.data.apiData.length;
            setHistoryCount(count);
    
            // Calculate the sum of totalPrice
            const sum = response.data.apiData.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotalPriceSum(sum); // Set the state with the calculated sum
        }).catch(error => {
            console.log(error);
        });
    };

    const getDelilverListData = () => {
        axios({
            method: 'get', // put, post, delete
            url: `${process.env.REACT_APP_API_URL}/api/admin/dilivery`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            
            const filteredData1 = response.data.apiData.filter(item => item.shippingStatus === '배송 준비중');
            setWaitingCount(filteredData1.length);

            // Get the count based on the length of the returned array
            const filteredData2 = response.data.apiData.filter(item => item.shippingStatus === '배송 중');
            setDeliveringCount(filteredData2.length);
    
            // Calculate the sum of totalPrice
            const sum = response.data.apiData.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotalPriceSum(sum); // Set the state with the calculated sum

            console.log('배송 준비중:', filteredData1);
console.log('배송 중:', filteredData2);


        }).catch(error => {
            console.log(error);
        });
    };

    const getUserCount = () => {
        axios({
            method: 'get', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/admin/user`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            const count = response.data.apiData.length;
            setUserCount(count);

        }).catch(error => {
            console.log(error);
        });
    };

    /*---훅(useEffect)메소드-------*/
    useEffect(() => {
        console.log("마운트 됐어요");
        getStoreList(); // 서버에서 데이터 가져오기
        console.log("마운트 됐어요");
        getProductList(); // 서버에서 데이터 가져오기
        console.log("마운트 됐어요");
        getHistoryListData();
        console.log("마운트 됐어요");
        getUserCount();
        console.log("마운트 됐어요");
        getDelilverListData();
        

    }, []);


    

    return (
        <>
            <Header/>

            <div id="wrap">
                {/* 컨텐츠 */}
                <div id="contents" className="clearfix">
                    {/* admin_main */}
                    <div id="admin_main">
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul className='lists'>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/delivery" rel="noreferrer noopener">배송 관리</Link></li>
                                    <li><Link to="/admin/history" rel="noreferrer noopener">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* //aside */}
                        <div className="hjy-grid-container">
                            {/* User Management Summary */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>회원 관리</h3>
                                    <Link to="/admin/user" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>전체: {userCount} </p>
                                </div>
                            </div>

                            {/* Delivery Management Summary */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>배송 관리</h3>
                                    <Link to="/admin/delivery" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>배송 준비중: {waitingCount} | 배송 중: {deliveringCount}</p>
                                </div>
                            </div>

                            {/* Sales History Summary */}
                            <div className="hjy-list-section">
                                <div className="hjy-list-header">
                                    <h3>판매내역</h3>
                                    <Link to="/admin/history" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-list-status">
                                    <p>전체: {historyCount} | 총 수익: {totalPriceSum.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Store Management Summary */}
                            <div className="hjy-section">
                                <div className="hjy-header">
                                    <h3>매장 관리</h3>
                                    <Link to="/admin/store" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-brief">
                                    {storeList.map((store) => {
                                        return (
                                            <div className="hjy-card" key={store.storeNum}>
                                                <img 
                                                    id="store_Img" 
                                                    src={`${process.env.REACT_APP_API_URL}/upload/${store.storeImage}`} 
                                                    alt="애플스토어"
                                                />
                                                <div className="hjy-detail">                                                        
                                                    <p>{store.storeName}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Product Management Summary */}
                            <div className="hjy-section">
                                <div className="hjy-header">
                                    <h3>상품 관리</h3>
                                    <Link to="/admin/product" rel="noreferrer noopener">더보기</Link>
                                </div>
                                <div className="hjy-brief">
                                    {productList.map((product) => {
                                        return (
                                            <div className="hjy-card" key={product.productNum}>
                                                <img id="sotre_Img" src={`${process.env.REACT_APP_API_URL}/upload/${product.infoImageSavedName}`} alt="상품이미지"/>
                                                <div className="hjy-detail">                                                        
                                                    <p>{product.productName}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* //admin_main */}
                    </div>
                    {/* contents */}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AdminMain;
