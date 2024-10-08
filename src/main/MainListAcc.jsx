import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';

import '../css/mainList.css';

// Define the feature data for each product
const featuresData = {
    
};

const MainList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [acc, setAcc] = useState([]);
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Handle modal open
    const handleModalOpen = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Handle modal toggle classes
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('yc-modal-open');
        } else {
            document.body.classList.remove('yc-modal-open');
        }
    }, [isModalOpen]);

    // Fetching product data from API
    useEffect(() => {
        
        
    }, []);

    // Function to navigate to purchase page
    const handleProductClick = (productDetailNum) => {
        navigate(`/purchase/${productDetailNum}`);
    };

    return (
        <>
            <Header />
            <div className="wrap">
                {/* Main Banner */}
                <div className="yc-main-banner">
                    <h1>iPhone 쇼핑하기</h1>
                    <p>가장 최신의 iPhone을 만나보세요.</p>
                </div>

                {/* Navigation Links */}
                <nav className="yc-product-navigation">
                    <Link to="/models">모든 모델</Link>
                    <Link to="/discounts">각종 할인 방법</Link>
                    <Link to="/guide">쇼핑 안내</Link>
                    <Link to="/accessories">액세서리</Link>
                    <Link to="/support">설정 및 지원</Link>
                    <Link to="/experience">iPhone 경험</Link>
                    <Link to="/special-discounts">특별 할인</Link>
                </nav>

                {/* Category Section */}
                <div className="yc-category-section">
                    {/* Show loading or error message */}
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            {/* Category 1: PRO & PRO MAX */}
                            <div className="yc-category">
                                <h2>PRO & PRO MAX</h2>
                                <div className="yc-scroll-container">
                                    <div className="yc-product-list">
                                        {proAndProMaxProducts.map(product => (
                                            <div
                                                className="yc-product-card"
                                                key={product.productDetailNum}
                                                onClick={() => handleProductClick(product.productDetailNum)}  // Navigate to purchase page
                                            >
                                                <span className="yc-new-label">NEW</span>
                                                <h3>{product.productName}</h3>
                                                <img src={product.mainImages || "https://via.placeholder.com/300"} alt={product.productName} />

                                                <div className="yc-price-button-container">
                                                    <p>{product.productPrice}원 부터</p>
                                                    <button className="yc-buy-button">구입하기</button>
                                                </div>

                                                <div className="yc-hover-button-container">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();  // Prevent navigation when detail button clicked
                                                            handleModalOpen(product);
                                                        }}
                                                        className="yc-detail-button"
                                                    >
                                                        제품 자세히 살펴보기
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            
                        </>
                    )}
                </div>
            </div>

            <Footer />

            {/* Modal */}
            {isModalOpen && selectedProduct && (
                <div className="yc-modal-overlay">
                    <div className="yc-modal-wrapper">
                        <span className="yc-close-button" onClick={handleModalClose}>&times;</span>
                        <div className="yc-modal-container">
                            <div className="yc-modal-image-slider">
                                <img src={selectedProduct.mainImages || "https://via.placeholder.com/300"} alt={selectedProduct.productName} />
                                <p className="yc-image-caption">여러 색상으로 제공됩니다</p>
                            </div>
                            <div className="yc-modal-details">
                                <h2>{selectedProduct.productName}</h2>
                                <div className="yc-price-buy-container">
                                    <p className="yc-price">{selectedProduct.productPrice} 원부터</p>
                                    <button className="yc-buy-button">구입하기</button>
                                </div>
                                {/* Dynamic features based on product name */}
                                <ul className="yc-features">
                                    {featuresData[selectedProduct.productName] ? (
                                        featuresData[selectedProduct.productName].map((feature, index) => (
                                            <li key={index}>
                                                {feature}
                                            </li>
                                        ))
                                    ) : (
                                        <li>특징 정보를 사용할 수 없습니다.</li>
                                    )}
                                </ul>
                                
                                <Link to="#" className="yc-learn-more-link">{selectedProduct.productName} 더 살펴보기</Link>
                            </div>
                        </div>
                        <div className="yc-modal-footer">
                            <div className="yc-modal-footer-section">
                                <p><img src="/path/to/icon1.png" alt="icon" /> 할부 방식: 무이자 구매</p>
                            </div>
                            <div className="yc-modal-footer-section">
                                <p><img src="/path/to/icon2.png" alt="icon" /> 무료 익일 배송: 오후 3시 이전 주문 시</p>
                            </div>
                        </div>
                    </div>
                    <div className="yc-terms-section">
                        <p><strong>* 이용 약관</strong></p>
                        <p>위 할부 서비스는 Apple 온라인 스토어, Apple 전화 판매 및 Apple 리테일 매장에서 구입하는 경우에만 이용할 수 있습니다.</p>
                        <p>할부 체계는 신용 카드 발급사인 신한, BC, KB, NH, 롯데, 삼성, 현대, 하나, KEB 및 시티은행에서 제공합니다. 모든 할부 구입은 신용 카드 발급사의 승인을 받아야 합니다. 신용 카드 발급사에서 할부 구입을 승인해 주지 않는 경우에도 Apple 직원에게 승인 거부 사유가 전달되지 않습니다. 할부 구입에 대한 승인 결과는 신용 카드 발급사에 문의하십시오. 할부 조건, 수수료, 청구액 등은 은행 웹사이트를 참고하십시오. 청구액은 카드 명세서에 표시됩니다. 할부 서비스를 이용하려면 한국 거주자여야 합니다.</p>
                        <p>할부 서비스를 이용하려면 구입 시 현지 발급 신용 카드 또는 현지 발급 제휴 카드(Visa, Mastercard, AMEX, China Union Pay)를 사용해야 합니다. 해외 신용 카드(한국 외 다른 국가 또는 지역에서 발급 받은 신용 카드), 직불/체크 카드 및 현지 발급/제휴 법인 카드는 할부 서비스를 이용할 수 없습니다. 할부는 광고 가격 또는 정찰 가격을 기준으로 합니다. 모든 주문 제품은 무료 배송됩니다.</p>
                        <p>이 정보는 2021년 03월 16일 기준 최신 정보입니다.</p>
                        <p>디스플레이는 모서리가 둥근 형태로, 기기의 아름다운 곡면 디자인을 반영합니다. 이 모서리는 기기의 전체적인 모양인 직사각형 내부에 위치합니다. 직사각형 기준으로 측정했을 때, iPhone 16 화면은 대각선 길이 기준 15.54cm, iPhone 16 Pro는 15.93cm, iPhone 16 Plus는 17.00cm, iPhone 16 Pro Max는 17.43cm입니다. 실제로 보이는 영역은 이보다 좁습니다.</p>
                        <p>Apple Intelligence는 Siri 및 기기 언어를 미국 영어로 설정한 iPhone 16 전 모델, iPhone 15 Pro, iPhone 15 Pro Max에서 베타로 사용할 수 있으며, 연내 iOS 18 업데이트를 통해 제공됩니다. 내년까지 계속해서 기능 및 지원 언어를 추가해 나갈 예정입니다.</p>
                        <p>모든 배터리는 네트워크 구성 및 기타 여러 요인에 따라 소모되는 정도가 다릅니다. 실제 결과는 다를 수 있습니다. 배터리는 충전 사이클이 제한되어 있으므로 추후 교체해야 할 수도 있습니다. 배터리 사용 시간과 충전 사이클은 사용 방법 및 설정에 따라 다릅니다. 자세한 내용은 apple.com/kr/batteries 및 apple.com/kr/iphone/battery.html을 참고하십시오.</p>
                        <p>Apple Vision Pro를 이용할 수 없는 국가나 지역도 있습니다.</p>
                        <p><strong>보상 판매 서비스는 Apple의 보상 판매 파트너사를 통해 제공됩니다. 보상 판매 견적액은 예상 금액일 뿐이며, 실제 보상 판매 금액이 예상 금액보다 낮을 수도 있습니다. 보상 판매 금액은 보상 판매 대상이 되는 제품의 상태, 연도, 모델, 그리고 보상 판매 대상이 되는 제품이 최초 판매된 국가/지역에 따라 달라집니다. 일부 기기는 보상 판매 대상이 아닙니다. 크레딧 또는 Apple Store Gift Card로 보상 판매를 받으려면 성인 연령 이상이어야 합니다. 새 Apple 기기 구매 시, 현재 소유한 기기의 가치만큼 할인을 받을 수도 있습니다. 최종 확정 금액은 보상 판매 대상 기기를 수령한 후, 예상 금액 산정 시 제시한 기기의 설명과 일치하는지 비교 검수 후 정해집니다. 매장에서 보상 판매를 받으려면 사진이 부착된 정부 발행의 유효한 신분증이 필요합니다. 일부 매장에서는 본 프로그램을 이용할 수 없습니다. 온라인과 오프라인 매장의 보상 판매 금액은 차이가 있을 수 있습니다. 일부 매장에서는 추가 요구 사항이 있을 수 있습니다. Apple의 보상 판매 파트너사는 어떤 보상 판매도 거래를 거부하거나, 취소하거나 보상 판매 기기 및 그 수량을 제한할 권리를 보유합니다. 더 자세한 내용은 적용 대상 기기에 대한 보상 판매 및 재활용 서비스를 제공하는 Apple의 보상 판매 파트너사에서 확인할 수 있습니다. Apple 보상 판매 파트너사의 약관이 추가로 적용될 수 있습니다.</strong></p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainList;

