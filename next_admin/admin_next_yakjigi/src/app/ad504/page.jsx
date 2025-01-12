"use client";
import React, { useState } from "react";
import styles from "../styles/ad504.module.css";
import adcommons from "../styles/adcommons.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Page(props) {
  // 각 파일에 대한 상태를 별도로 관리
  const [fileName1, setFileName1] = useState("");
  // 파일 선택 시 상태 업데이트 함수
  const handleFileChange = (event, setFileName) => {
    const file = event.target.files[0]; // 첫 번째 파일 선택
    if (file) {
      setFileName(file.name); // 파일 이름을 상태에 저장
    }
  };

  const [division, setDivision] = React.useState('');
  const [time, setTime] = React.useState('');

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };



  const [isOpen, setIsOpen] = useState(false);

  // 위치 상태 관리 (기본 위치 설정: 화면 중앙)
  const [position, setPosition] = useState({
    top: 100, // px
    left: 100, // px
  });

  // 팝업 열기/닫기
  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  // 위치 변경 핸들러
  const handlePositionChange = (axis, value) => {
    setPosition((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };


  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>팝업 레이어 관리</p>

          {/* 파일 1 */}
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>현재 팝업 창</div>
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
                  onChange={(e) => handleFileChange(e, setFileName1)} // 파일1 상태 업데이트
                />
              </div>
            </div>
          </div>



          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>구분</div>
            <div className={adcommons.adcommons__box}>
              <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Division
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={division}
                    onChange={handleDivisionChange}
                    label="권한"
                  >
                    <MenuItem value="">
                      <em>없음</em>
                    </MenuItem>
                    <MenuItem value={10}>회원</MenuItem>
                    <MenuItem value={20}>페이지</MenuItem>
                    <MenuItem value={30}>커뮤니티</MenuItem>
                  </Select>
                </FormControl>
                <p>커뮤니티에 표시될 것인지, 어느 곳에 표시할 것인지를 설정합니다.</p>
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>시간</div>
            <div className={adcommons.adcommons__box}>
              <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Time
                  </InputLabel>
                  <Select
                    className={styles.ad504__select_box}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={time}
                    onChange={handleTimeChange}
                    label="권한"
                  >
                    <MenuItem value="">
                      <em>없음</em>
                    </MenuItem>
                    <MenuItem value={10}>회원</MenuItem>
                    <MenuItem value={20}>페이지</MenuItem>
                    <MenuItem value={30}>커뮤니티</MenuItem>
                  </Select>
                </FormControl>
                <p>고객이 다시 보지 않음을 선택할 시, 몇 팝업레이어를 보여주지 않을지 설정합니다.</p>
              </div>
            </div>
          </div>

          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>시작 일시</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                label="시작 일시"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>종료 일시</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                label="종료 일시"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_content_textarea}>
            <div className={adcommons.adcommons__sub1_content}>팝업 위치 설정</div>
            <div className={styles.controls}>
              <TextField
                label="Top(px)"
                type="number"
                value={position.top}
                onChange={(e) => handlePositionChange("top", parseInt(e.target.value, 10))}
                sx={{ marginRight: "10px" }}
              />
              <TextField
                label="Left(px)"
                type="number"
                value={position.left}
                onChange={(e) => handlePositionChange("left", parseInt(e.target.value, 10))}
              />

              <Button
                variant="contained"
                onClick={togglePopup}
                sx={{ marginLeft: "15px" }}
              >
                {isOpen ? "팝업 닫기" : "팝업 열기"}
              </Button>
            </div>

            {/* 팝업 창 */}
            {isOpen && (
              <div
                className={styles.popup}
                style={{
                  position: "absolute",
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                  padding: "20px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2>팝업 창</h2>
                <p>이곳에서 팝업 내용을 확인할 수 있습니다.</p>
                <Button variant="outlined" onClick={togglePopup}>
                  닫기
                </Button>
              </div>
            )}



          </div>

          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>메인 타이틀</div>
            <div className={adcommons.adcommons__box}>
              <TextField fullWidth label="메인 타이틀" id="fullWidth" />
            </div>
          </div>

          <div className={adcommons.adcommons__main_content_textarea}>
            <div className={adcommons.adcommons__main_content}>내용</div>
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



          <div className={adcommons.adcommons__button_box}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: "white",
                color: "#9e9e9e",
                border: "1px solid #9e9e9e",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
                },
              }}
            >
              저장
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{
                marginLeft: "15px",
                backgroundColor: "white",
                color: "#9e9e9e",
                border: "1px solid #9e9e9e",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                  border: "1px solid #9e9e9e",
                },
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