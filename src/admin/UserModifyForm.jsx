//import 라이브러리
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/userModifyForm.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const UserModifyForm = () => {

    /*---라우터 관련-------------------------------*/
    const [searchParams] = useSearchParams();
    const userNum = searchParams.get('userNum');
    
    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userHp, setUserHp] = useState(''); 
    const [userAddress, setUserAddress] = useState('');

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
    const getUserList = () => {
        if (userNum) {  // storeNum이 유효한 경우에만 실행
            axios({
                method: 'get', // put, post, delete
                url: `${process.env.REACT_APP_API_URL}/api/modify/user/${userNum}`,
                responseType: 'json' // 수신타입
            }).then(response => {
                console.log(response.data); // 수신데이터 확인
    
                if(response.data.result === 'success') {
                    setUserName(response.data.apiData.userName);
                    setUserId(response.data.apiData.userId);
                    setUserPw(response.data.apiData.userPw); 
                    setUserHp(response.data.apiData.userHp); 
                    setUserAddress(response.data.apiData.userAddress); 
                } else {
                    alert("회원 정보 가져오기 실패");
                }
    
            }).catch(error => {
                console.log(error);
            });
        }
    }
    // 파라미터로 유저 정보 가져오기
    useEffect(() => {
        getUserList();
    }, [userNum]);

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleUserId = (e) => {
        setUserId(e.target.value);
    }

    const handleUserPw = (e) => {
        setUserPw(e.target.value);
    }

    const handleUserHp = (e) => {
        setUserHp(e.target.value);
    }

    const handleUserAddress = (e) => {
        setUserAddress(e.target.value);
    }

    // 회원 정보 수정
    const handleSubmit = (e) => {
        e.preventDefault();

        const userVo = {
            userNum: userNum,
            userName: userName,
            userId: userId,
            userPw: userPw,
            userHp: userHp,
            userAddress: userAddress
        }

        // Axios를 사용하여 데이터 전송
        axios({
            method: 'put', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/update/user/${userNum}`,
            headers: { "Content-Type": "application/json; charset=utf-8" }, 
            data: userVo,           // 첨부파일  multipart방식
            responseType: 'json' //수신타입
        }).then(response => {
            if (response.data.result === 'success') {
                // 리다이렉트
                navigate(`/admin/user`);
                getUserList();
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
                    {/* user_modify */}
                    <div id="user_modify" className="clearfix">
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

                    {/* 유저 정보 수정폼 */}
                    <div id="user_modify_area">
                        <div id="user_infos" >
                            <h2>유저 상세 정보</h2>
                            <div id="user_modify_item" className="clearfix" >
                                <form action="" method="" onSubmit={handleSubmit} >
                                    <div className="hjy_user_detail">
                                        <label htmlFor="user_name">이름:</label>
                                        <input type="text" id="user_name" name="" value={userName} onChange={handleUserName}/>
                                    </div>
                                    <div className="hjy_user_detail">
                                        <label htmlFor="user_id">아이디:</label>
                                        <input type="text" id="user_id" name="" value={userId} onChange={handleUserId}/>
                                    </div>
                                    <div className="hjy_user_detail">
                                        <label htmlFor="user_pw">패스워드:</label>
                                        <input type="password" id="user_pw" name="" value={userPw} onChange={handleUserPw}/>
                                    </div>
                                    <div className="hjy_user_detail">
                                        <label htmlFor="user_number">전화번호:</label>
                                        <input type="text" id="user_number" name="" value={userHp} onChange={handleUserHp}/>
                                    </div>
                                    <div className="hjy_user_detail">
                                        <label htmlFor="user_address">주소:</label>
                                        <input type="text" id="user_address" name="" value={userAddress} onChange={handleUserAddress}/>
                                    </div>
                                    <div className="hjy_user_modify_btnbox">
                                        <div className="hjy_user_modify_btn">
                                            <button type="submit">수정</button>
                                        </div>
                                        <div className="hjy_user_cancel_btn">
                                            <button type="button"><Link to="/admin/user" rel="noreferrer noopener">취소</Link></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* //user_infos */}

                    </div>
                    {/* user_modify_area */}

                    </div>
                    {/* //user_modify */}
                    
                </div>
                {/* contents */}

            </div>
            <Footer/>
        </>
    );
}
export default UserModifyForm;