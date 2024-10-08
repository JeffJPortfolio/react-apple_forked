//import 라이브러리
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/deliveryList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const DeliveryList = () => {

    const [unionList, setUnionList] = useState([]);

    /*---일반 메소드 -----------------------------*/
    const getUnionList = () => {
        axios({
            method: 'get', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/admin/dilivery`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            setUnionList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    /*---훅(useEffect)메소드-------*/
    useEffect(() => {
        console.log("마운트 됐어요");
        getUnionList(); // 서버에서 데이터 가져오기
    }, []);
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* product */}
                    <div id="product" className="clearfix">                 
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/dilivery" rel="noreferrer noopener">배송 관리</Link></li>
                                    <li><Link to="/admin/history" rel="noreferrer noopener">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                    {/* //aside */}

                    {/* 매장 리스트관련 내용 */}
                    <div id="product_area">
                        <div id="product_list" >
                            <h2>배송 관리</h2>
                             {/* 반복 구간 */}
                            {unionList.map((union) => {
                                    return (
                                        <div id="product_item" className="clearfix"  key={union.reciptNum}>
                                            <img id="sotre_Img" src={`${process.env.REACT_APP_API_URL}/upload/${union.imageSavedName}`} alt="상품이미지"/>
                                            <div className="hjy_product_info">
                                                <p><strong>모델명: </strong> {union.productName}</p>
                                                <p><strong>디스플레이: </strong> {union.displaySize}</p>
                                                <p><strong>색상: </strong> {union.colorName}</p>
                                                <p><strong>가격: </strong> {union.productPrice}</p>
                                                <p><strong>용량: </strong> {union.storageSize}</p>
                                            </div>

                                            <div className="hjy_buyer_info">
                                                <p><strong>용량: </strong> {union.shippingStatus}</p>
                                                <p><strong>구매자: </strong> {union.userName}</p>
                                                <p><strong>아이디: </strong> {union.userId}</p>
                                                <p><strong>주소: </strong> {union.userName}</p>
                                                <p><strong>연락처: </strong>{union.userHp}</p>
                                            </div>
                                            <div className="hjy_modify_btn">
                                                <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                            </div>
                                            <div className="hjy_del_btn">
                                                <button type="button">삭제</button>
                                            </div>
                                        </div>
                                    );
                                })}

                                <br />
                                {/* axios part */}


                        
                            
                            {/* //반복구간 */}
                        </div>
                        {/* //product_list */}

                    </div>
                    {/* product_area */}

                    </div>
                    {/* //product */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default DeliveryList;