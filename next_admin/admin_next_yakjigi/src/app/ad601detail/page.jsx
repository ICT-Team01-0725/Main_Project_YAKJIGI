"use client";

import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";  
import { useEffect, useState } from "react";
import adcommons from "../styles/adcommons.module.css";

const Page = () => {
  const searchParams = useSearchParams();  // URL에서 쿼리 파라미터 가져오기
  const phar_idx = searchParams.get("phar_idx");  // phar_idx를 추출

  const [pharmacy, setPharmacy] = useState({
    phar_name: '',  // 빈 문자열로 초기화
    phar_address: '',  // 빈 문자열로 초기화
    phar_lat: 0,  // 기본값 0으로 설정
    phar_long: 0,  // 기본값 0으로 설정
  });
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  useEffect(() => {
    if (phar_idx) {
      const fetchData = async () => {
        try {
          setLoading(true);  // 데이터 로딩 시작
          const response = await axios.get(`http://localhost:8080/api/phar_info/detail/${phar_idx}`);
          
          console.log("API 응답 데이터:", response.data);  // 데이터 로그 찍기

          const data = response.data;

          if (data) {
            setPharmacy({
              phar_name: data.phar_name || '',  // 값이 없으면 빈 문자열로 처리
              phar_address: data.phar_address || '',  // 값이 없으면 빈 문자열로 처리
              phar_lat: parseFloat(data.phar_lat) || 0,  // 값이 없으면 0으로 처리
              phar_long: parseFloat(data.phar_long) || 0,  // 값이 없으면 0으로 처리
            });
          } else {
            alert("약국 정보를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("Error fetching pharmacy details:", error);
          alert("약국 정보를 불러오는 데 실패했습니다.");
        } finally {
          setLoading(false);  // 데이터 로딩 완료
        }
      };

      fetchData();
    }
  }, [phar_idx]);  // phar_idx가 업데이트될 때마다 실행

  // 로딩 중일 때는 로딩 메시지 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  // `phar_idx`가 없으면 로딩 화면을 표시
  if (!phar_idx) {
    return <div>phar_idx가 URL에서 제공되지 않았습니다.</div>;
  }

  // 데이터가 올바르게 갱신되었는지 확인하려면 콘솔에 찍어보기
  console.log("pharmacy 상태:", pharmacy);

  return (
    <div className={adcommons.adcommons__main_background_color}>
      <div className={adcommons.adcommons__main_container}>
        <p className={adcommons.adcommons__main_name}>약국 상세보기</p>

        <div className={adcommons.adcommons__main_container_box}>
          <div className={adcommons.adcommons__main_title}>약국 이름</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="약국 이름"
              id="phar_name"
              name="phar_name"
              value={pharmacy.phar_name}  // 빈 문자열로 처리
              disabled // 읽기 전용
            />
          </div>
        </div>

        <div className={adcommons.adcommons__sub1_container_box}>
          <div className={adcommons.adcommons__sub1_title}>주소</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="주소"
              id="phar_address"
              name="phar_address"
              value={pharmacy.phar_address}  // 빈 문자열로 처리
              disabled // 읽기 전용
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
            수정
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
  );
};

export default Page;
