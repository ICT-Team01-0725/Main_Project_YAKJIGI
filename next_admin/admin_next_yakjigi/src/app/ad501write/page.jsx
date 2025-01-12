"use client";
import React, { useState } from "react";
import styles from "../styles/ad501detail.module.css";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import adcommons from "../styles/adcommons.module.css";

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
          <p className={adcommons.adcommons__main_name}>안전한 의약생활 - 의약품 상세보기 및 추가하기</p>
          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>약품명</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="약품명" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>제조사</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="제조사명" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>약의 효능</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="내용" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>부작용</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                id="outlined-multiline-flexible"
                label="내용"
                multiline
                maxRows={4}
                rows={4}
                fullWidth
              />
            </div>
          </div>

          {/* 파일 1 */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>이미지</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__filebox}>
                {/* 이미지 미리보기 영역 */}
                <div className={adcommons.adcommons__imgbox}>
                  {filePreview1 && (
                    <img src={filePreview1} alt="파일 미리보기" className={adcommons.adcommons__imagePreview} />
                  )}
                </div>
               {/*  <div className={adcommons.adcommons__description}>
                 <label htmlFor="file1">파일 설명</label>
                <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={1}
                rows={1}
                fullWidth
              />
              </div> */}
                <input
                  className={adcommons.adcommons__uploadName}
                  value={fileName1}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file1">파일찾기</label>
                <input
                  type="file"
                  id="file1"
                  name="file_name1"
                  onChange={(e) => handleFileChange(e, setFileName1, setFilePreview1)} // 파일1 상태 업데이트 및 미리보기
                />
              </div>
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