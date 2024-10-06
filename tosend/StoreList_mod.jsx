//import 라이브러리
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/storeList.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreList = () => {

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [storeList, setStoreList] = useState([]);

    /*---일반 메소드 -----------------------------*/
    const getStoreList = () => {
        axios({
            method: 'get', // put, post, delete                   
            url: 'http://localhost:9000/api/admin/storelist',
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log(response.data); // 수신데이터
            setStoreList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    /*---훅(useEffect)메소드-------*/
    useEffect(() => {
        console.log("마운트 됐어요");
        getStoreList(); // 서버에서 데이터 가져오기
    }, []);

    //삭제버튼 클릭했을 때
    const handleDel = (no) => {
        console.log('삭제버튼 클릭');
        console.log(no);
        axios({
            method: 'delete', // put, post, delete                   
            url: `http://localhost:9000/api/admin/storelist/${no}`,
            responseType: 'json' // 수신타입
        }).then(response => {
            console.log("===============================");
            console.log(response.data);
            console.log(response.data.result);
            console.log("===============================");

            if (response.data.result === 'success') {
                // storeList에서 삭제한 값만 제거된 새로운 배열
                let newArray = storeList.filter((store) => {
                    return store.storeNum !== no;
                });
                setStoreList(newArray);
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    };
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* store */}
                    <div id="store" className="clearfix">
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
                    <div id="store_area">
                        <div id="store_list" >
                            <div className="hjy_header_with_button">
                                <h2>매장 관리</h2>
                                <button type="button" className="hjy_add_product_btn"><Link to="/admin/store/add" rel="noreferrer noopener">매장 등록</Link></button>
                            </div>
                            {/* 반복 구간 */}
                                                           {/* axios part */}
                                                           {storeList.map((jStoreVo) => {
                                    return (
                                        <div key={jStoreVo.storeNum}>
                                            {/* 반복 구간 */}
                                            <div id="store_item" className="clearfix">
                                                <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어" />
                                                <div className="hjy_store_info">
                                                    <p>
                                                        <strong>이름: {jStoreVo.storeNum}</strong> {jStoreVo.storeName}
                                                    </p>
                                                    <p>
                                                        <strong>주소: </strong> {jStoreVo.storeAddress}
                                                    </p>
                                                    <p>
                                                        <strong>전화번호: </strong> {jStoreVo.storeNumber}
                                                    </p>
                                                </div>
                                                <div className="hjy_modify_btn">
                                                    <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                                </div>
                                                <div className="hjy_del_btn">
                                                    <button type="button" onClick={() => handleDel(jStoreVo.storeNum)}>삭제</button>
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    );
                                })}

                                <br />
                                {/* axios part */}

                            <div id="store_item" className="clearfix" >
                                <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                <div className="hjy_store_info">
                                    <p>
                                        <strong>매장이름: </strong> Apple Store Gangnam
                                    </p>
                                    <p>
                                        <strong>주소: </strong> 464 Gangnam-daero Seoul, 06123
                                    </p>
                                    <p>
                                        <strong>매장 전화번호: </strong> 82-0805000456
                                    </p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>

                            <div id="store_item" className="clearfix" >
                                <img id="store_Img" src="/images/gangnam.jpg" alt="애플스토어"/>
                                <div className="hjy_store_info">
                                    <p>
                                        <strong>이름: </strong> Apple Store Gangnam
                                    </p>
                                    <p>
                                        <strong>주소: </strong> 464 Gangnam-daero Seoul, 06123
                                    </p>
                                    <p>
                                        <strong>전화번호: </strong> 82-0805000456
                                    </p>
                                </div>
                                <div className="hjy_modify_btn">
                                    <button type="button"><Link to="/admin/store/modify" rel="noreferrer noopener">수정</Link></button>
                                </div>
                                <div className="hjy_del_btn">
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                            {/* //반복구간 */}
                        </div>
                        {/* //store_list */}

                    </div>
                    {/* store_area */}

                    </div>
                    {/* //store */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default StoreList;
