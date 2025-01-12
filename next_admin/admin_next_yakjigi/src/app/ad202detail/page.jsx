"use client";
import React, { useState } from "react";
import styles from "../styles/ad202detail.module.css";
import adcommons from "../styles/adcommons.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Page(props) {
  // 각 파일에 대한 상태를 별도로 관리
  const [fileName1, setFileName1] = useState("");  // 면허증 파일 이름
  const [fileName2, setFileName2] = useState("");  // 이미지 파일 이름
  const [filePreview2, setFilePreview2] = useState(null);  // 이미지 미리보기 이미지

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

  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>전문 회원 관리</p>
          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>닉네임</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="닉네임" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이름</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="이름" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이메일</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="이메일" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>회원 등급</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="회원 등급"
                value={userDetails.user_level_desc}
                id="user_level_desc"
                disabled
              />
            </div>
          </div>
          {/* 면허증 파일 - 이미지 미리보기는 제거 */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>면허증</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__filebox}>
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
                  onChange={(e) => handleFileChange(e, setFileName1)} // 면허증 파일만 선택
                />
              </div>
            </div>
          </div>

          {/* 이미지 파일 - 미리보기 기능 추가 */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>이미지</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__filebox}>
                {/* 이미지 미리보기 영역 */}
                <div className={adcommons.adcommons__imgbox}>
                  {filePreview2 && (
                    <img
                      src={filePreview2}
                      alt="파일 미리보기"
                      className={adcommons.adcommons__imagePreview}
                    />
                  )}
                </div>
                <input
                  className={adcommons.adcommons__uploadName}
                  value={fileName2}
                  placeholder=""
                  readOnly
                />
                <label htmlFor="file2">파일찾기</label>
                <input
                  type="file"
                  id="file2"
                  name="file_name2"
                  onChange={(e) => handleFileChange(e, setFileName2, setFilePreview2)} // 이미지 파일 선택
                />
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__button_box}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: 'white',
                color: '#9e9e9e',
                border: '1px solid #9e9e9e',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                }
              }}
            >
              저장
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginLeft: "15px",
                backgroundColor: 'white',
                color: '#9e9e9e',
                border: '1px solid #9e9e9e',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                }
              }}
            >
              삭제
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginLeft: "15px",
                backgroundColor: 'white',
                color: '#9e9e9e',
                border: '1px solid #9e9e9e',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
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