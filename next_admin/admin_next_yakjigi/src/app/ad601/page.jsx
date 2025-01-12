"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import adcommons from "../styles/adcommons.module.css";
import styles from '../styles/ad601.module.css';
import axios from 'axios';

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className={adcommons.adcommons__searchcontainer}>
      {/* 검색바 */}
      <div className={adcommons.adcommons__searchbar}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}

export default function DataTable() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [rows, setRows] = useState([]); // 서버에서 가져온 데이터 상태
  const [filteredRows, setFilteredRows] = useState([]); // 필터링된 데이터 상태
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 5;
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/phar_info/list');
      console.log("서버에서 가져온 데이터:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setRows(response.data.data);
      }
    } catch (error) {
      console.log("데이터를 가져오지 못했습니다", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 페이지 로드 시 필터링되지 않은 모든 데이터로 초기화
    setFilteredRows(rows);
  }, [rows]);

  const isDeleteButtonDisabled = selectedRows.length === 0; // 선택된 항목 없으면 삭제 버튼 비활성화

  // 검색어에 맞는 데이터 필터링
  const handleSearch = () => {
    console.log("검색어:", searchQuery); // 검색어 출력
    const filtered = rows.filter(row => {
      const pharNameMatch = row.phar_name.toLowerCase().includes(searchQuery.toLowerCase());
      const pharAddressMatch = row.phar_address.toLowerCase().includes(searchQuery.toLowerCase());

      if (pharNameMatch || pharAddressMatch) {
        console.log("일치하는 항목:", row); // 일치하는 항목 출력
      }

      return pharNameMatch || pharAddressMatch;
    });

    console.log("필터링된 데이터:", filtered); // 필터링된 데이터 출력
    setFilteredRows(filtered); // 필터링된 데이터 상태 업데이트
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };

  // 데이터 행 클릭 시 상세보기 페이지로 이동
  const handleRowClick = (params) => {
    const { phar_idx } = params.row;
    router.push(`/ad601detail?phar_idx=${phar_idx}`);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>약국 찾아보기</h1>
      <div className={styles.ad601__search}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </div>

      <div className={adcommons.adcommons__buttoncontainer} style={{ marginTop: "25px" }}>
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
          disabled={isDeleteButtonDisabled} // 삭제 버튼 활성화/비활성화
        >
          삭제하기
        </Button>

        <Link href="/ad601write" passHref>
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
        </Link>
      </div>

      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <DataGrid
           rows={currentRows}
            columns={[
              { field: 'phar_idx', headerName: 'ID', width: 150, align: 'center' },
              { field: 'phar_name', headerName: '약국명', width: 200, align: 'center' },
              { field: 'phar_address', headerName: '주소', width: 900, align: 'center' },
            ]}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination
            hideFooter
            scrollbarSize={0}
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedRows}
            onRowClick={handleRowClick}
            getRowId={(row) => row.phar_idx} // 반드시 `phar_idx`를 고유 ID로 사용
          />
        </Paper>
      </div>

      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}
