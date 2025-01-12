"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "../styles/ad702detail.module.css";
import adcommons from "../styles/adcommons.module.css";
import { TextareaAutosize } from "@mui/material";

function Page(props) {
    // 각 파일에 대한 상태를 별도로 관리
    const [fileName1, setFileName1] = useState("");
    const [filePreview1, setFilePreview1] = useState(null);  // 이미지 미리보기 상태 추가
    const [fileDescription, setFileDescription] = useState(""); // 파일에 대한 텍스트 입력 상태 추가

    // 파일 선택 시 상태 업데이트 함수
    const handleFileChange = (event, setFileName, setFilePreview) => {
        const file = event.target.files[0]; // 첫 번째 파일 선택
        if (file) {
            setFileName(file.name); // 파일 이름을 상태에 저장
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result); // 이미지 미리보기 업데이트
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽어들여 이미지 미리보기
        }
    };

    // 텍스트 입력 처리 함수
    const handleTextChange = (event) => {
        setFileDescription(event.target.value);
    };

    return (
        <>
            <div className={adcommons.adcommons__main_background_color}>
                <div className={adcommons.adcommons__main_container}>
                    <p className={adcommons.adcommons__main_name}>자주 묻는 질문 - 글쓰기</p>
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>질문</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="질문" id="fullWidth" />
                        </div>
                    </div>

                    <div className={styles.ad702detail__main_container_box}>
                        <div className={styles.ad702detail__main_title}>답변</div>
                        <div className={styles.ad702detail__box}>
                            <TextareaAutosize className={styles.ad702detail__textarea}
                                minRows={3}
                                maxRows={6}
                                placeholder="내용"
                                style={{ width: '100%', borderRadius: '5px', maxHeight: '460px', height: '100%' }}
                            />
                        </div>
                    </div>




                    <div className={adcommons.adcommons__button_box}>
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
                            저장
                        </Button>

                        <Button
                            variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                            size="medium"
                            sx={{
                                marginLeft: '15px',
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
                        <Button
                            variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                            size="medium"
                            sx={{
                                marginLeft: '15px',
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
                            취소
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;