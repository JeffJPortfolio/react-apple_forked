import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm2.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm2 = () => {
    const [seriesNum, setSeriesNum] = useState(''); // 선택한 시리즈 번호 상태
    const [productName, setProductName] = useState(''); // 상품명 상태
    const [seriesList, setSeriesList] = useState([]); // 시리즈 목록 상태
    const [mainImages, setMainImages] = useState([]); // 여러 파일을 배열로 저장

    const navigate = useNavigate();

    const handleProductName = (e) => {
        setProductName(e.target.value); // 상품명 입력 처리
    }

    const handleMainImages = (e) => {
        setMainImages([...e.target.files]); // 여러 파일을 배열로 저장
    }

    // 시리즈 목록을 가져오는 함수
    const getSeriesList = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/series`,
            responseType: 'json',
        }).then(response => {
            console.log(response.data.apiDat);
            setSeriesList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
            console.log(response.data.apiData.seriesName);
            console.log(response.data.apiData.seriesNum);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // FormData 객체 생성
        const formData = new FormData();

        // unionVo 데이터를 JSON 형태로 변환하여 FormData에 추가
        const unionVo = {
            seriesNum: seriesNum, // 시리즈 번호
            productName: productName // 상품명
        };

        // JSON 데이터를 Blob 형태로 추가
        formData.append("unionVo", new Blob([JSON.stringify(unionVo)], { type: "application/json" }));

        // 선택한 이미지 파일들을 FormData에 추가
        mainImages.forEach((file) => {
            formData.append("mainImages", file);
        });

        // Axios를 사용하여 데이터 전송
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/add/product`,
            headers: { "Content-Type": "multipart/form-data" }, // multipart/form-data 헤더 설정
            data: formData,
            responseType: 'json'
        }).then(response => {
            console.log(response); // 응답 데이터 로그
            if (response.data.result === 'success') {
                // 성공 시 리다이렉트
                navigate("/admin/product");
            } else {
                alert("등록 실패");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <Header/>

            <div id="wrap">
                <div id="contents">
                    <div id="product_add" className="clearfix">
                        <div id="asides">
                            <h2><Link to="/admin/main">관리자 페이지</Link></h2>
                            <div id="sub_list"> 
                                <ul>
                                    <li><Link to="/admin/store">매장 관리</Link></li>
                                    <li><Link to="/admin/product">상품 관리</Link></li>
                                    <li><Link to="/admin/user">유저 관리</Link></li>
                                    <li><Link to="/admin/dilivery">배송 관리</Link></li>
                                    <li><Link to="/admin/history">판매 관리</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div id="product_add_area">
                            <div id="product_new">
                            <h2 className="hjy-add-link"><Link to="/admin/product/add">시리즈 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add2">상품 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add3">색상 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add4">디스플레이 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add5">용량 등록</Link></h2>
                                    <h2 className="hjy-add-link"><Link to="/admin/product/add6">상품상세 등록</Link></h2>
                                <div id="product_add_item" className="clearfix hjy-series">
                                    <form onSubmit={handleSubmit}>
                                    <p>상품 등록</p>
                                        <div className="hjy_product_content">
                                            <label htmlFor="product_series">시리즈:</label>
                                            <select id="product_series" value={seriesNum} onChange={(e) => setSeriesNum(e.target.value)}>
                                                <option value="">선택하세요</option>
                                                {seriesList.map((series) => (
                                                    <option key={series.seriesNum} value={series.seriesNum}>
                                                        {series.seriesName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_name">상품명:</label>
                                            <input 
                                                type="text" 
                                                id="product_name" 
                                                value={productName} 
                                                placeholder="상품명을 입력하세요" 
                                                onChange={handleProductName}
                                            />
                                        </div>
                                        <div className="hjy_product_content">
                                            <label htmlFor="product_image">본문 이미지:</label>
                                            <input type="file" id="product_image" name="file" multiple onChange={handleMainImages}/>
                                        </div>
                                        <div className="hjy_product_add_btnbox">
                                            <div className="hjy_product_add_btn">
                                                <button type="submit">등록</button>
                                            </div>
                                            <div className="hjy_product_cancel_btn">
                                                <button type="button"><Link to="/admin/product">취소</Link></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProductAddForm2;
