"use client";
import Link from "next/link";
import { useState } from "react";
import "../globals.css";

function Page() {
    // 각 메뉴의 상태를 관리하는 객체 형태


    const [hoverMenu, setHoverMenu] = useState({

        userManagement: false,
        adminManagement: false,
        pageManagement: false,
        communityManagement: false, userManagementSub1: false,
        userManagementSub2: false,
        adminManagementSub1: false,
        adminManagementSub2: false,
        pageManagementSub1: false,
        communityManagementSub1: false

    });

    // 특정 메뉴의 hover 상태를 변경하는 함수
    const handleMouseEnter = (menu) => {
        setHoverMenu((prev) => ({ ...prev, [menu]: true }));
    };

    const handleMouseLeave = (menu) => {
        setHoverMenu((prev) => ({ ...prev, [menu]: false }));
    };

    // 서 메뉴를 hover 상태를 변경하는 함수
    const handleSubMouseEnter = (menu) => {
        setHoverMenu((prev) => ({ ...prev, [menu]: true }));
    };

    const handleSubMouseLeave = (menu) => {
        setHoverMenu((prev) => ({ ...prev, [menu]: false }));
    };

    return (
        <div className="admin-Header">
            {/* 상단 사용자 정보 */}
            <div className="admin-user-color">
                <div className="admin-user">
                    <div className="admin-homepage">
                        <span className="material-symbols-outlined">
                            home
                        </span>
                        <p>홈페이지</p>
                    </div>
                    <p>내 정보</p>
                    <p>로그아웃</p>
                </div>
            </div>
            {/* 메뉴 바 */}
            <div className="menubar-color">
                <div className="menubar">
                    <ul>
                        <li className="menu-Home"><Link href={"/"}>HOME</Link></li>
                        <div className="li-list">
                            <li className="menu-options">대쉬보드</li>
                            {/* 사용자 관리 */}
                            <li
                                className="menu-options"
                                onMouseEnter={() => handleMouseEnter("userManagement")}
                                onMouseLeave={() => handleMouseLeave("userManagement")}
                            >
                                사용자 관리
                                {hoverMenu.userManagement && (
                                    <ul className="dropdown">
                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("userManagementSub1")}
                                            onMouseLeave={() => handleSubMouseLeave("userManagementSub1")}
                                        >일반 회원 관리
                                            {hoverMenu.userManagementSub1 && (
                                                <ul className="dropdown-right">
                                                    <li className="dropdown-item-right"> <Link href="/ad201">회원 목록 조회</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad201report">회원 신고 내역</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("userManagementSub2")}
                                            onMouseLeave={() => handleSubMouseLeave("userManagementSub2")}
                                        >
                                            전문 회원 관리
                                            {hoverMenu.userManagementSub2 && (
                                                <ul className="dropdown-right">
                                                    <li className="dropdown-item-right"><Link href="/ad202">회원 목록 조회</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad202report">회원 신고 내역</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </li>


                            {/* 관리자 관리 */}
                            <li
                                className="menu-options"
                                onMouseEnter={() => handleMouseEnter("adminManagement")}
                                onMouseLeave={() => handleMouseLeave("adminManagement")}
                            >
                                관리자 관리
                                {hoverMenu.adminManagement && (
                                    <ul className="dropdown">
                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("adminManagementSub1")}
                                            onMouseLeave={() => handleSubMouseLeave("adminManagementSub1")}
                                        >관리자 생성
                                            {hoverMenu.adminManagementSub1 && (
                                                <ul className="dropdown-right">
                                                    <li className="dropdown-item-right"><Link href="/ad301create">관리자 등록</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("adminManagementSub2")}
                                            onMouseLeave={() => handleSubMouseLeave("adminManagementSub2")}
                                        > <Link href="/ad301">관리자 목록</Link>

                                        </li>
                                    </ul>
                                )}
                            </li>


                            {/* 페이지 관리 */}
                            <li
                                className="menu-options"
                                onMouseEnter={() => handleMouseEnter("pageManagement")}
                                onMouseLeave={() => handleMouseLeave("pageManagement")}
                            >
                                페이지 관리
                                {hoverMenu.pageManagement && (
                                    <ul className="dropdown">
                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("pageManagementSub1")}
                                            onMouseLeave={() => handleSubMouseLeave("pageManagementSub1")}
                                        >의약품이란?
                                            {hoverMenu.pageManagementSub1 && (
                                                <ul className="dropdown-right">
                                                    <li className="dropdown-item-right"><Link href="/ad401">의약품의 정의</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad402">의약품의 종류</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad403">의약품의 허가과정</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad404">신약과 제네릭</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad405">의약품의 관련 법령</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("pageManagementSub2")}
                                            onMouseLeave={() => handleSubMouseLeave("pageManagementSub2")}
                                        >
                                            안전한 의약 생활
                                            {hoverMenu.pageManagementSub2 && (
                                                <ul className="dropdown-right">
                                                    <li className="dropdown-item-right"><Link href="/ad501">의약품 검색하기</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad502">부작용 검색하기</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad503">병용금기 검색하기</Link></li>
                                                </ul>
                                            )}
                                        </li>

                                        <li className="dropdown-item"
                                            onMouseEnter={() => handleSubMouseEnter("pageManagementSub3")}
                                            onMouseLeave={() => handleSubMouseLeave("pageManagementSub3")}
                                        >
                                            생활 속 의약
                                            {hoverMenu.pageManagementSub3 && (
                                                <ul className="dropdown-right">
                                                    <li className="dropdown-item-right"><Link href="/ad601">약국 찾아보기</Link></li>
                                                    <li className="dropdown-item-right" style={{ fontSize: "12px" }}><Link href="/ad602">폐의약품 수거함 찾아보기</Link></li>
                                                    <li className="dropdown-item-right"><Link href="/ad603">보도자료 찾아보기</Link></li>
                                                </ul>
                                            )}
                                        </li>
                                        <li className="dropdown-item"><Link href="/ad504">팝업 관리</Link></li>
                                    </ul>
                                )}
                            </li>


                            {/* 커뮤니티 관리 */}
                            <li
                                className="menu-options"
                                onMouseEnter={() => handleMouseEnter("communityManagement")}
                                onMouseLeave={() => handleMouseLeave("communityManagement")}
                            >
                                커뮤니티 관리
                                {hoverMenu.communityManagement && (
                                    <ul className="dropdown">
                                        <li className="dropdown-item"><Link href="/ad701">공지사항</Link></li>
                                        <li className="dropdown-item"><Link href="/ad702">자주 묻는 질문</Link></li>
                                        <li className="dropdown-item"><Link href="/ad703">전문가와의 상담</Link></li>
                                        <li className="dropdown-item"><Link href="/ad704">운영진에게 문의</Link></li>
                                    </ul>
                                )}
                            </li>
                        </div>
                    </ul>
                </div>
            </div >
        </div >
    );
}

export default Page;