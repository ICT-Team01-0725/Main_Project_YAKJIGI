'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad703.module.css'
import adcommons from "../styles/adcommons.module.css";
import { Button } from '@mui/material';

// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");
  
    return (
      <div className={adcommons.adcommons__searchcontainer}>
        {/* 검색 옵션 */}
        <div className={adcommons.adcommons__searchdropdown}>
          <select className={adcommons.adcommons__category} defaultValue="제목">
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
        </div>
  
        {/* 검색바 */}
        <div className={adcommons.adcommons__searchbar}>
          <input type="text" placeholder="검색어를 입력하세요." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="button" >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    ); 
  } 
  
  const columns = [
    { field: 'id', headerName: '작성자 아이디', width: 207 },
    { field: 'Name', headerName: '작성자 이름', width: 207 },
    { field: 'title', headerName: '제목', width: 400 },
    { field: 'regdate', headerName: '작성일', width: 207 },
    { field: 'views', headerName: '조회수',  width: 207 },
  ];
  
  const rows = [
    { id: 'hong', Name: 'Snow', title: '제목입니다', regdate: '2000.00.00', views: '123' },
    { id: 'park', Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', views: '13' },
    { id: 'kim', Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', views: '12' },
    { id: 'lee', Name: 'Stark', title: '제목입니다', regdate: '2000.00.00', views: '11' },
    { id: 'yoon', Name: 'Targaryen', title: '제목입니다', regdate: '2000.00.00', views: '111' },
    { id: 'sdkw', Name: 'Melisandre', title: '제목입니다', regdate: '2000.00.00', views: '113' },
    { id: 'asdf', Name: 'Clifford', title: '제목입니다', regdate: '2000.00.00', views: '7' },
    { id: 'sadeee', Name: 'Frances', title: '제목입니다', regdate: '2000.00.00', views: '99' },
    { id: 'hhhg', Name: 'Roxie', title: '제목입니다', regdate: '2000.00.00', views: '2' },
    { id: 'hosdfng', Name: 'Snow', title: '제목입니다', regdate: '2000.00.00', views: '0' },
    { id: 'sdrkfs', Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', views: '1' },
    { id: 'sdewr', Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', views: '3' },
    { id: 'zcgh', Name: 'Stark', title: '제목입니다', regdate: '2000.00.00', views: '111' },
    { id: 'qhjm', Name: 'Targaryen', title: '제목입니다', regdate: '2000.00.00', views: '22' },
    { id: 'ssgjt', Name: 'Melisandre', title: '제목입니다', regdate: '2000.00.00', views: '2323' },
  ];
  
   // 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
 const centeredColumns = columns.map(column => ({
  ...column,
  headerAlign: 'center'
}));

  export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const rowsPerPage = 5;
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    const handleSelectionChange = (newSelection) => {
      setSelectedRows(newSelection.selectionModel); // 체크된 ID 목록 업데이트
    };
  
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);
  
    const isDeleteButtonDisabled = selectedRows.length == 0; // 선택된 항목 없으면 삭제 버튼 비활성화
  
    return (
      <div className={adcommons.adcommons__container}>
        <h1 className={adcommons.adcommons__title}>전문가와의 상담 관리</h1>
        <div className={styles.ad703__search}>
          <SearchBar />
        </div>
        <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
        <div className={adcommons.adcommons__buttoncontainer}>
        <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: 'white',
                color: '#9C27B0',
                border: '1px solid #9C27B0',
                borderRadius: '42px',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                }
              }}
              disabled={isDeleteButtonDisabled} // 삭제 버튼 활성화/비활성화
            >
              삭제하기
            </Button>

          </div>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onSelectionModelChange={handleSelectionChange}  // 선택된 항목이 바뀔 때 호출
            selectionModel={selectedRows}  // 선택된 행의 ID를 모델에 반영
            sx={{
              // 셀의 텍스트를 가운데 정렬
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
            }}
          />
        </Paper>
      </div>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)} // 총 페이지 수 계산
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}