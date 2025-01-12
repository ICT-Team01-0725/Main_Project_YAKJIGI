'use client';

import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/ad201.module.css';
import adcommons from '../styles/adcommons.module.css';

// 검색 바 컴포넌트
function SearchBar({ searchQuery, setSearchQuery, searchCategory, setSearchCategory }) {
  return (
    <div className={adcommons.adcommons__searchcontainer}>
      <div className={adcommons.adcommons__searchdropdown}>
        <select
          className={adcommons.adcommons__category}
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="user_id">아이디</option>
          <option value="user_name">이름</option>
          <option value="user_email">이메일</option>
        </select>
      </div>

      <div className={adcommons.adcommons__searchbar}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}

// 테이블 컬럼 정의
const columns = [
  { field: 'user_idx', headerName: '번호', width: 80 },
  { field: 'user_id', headerName: '아이디', width: 190 },
  { field: 'user_name', headerName: '이름', width: 160 },
  { field: 'user_nickname', headerName: '닉네임', width: 170 },
  { field: 'user_email', headerName: '이메일', width: 330 },
  { field: 'user_reg_date', headerName: '최초 가입일', width: 200 },
  { field: 'user_level_desc', headerName: '등급', width: 180 },
];

// 각 컬럼을 중앙 정렬
const centeredColumns = columns.map((column) => ({
  ...column,
  headerAlign: 'center',
}));

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("user_id");  // 검색 카테고리 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const rowsPerPage = 5;
  const router = useRouter();

  // 페이지 변경 처리
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = users.slice(startIndex, startIndex + rowsPerPage);

  // 데이터 행 클릭 시 상세보기 페이지로 이동
  const handleRowClick = (params) => {
    const { user_idx } = params.row;
    router.push(`/ad201detail?user_idx=${user_idx}`);
  };

  // 데이터를 백엔드에서 가져오는 함수
  const fetchUsers = async () => {
    setLoading(true);  // 로딩 시작
    try {
      // 새로운 URL을 사용하여 API 호출
      const response = await fetch(`http://localhost:8080/api/user_info/list/level/not1?searchQuery=${searchQuery}&searchCategory=${searchCategory}`);
      const data = await response.json();
  
      console.log('API Response:', data); // 응답 내용 로그 추가
  
      if (data.success) {
        setUsers(data.data);  // 반환된 데이터를 상태에 저장
      } else {
        setError("회원 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error('Error fetching users:', error);
    }
    setLoading(false);  // 로딩 종료
  };
  

  // 초기 데이터 로딩
  useEffect(() => {
    fetchUsers();  // 사용자 데이터를 불러옵니다.
  }, [searchQuery, searchCategory]);  // 검색어와 카테고리 변경 시 데이터 새로 가져오기

  // 검색어 변경 시 페이지 리셋
  useEffect(() => {
    setPage(1);
  }, [searchQuery, searchCategory]);

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>전문 회원 관리</h1>

      <div className={styles.ad201__search}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
        />
      </div>

      {loading && <div>로딩 중...</div>} {/* 로딩 중 표시 */}

      {error && <div className="error-message">{`오류: ${error}`}</div>} {/* 에러 메시지 표시 */}

      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            hideFooterPagination={true}
            hideFooter={true}
            onRowClick={handleRowClick}
            getRowId={(row) => row.user_idx}
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
          />
        </Paper>
      </div>

      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}
