//import 라이브러리
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/storeModifyForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const StoreModifyForm = () => {

    /*---라우터 관련-------------------------------*/
    const [searchParams] = useSearchParams();
    const storeNum = searchParams.get('storeNum');
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [storeImg, setstoreImg] = useState(); 
    const [mapImg, setMapImg] = useState();

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            // alert("관리자만 접근할 수 있습니다.");
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const getStoreList = () => {
        if (storeNum) {  // storeNum이 유효한 경우에만 실행
            axios({
                method: 'get', // put, post, delete
                url: `${process.env.REACT_APP_API_URL}/api/modify/store/${storeNum}`,
                responseType: 'json' // 수신타입
            }).then(response => {
                console.log(response.data); // 수신데이터 확인
    
                if(response.data.result === 'success') {
                    setStoreName(response.data.apiData.storeName);
                    setStoreAddress(response.data.apiData.storeAddress); // storeAddress로 수정
                    setStoreNumber(response.data.apiData.storeNumber); // storeNumber로 수정
                } else {
                    alert("매장 정보 가져오기 실패");
                }
    
            }).catch(error => {
                console.log(error);
            });
        }
    }
    // 파라미터로 매장 정보 가져오기
    useEffect(() => {
        getStoreList();
    }, [storeNum]);  // storeNum이 변경될 때만 useEffect 재실행
    
    const handleStoreName = (e) => {
        setStoreName(e.target.value);
    }

    const handleStoreAddress = (e) => {
        setStoreAddress(e.target.value);
    }

    const handleStoreNumber = (e) => {
        setStoreNumber(e.target.value);
    }

    //파일 선택
    const handleStoreImg = (e) => {
        setstoreImg(e.target.files[0]);
    }

    //파일 선택
    const handleMapImg = (e) => {
        setMapImg(e.target.files[0]);
    }

    // 매장 수정
    const handleSubmit = (e) => {
        e.preventDefault();

        // FormData 생성
        const formData = new FormData();
        formData.append("storeNum", storeNum);
        formData.append("storeName", storeName);
        formData.append("storeAddress", storeAddress);
        formData.append("storeNumber", storeNumber);
        formData.append("storeFile", storeImg);
        formData.append("mapFile", mapImg);

        // Axios를 사용하여 데이터 전송
        axios({
            method: 'put', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/update/store/${storeNum}`,
            headers: { "Content-Type": "multipart/form-data" }, //첨부파일
            data: formData,           // 첨부파일  multipart방식
            responseType: 'json' //수신타입
        }).then(response => {
            if (response.data.result === 'success') {
                // 리다이렉트
                navigate(`/admin/store`);
                getStoreList();
            } else {
                alert("수정 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }
    
    return (
        <>
            <Header/>

            <div id="wrap">

                {/* 컨텐츠 */}
                <div id="contents">
                    {/* store_modify */}
                    <div id="store_modify" className="clearfix">
                        {/* aside */}
                        <div id="asides">
                            <h2><Link to="/admin/main" rel="noreferrer noopener">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store" rel="noreferrer noopener">매장 관리</Link></li>
                                    <li><Link to="/admin/product" rel="noreferrer noopener">상품 관리</Link></li>
                                    <li><Link to="/admin/user" rel="noreferrer noopener">유저 관리</Link></li>
                                    <li><Link to="/admin/delivery" rel="noreferrer noopener">배송 관리</Link></li>
                                    <li><Link to="/admin/history" rel="noreferrer noopener">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                    {/* //aside */}

                    {/* 매장 정보 수정폼 */}
                    <div id="store_modify_area">
                        <div id="store_infos" >
                            <h2>매장 상세 정보</h2>
                            <div id="store_modify_item" className="clearfix" >
                                <form action="" method="" onSubmit={handleSubmit}>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_name">이름:</label>
                                        <input type="text" id="store_name" name="" value={storeName} onChange={handleStoreName}/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_address">주소:</label>
                                        <input type="text" id="store_address" name="" value={storeAddress} onChange={handleStoreAddress}/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_number">전화번호:</label>
                                        <input type="text" id="store_number" name="" value={storeNumber} onChange={handleStoreNumber}/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_image">매장 이미지:</label>
                                        <input type="file" id="store_image" name="file" onChange={handleStoreImg}/>
                                    </div>
                                    <div className="hjy_store_detail">
                                        <label htmlFor="store_map">지도 이미지:</label>
                                        <input type="file" id="store_map" name="file" onChange={handleMapImg}/>
                                    </div>
                                    <div className="hjy_store_modify_btnbox">
                                        <div className="hjy_store_modify_btn">
                                            <button type="submit">수정</button>
                                        </div>
                                        <div className="hjy_store_cancel_btn">
                                            <button type="button"><Link to="/admin/store" rel="noreferrer noopener">취소</Link></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* //store_infos */}

                    </div>
                    {/* store_modify_area */}

                    </div>
                    {/* //store_modify */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default StoreModifyForm;
