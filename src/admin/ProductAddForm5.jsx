import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/reset.css';
import '../css/productAddForm5.css';
import Header from '../include/Header';
import Footer from "../include/Footer";

const ProductAddForm5 = () => {
    const [seriesNum, setSeriesNum] = useState('');
    const [seriesList, setSeriesList] = useState([]); // 시리즈 목록 상태
    const [productNum, setProductNum] = useState(''); 
    const [productList, setProductList] = useState([]); 
    const [storageSize, setStorageSize] = useState('');
    const [storageList, setStorageList] = useState([]); 
    const [isSeriesSelected, setIsSeriesSelected] = useState(false); // 시리즈가 선택되었는지 여부
    const [selectedSeriesName, setSelectedSeriesName] = useState(''); // 선택한 시리즈명 저장

    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 추가
    const authUser = JSON.parse(localStorage.getItem('authUser'));  // authUser 정보 가져오기

    // 관리자인지 확인하여 관리자 아닌 경우 리다이렉트
    useEffect(() => {
        if (!authUser || authUser.userStatus !== '관리자') {
            // alert("관리자만 접근할 수 있습니다.");
            navigate("/");  // 메인 페이지로 리다이렉트
        }
    }, [authUser, navigate]);

    // 시리즈 선택 시 상품 목록 불러오기
    const handleSeriesChange = (e) => {
        const selectedSeriesNum = e.target.value;
        setSeriesNum(selectedSeriesNum);

        // 선택한 시리즈명 찾기
        const selectedSeries = seriesList.find(series => series.seriesNum === parseInt(selectedSeriesNum));
        if (selectedSeries) {
            setSelectedSeriesName(selectedSeries.seriesName);
        }

        setIsSeriesSelected(!!selectedSeriesNum); // 시리즈가 선택되면 true, 아니면 false
        getProductList(selectedSeriesNum);  
        getStorageList(selectedSeriesNum);  
    };

    const handleStorageSize = (e) => {
        setStorageSize(e.target.value);
    }

    // 시리즈 목록을 가져오는 함수
    const getSeriesList = () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/series`,
            responseType: 'json',
        }).then(response => {
            setSeriesList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 상품명 목록을 가져오는 함수
    const getProductList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/product/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            setProductList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    // 용량 목록을 가져오는 함수
    const getStorageList = (seriesNum) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/storages/${seriesNum}`,
            responseType: 'json',
        }).then(response => {
            setStorageList(response.data.apiData); // 응답 데이터로 시리즈 목록 설정
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // 컴포넌트가 마운트되면 시리즈 리스트 가져오기
        getSeriesList();
    }, []);

    // 시리즈가 '악세사리'일 때 자동으로 N/A 설정
    useEffect(() => {
        if (selectedSeriesName === '악세사리') {
            setStorageSize('N/A');
        } else {
            setStorageSize('');
        }
    }, [selectedSeriesName]);

    // 용량 등록
    const handleSubmit = async (e) => {
        e.preventDefault();

    // 필수 입력값 확인
    const requiredFields = [
        { value: seriesNum, message: "시리즈를 선택해주세요." },
        { value: productNum, message: "상품명을 선택해주세요." },
        { value: storageSize, message: "용량을 입력해주세요." }
    ];

    // 첫 번째로 비어있는 필드를 찾아서 경고를 띄우고 제출 중단
    for (let field of requiredFields) {
        if (!field.value || field.value.trim() === "") {
            alert(field.message);
            return; // 값이 없으면 제출 중단
        }
    }
        
        const storageVo = {
            productNum: productNum,
            seriesNum: seriesNum,
            storageSize: storageSize
        }

        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/add/storage`,
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
            data: storageVo,
        
            responseType: 'json' //수신타입
          }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data); //수신데이타
        
            if(response.data.result === 'success') {
                setIsSeriesSelected(false); // 리스트 숨기기
                setSeriesNum(''); // 선택 필드 초기화
                setProductNum(''); // 선택 필드 초기화
                setStorageSize(''); // 입력 필드 초기화
            } else {
                alert("등록 실패");
            }
              
          }).catch(error => {
            console.log(error);
        }); 
        
    }

    // 용량 삭제
    const handleStorageDelete = (storageNum) => {
        // 삭제 확인 메시지
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;
    
        // axios 요청으로 서버에 삭제 요청 보내기
        axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/api/delete/storage/${storageNum}`,
            responseType: 'json',
        })
        .then((response) => {
            if (response.data.result === 'success') {
                alert("삭제되었습니다.");
                // 삭제 후 UI 업데이트 (필요하다면 데이터 다시 불러오기)
                let newArray = storageList.filter((storage) => (
					storage.storageNum !== storageNum
				));

                setStorageList(newArray);
            } else {
                alert(response.data.message); // 서버에서 반환된 메시지를 사용자에게 알림
            }
        })
        .catch((error) => {
            console.error("삭제 요청 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
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
                                    <li><Link to="/admin/delivery">배송 관리</Link></li>
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
                                    <p>용량 등록</p>
                                    <div className="hjy_product_content">
                                        <label htmlFor="product_series">시리즈:</label>
                                            <select id="product_series" value={seriesNum} onChange={handleSeriesChange}>
                                                <option value="">선택하세요</option>
                                                {seriesList.map((series) => (
                                                    <option key={series.seriesNum} value={series.seriesNum}>
                                                        {series.seriesName}
                                                    </option>
                                                ))}
                                            </select>  
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_productName">상품명:</label>
                                            <select id="product_productName" value={productNum} onChange={(e) => setProductNum(e.target.value)}>
                                                <option value="">선택하세요</option>
                                                {productList.map((product) => (
                                                    <option key={product.productNum} value={product.productNum}>
                                                        {product.productName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="hjy_product_content">
                                            <label htmlFor="product_storage">용량:</label>
                                            <input 
                                                type="text" 
                                                id="product_storage" 
                                                value={storageSize}
                                                placeholder="용량을 입력하세요"
                                                onChange={handleStorageSize}
                                                disabled={selectedSeriesName === '악세사리'} // 악세사리일 때 입력 비활성화
                                            />
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

                        {/* 시리즈가 선택되었을 때만 테이블 표시 */}
                        {isSeriesSelected && (
                            <div className="hjy-seriesList">
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '70px' }}>Storage Number</th>
                                            <th style={{ width: '100px' }}>Series Name</th>
                                            <th style={{ width: '280px' }}>Product Name</th>
                                            <th colSpan={3}>Storage Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {storageList.map((storage, index) => (
                                            <tr key={index}>
                                                <td>{storage.storageNum}</td>
                                                <td>{storage.seriesName}</td>
                                                <td>{storage.productName}</td>
                                                <td>{storage.storageSize}</td>
                                                <td style={{ width: '40px' }} className="hjy-action-btn"><Link to="/#">수정</Link></td>
                                                <td style={{ width: '40px' }} className="hjy-action-btn"><button type="button" onClick={() => handleStorageDelete(storage.storageNum)}>삭제</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ProductAddForm5;
