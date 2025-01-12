import React from "react";
import styles from '../styles/ad704detail.module.css'
import { Button } from "@mui/material";



const Page = () => {
    return (
        <div className={styles.ad704detail__container}>
            <header className={styles.ad704detail__header}>전문가와의 상담</header>
            <div className={styles.ad704detail__box}>
                <section className={styles.ad704detail__questionsection}>
                    <h1 className={styles.ad704detail__title}>제목입니다.</h1>
                    <div className={styles.ad704detail__metaData1}>
                        <div className={styles.ad704detail__userid}>
                            <span className={styles.ad704detail__mainfontweight}>아이디 : </span>
                            <span className={styles.ad704detail__subfontweight}>user_id</span>
                        </div>
                        <div className={styles.ad704detail__status}>
                            <span className={styles.ad704detail__mainfontweight}>처리상태 : </span>
                            <span className={styles.ad704detail__statusdetail}>답변 완료</span>
                        </div>
                        <div className={styles.ad704detail__date}>
                            <span className={styles.ad704detail__mainfontweight}>등록일 : </span>
                            <span className={styles.ad704detail__subfontweight}>0000.00.00</span>
                        </div>
                    </div>
                    <p className={styles.ad704detail__content}>
                        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
                    </p>
                </section>
                <section className={styles.ad704detail__answersection}>
                    <h2 className={styles.ad704detail__answerTitle}>답변</h2>
                    <div className={styles.ad704detail__metaData2}>
                        <div className={styles.ad704detail__userid}>
                            <span className={styles.ad704detail__mainfontweight}>아이디 : </span>
                            <span className={styles.ad704detail__subfontweight}>user_id</span>
                        </div>
                        <div className={styles.ad704detail__date}>
                            <span className={styles.ad704detail__mainfontweight}>등록일 : </span>
                            <span className={styles.ad704detail__subfontweight}>0000.00.00</span>
                        </div>
                    </div>
                    <p className={styles.ad704detail__content}>
                        답변입니다.답변입니다.답변입니다.답변입니다.답변입니다.답변입니다.답변입니다.답변입니다.답변입니다.답변입니다.
                    </p>
                </section>
            </div>

            {/* 버튼 */}
            <div className={styles.ad704detail__buttonContainer}>
                <Button
                    variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                    size="medium"
                    sx={{
                        backgroundColor: 'white',  // 배경을 흰색으로 설정
                        color: '#9e9e9e',  // 글자 색상 #9e9e9e
                        border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                        '&:hover': {
                            backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                            color: 'white',  // hover 시 글자 색상 흰색
                            border: '1px solid #9e9e9e',  // hover 시 보더 색상

                        }
                    }}
                >
                    목록
                </Button>

                <Button
                    variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                    size="medium"
                    sx={{
                        backgroundColor: 'white',  // 배경을 흰색으로 설정
                        color: '#9e9e9e',  // 글자 색상 #9e9e9e
                        border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                        '&:hover': {
                            backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                            color: 'white',  // hover 시 글자 색상 흰색
                            border: '1px solid #9e9e9e',  // hover 시 보더 색상

                        }
                    }}
                >
                    삭제
                </Button>
            </div>
        </div>
    );
};

export default Page;