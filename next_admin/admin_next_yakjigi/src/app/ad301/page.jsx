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
          <option value="admin_id">아이디</option>
          <option value="admin_name">이름</option>
          <option value="admin_email">이메일</option>
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
  { field: 'admin_idx', headerName: '번호', width: 100 },
  { field: 'admin_id', headerName: '아이디', width: 150 },
  { field: 'admin_name', headerName: '이름', width: 140 },
  { field: 'admin_nickname', headerName: '닉네임', width: 150 },
  { field: 'admin_email', headerName: '이메일', width: 280 },
  { field: 'admin_phone', headerName: '전화번호', width: 200 },
  { field: 'admin_out', headerName: '활동 여부', width: 150 },
  { field: 'admin_level_desc', headerName: '등급', width: 150 },
];

// 각 컬럼을 중앙 정렬
const centeredColumns = columns.map((column) => ({
  ...column,
  headerAlign: 'center',
}));

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('admin_id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rowsPerPage = 5;
  const router = useRouter();

  // 페이지 변경 처리
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 페이지에 맞는 데이터 계산
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = admins.slice(startIndex, startIndex + rowsPerPage);

  // 데이터 행 클릭 시 상세보기 페이지로 이동
  const handleRowClick = (params) => {
    const { admin_idx } = params.row;
    router.push(`/ad301detail?admin_idx=${admin_idx}`);  // URL을 '/ad301detail'로 수정
  };

  // 데이터를 백엔드에서 가져오는 함수
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // 검색 카테고리와 검색어를 쿼리 파라미터로 전달
      const response = await fetch(`http://localhost:8080/api/admin_info/list?searchQuery=${searchQuery}&searchCategory=${searchCategory}`);
      const data = await response.json();

      if (data.success) {
        setAdmins(data.data);  // 성공적으로 데이터 가져오기
      } else {
        setError("관리자 목록을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("데이터를 가져오는 중 오류가 발생했습니다.");
      console.error('Error fetching admins:', error);
    }
    setLoading(false);
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchAdmins();
  }, [searchQuery, searchCategory]);

  // 검색어 변경 시 페이지 리셋
  useEffect(() => {
    setPage(1);
  }, [searchQuery, searchCategory]);

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>관리자 관리</h1>

      <div className={styles.ad201__search}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
        />
      </div>

      {loading && <div>로딩 중...</div>}

      {error && <div className="error-message">{`오류: ${error}`}</div>}

      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            hideFooterPagination={true}
            hideFooter={true}
            onRowClick={handleRowClick}  // 행 클릭 시 상세보기로 이동
            getRowId={(row) => row.admin_idx}
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
          count={Math.ceil(admins.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}
