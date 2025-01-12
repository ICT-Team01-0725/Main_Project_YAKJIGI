'use client';

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import adcommons from "../styles/adcommons.module.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '../styles/ad704.module.css';

// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

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

const columns = [
  { field: 'id', headerName: 'idx', width: 207 },
  { field: 'Name', headerName: '작성자 이름', width: 207 },
  { field: 'title', headerName: '제목', width: 400 },
  { field: 'regdate', headerName: '작성일', width: 207 },
  { field: 'answer', headerName: '답변여부', width: 207 },
];

const initialRows = [
  { id: 1, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', answer: 'o' },
  { id: 2, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', answer: 'o' },
  { id: 3, Name: 'Stark', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 4, Name: 'Targaryen', title: '제목입니다', regdate: '2000.00.00', answer: 'o' },
  { id: 5, Name: 'Melisandre', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 6, Name: 'Clifford', title: '제목입니다', regdate: '2000.00.00', answer: 'o' },
  { id: 7, Name: 'Frances', title: '제목입니다', regdate: '2000.00.00', answer: 'o' },
  { id: 8, Name: 'Roxie', title: '제목입니다', regdate: '2000.00.00', answer: 'o' },
  { id: 9, Name: 'Snow', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 10, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 11, Name: 'Lannister', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 12, Name: 'Stark', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 13, Name: 'Targaryen', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
  { id: 14, Name: 'Melisandre', title: '제목입니다', regdate: '2000.00.00', answer: 'x' },
];

// 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
const centeredColumns = columns.map(column => ({
  ...column,
  headerAlign: 'center'
}));

export default function DataTable() {
  const [rows, setRows] = useState(initialRows); // rows 데이터를 상태로 관리
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectionChange = (newSelection) => {
    console.log(newSelection); // 선택된 항목 로그로 확인
    setSelectedRows(newSelection.selectionModel); // 선택된 항목 업데이트
  };

  const handleDelete = () => {
    console.log(selectedRows); // 삭제 전 선택된 항목 확인
    if (selectedRows.length > 0) { // 선택된 항목이 있을 경우에만 삭제 진행
      const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
      setRows(updatedRows); // 삭제 후 rows 상태 업데이트
      setSelectedRows([]); // 삭제 후 선택된 항목 초기화
    } else {
      alert('삭제할 항목을 선택해주세요.');
    }
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>운영진에게 문의</h1>
      <div className={adcommons.adcommons__search}>
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
                },
              }}
              onClick={handleDelete} // 삭제 버튼 클릭 시 handleDelete 호출
            >
              삭제하기
            </Button>

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
                },
              }}
            >
              추가하기
            </Button>
          </div>
          <DataGrid
            rows={currentRows}
            columns={centeredColumns}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onSelectionModelChange={handleSelectionChange} // 선택된 항목이 바뀔 때 호출
            selectionModel={selectedRows} // 선택된 행의 ID를 모델에 반영
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