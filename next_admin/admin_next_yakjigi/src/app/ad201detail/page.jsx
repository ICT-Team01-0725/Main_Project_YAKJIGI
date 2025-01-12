'use client';

import React, { useEffect, useState } from "react";
import adcommons from "../styles/adcommons.module.css";
import styles from "../styles/ad201detail.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams, useRouter } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const user_idx = searchParams.get("user_idx");  // URL에서 user_idx 값을 가져옴
  const router = useRouter(); // useRouter 훅을 이용해 페이지 이동

  const [userDetails, setUserDetails] = useState({
    user_id: '',
    user_name: '',
    user_nickname: '',
    user_phone: '',
    user_email: '',
    user_gender: '',
    user_profile: '',  // 프로필 이미지 URL
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fileName1, setFileName1] = useState(""); // 파일 이름
  const [filePreview1, setFilePreview1] = useState(null); // 이미지 미리보기 URL
  const [file1, setFile1] = useState(null); // 업로드할 파일

  // user_idx가 있으면 API 호출
  useEffect(() => {
    if (user_idx) {
      const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://localhost:8080/api/user_info/detail/${user_idx}`);
          const data = await response.json();

          if (data.success) {
            setUserDetails(data.data);  // 받아온 사용자 정보 설정
          } else {
            setError('사용자 정보 조회 실패');
          }
        } catch (error) {
          console.error('사용자 정보 로딩 실패:', error);
          setError('사용자 정보를 가져오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [user_idx]);

  // 파일 업로드 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('선택된 파일 타입:', file.type); // 파일 타입 출력
      setFileName1(file.name); // 파일 이름 업데이트
      setFile1(file); // 파일 상태 업데이트

      const reader = new FileReader();

      // 이미지 파일이면 미리보기 URL 설정
      if (file.type.startsWith("image/")) {
        reader.onload = (event) => {
          setFilePreview1(event.target.result); // 이미지 미리보기 URL 저장
        };
        reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽기
      } else {
        reader.onload = () => {
          setFilePreview1(null); // 이미지가 아닌 경우 미리보기 초기화
        };
        reader.readAsText(file); // 텍스트 파일 읽기
      }
    }
  };

  // 파일 업로드 후 서버에 저장하는 함수 (추후 구현 필요)
  const handleSave = async () => {
    if (!file1) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file1); // 파일 추가
    formData.append('user_idx', user_idx); // 사용자 ID 추가

    try {
      const response = await fetch(`http://localhost:8080/api/user_info/uploadProfileImage/${user_idx}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // 성공적으로 업로드 후 프로필 이미지 URL 업데이트
        setUserDetails((prevState) => ({
          ...prevState,
          user_profile: result.fileUrl, // 서버에서 응답으로 받은 파일 URL
        }));
        alert('파일이 성공적으로 업로드되었습니다.');
      } else {
        alert('파일 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  // 회원 삭제 함수 (여기서 변경된 부분)
  const handleDelete = async () => {
    if (window.confirm('정말 이 회원을 삭제하시겠습니까?')) {
      try {
        // DELETE 요청으로 회원 삭제
        const response = await fetch(`http://localhost:8080/api/user_info/delete/${user_idx}`, {
          method: 'DELETE',  // 'DELETE' 메서드를 사용하여 삭제 요청
        });

        const result = await response.json();

        console.log(result); // 응답 확인용 로그

        if (result.success) {
          alert('회원이 성공적으로 삭제되었습니다.');
          router.push('/user-list');  // 삭제 후 사용자 목록 페이지로 이동 (예시 URL)
        } else {
          alert(result.message || '회원 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('회원 삭제 중 오류 발생:', error);
        alert('회원 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 로딩 상태나 오류 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={adcommons.adcommons__main_background_color}>
      <div className={adcommons.adcommons__main_container}>
        <p className={adcommons.adcommons__main_name}>회원 관리</p>

        {/* 아이디 */}
        <div className={adcommons.adcommons__main_container_box}>
          <div className={adcommons.adcommons__main_title}>아이디</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="아이디"
              value={userDetails.user_id}
              id="user_id"
              disabled
            />
          </div>
        </div>

        {/* 이름 */}
        <div className={adcommons.adcommons__sub1_container_box}>
          <div className={adcommons.adcommons__sub1_title}>이름</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="이름"
              value={userDetails.user_name}
              id="user_name"
              disabled
            />
          </div>
        </div>

        {/* 닉네임 */}
        <div className={adcommons.adcommons__sub1_container_box}>
          <div className={adcommons.adcommons__sub1_title}>닉네임</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="닉네임"
              value={userDetails.user_nickname}
              id="user_nickname"
              disabled
            />
          </div>
        </div>

        {/* 전화번호 */}
        <div className={adcommons.adcommons__sub1_container_box}>
          <div className={adcommons.adcommons__sub1_title}>전화번호</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="전화번호"
              value={userDetails.user_phone}
              id="user_phone"
              disabled
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className={adcommons.adcommons__sub1_container_box}>
          <div className={adcommons.adcommons__sub1_title}>이메일</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="이메일"
              value={userDetails.user_email}
              id="user_email"
              disabled
            />
          </div>
        </div>

        {/* 성별 */}
        <div className={adcommons.adcommons__sub1_container_box}>
          <div className={adcommons.adcommons__sub1_title}>성별</div>
          <div className={adcommons.adcommons__box}>
            <TextField
              fullWidth
              label="성별"
              value={userDetails.user_gender}
              id="user_gender"
              disabled
            />
          </div>
        </div>

        {/* 프로필 이미지 */}
        {userDetails.user_profile && (
          <div className={adcommons.adcommons__sub2_container_box}>
            <div className={adcommons.adcommons__sub2_title}>프로필 이미지</div>
            <div className={adcommons.adcommons__box}>
              <div className={adcommons.adcommons__imgbox}>
                <img
                  src={userDetails.user_profile}
                  alt="프로필 이미지"
                  className={adcommons.adcommons__imagePreview}
                />
              </div>
            </div>
          </div>
        )}

        {/* 파일 1 (이미지 업로드) */}
        <div className={adcommons.adcommons__sub2_container_box}>
          <div className={adcommons.adcommons__sub2_title}>이미지</div>
          <div className={adcommons.adcommons__box}>
            <div className={adcommons.adcommons__filebox}>
              {/* 이미지 미리보기 영역 */}
              <div className={adcommons.adcommons__imgbox}>
                {filePreview1 && (
                  <img
                    src={filePreview1}
                    alt="파일 미리보기"
                    className={adcommons.adcommons__imagePreview}
                  />
                )}
              </div>
              <input
                className={adcommons.adcommons__uploadName}
                value={fileName1}
                placeholder="파일 선택"
                readOnly
              />
              <label htmlFor="file1">파일찾기</label>
              <input
                type="file"
                id="file1"
                name="file_name1"
                onChange={handleFileChange} // 파일1 상태 업데이트 및 미리보기
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
              },
            }}
            onClick={handleSave} // 저장 버튼 클릭 시 파일 업로드
          >
            저장
          </Button>

          {/* 삭제, 취소 버튼 */}
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
            onClick={handleDelete} // 삭제 버튼 클릭 시 회원 삭제
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
  );
}

export default Page;
