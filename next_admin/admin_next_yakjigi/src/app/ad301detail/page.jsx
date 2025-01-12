'use client';

import React, { useEffect, useState } from "react";
import adcommons from "../styles/adcommons.module.css";
import styles from "../styles/ad301detail.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const admin_idx = searchParams.get("admin_idx");  // URL에서 admin_idx 값을 가져옴

  const [adminDetails, setAdminDetails] = useState({
    admin_id: '',
    admin_name: '',
    admin_email: '',
    admin_nickname: '',  
    admin_phone: '', 
    admin_level_desc: '', 
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // admin_idx가 있으면 API 호출
  useEffect(() => {
    if (admin_idx) {
      const fetchAdminDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://localhost:8080/api/admin_info/detail/${admin_idx}`);
          console.log('Response status:', response.status); // 응답 상태 코드 출력

          if (!response.ok) {
            throw new Error(`서버 요청 실패: ${response.status}`); // 상태 코드가 2xx가 아닌 경우 오류 처리
          }

          const data = await response.json();
          console.log('Response data:', data); // 서버 응답 데이터 확인

          if (data.success) {
            setAdminDetails(data.data);  // 받아온 관리자 정보 설정
          } else {
            throw new Error('관리자 정보 조회 실패');
          }
        } catch (error) {
          console.error('관리자 정보 로딩 실패:', error);
          setError('관리자 정보를 가져오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchAdminDetails();
    } else {
      setError('유효하지 않은 admin_idx');
      setLoading(false);
    }
  }, [admin_idx]);

  // 로딩 상태나 오류 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={adcommons.adcommons__main_background_color}>
        <div className={adcommons.adcommons__main_container}>
          <p className={adcommons.adcommons__main_name}>관리자 상세보기</p>

          <div className={adcommons.adcommons__main_container_box}>
            <div className={adcommons.adcommons__main_title}>아이디</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="아이디"
                value={adminDetails.admin_id}
                id="admin_id"
                disabled
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이름</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="이름"
                value={adminDetails.admin_name}
                id="admin_name"
                disabled
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>닉네임</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="닉네임"
                value={adminDetails.admin_nickname}
                id="admin_nickname"
                disabled
              />
            </div>
          </div>


          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>전화번호</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="전화번호"
                value={adminDetails.admin_phone}
                id="admin_phone"
                disabled
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>이메일</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="이메일"
                value={adminDetails.admin_email}
                id="admin_email"
                disabled
              />
            </div>
          </div>

          <div className={adcommons.adcommons__sub1_container_box}>
            <div className={adcommons.adcommons__sub1_title}>관리자 등급</div>
            <div className={adcommons.adcommons__box}>
              <TextField
                fullWidth
                label="관리자 등급"
                value={adminDetails.admin_level_desc}
                id="admin_level_desc"
                disabled
              />
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
                backgroundColor: 'white',
                color: '#9e9e9e',
                border: '1px solid #9e9e9e',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                },
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
