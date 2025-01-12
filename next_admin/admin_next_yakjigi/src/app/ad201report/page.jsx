'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import styles from '../styles/ad201report.module.css';
import adcommons from "../styles/adcommons.module.css";

function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className={adcommons.adcommons__searchcontainer}>
            <div className={adcommons.adcommons__searchdropdown}>
                <select className={adcommons.adcommons__category} defaultValue="아이디">
                    <option value="아이디">아이디</option>
                    <option value="이름">이름</option>
                    <option value="이메일">이메일</option>
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

export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const [rows, setRows] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedReportDetails, setSelectedReportDetails] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:8080/api/ban/list')
            .then(response => {
                const modifiedRows = response.data.map((item, index) => ({
                    ...item,
                    id: index + 1,
                }));
                setRows(modifiedRows);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

    const handleRowClick = (params) => {
        setSelectedReportDetails(params.row);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedReportDetails(null);
    };

    return (
        <div className={adcommons.adcommons__container}>
            <h1 className={adcommons.adcommons__title}>차단된 사용자 목록</h1>
            <div className={styles.ad201report__search}>
                <SearchBar />
            </div>
            <Paper sx={{ width: '100%' }}>
                <DataGrid
                    rows={currentRows}
                    columns={[
                        { field: 'user_id', headerName: '아이디', width: 150, headerAlign: 'center', align: 'center' },
                        { field: 'user_name', headerName: '이름', width: 110, headerAlign: 'center', align: 'center' },
                        { field: 'user_email', headerName: '이메일', width: 200, headerAlign: 'center', align: 'center' },
                        { field: 'user_reg_date', headerName: '가입일', width: 150, headerAlign: 'center', align: 'center' },
                        { field: 'stop_date', headerName: '차단일', width: 150, headerAlign: 'center', align: 'center' },
                        { field: 'stop_period', headerName: '차단 기간 (일)', width: 150, headerAlign: 'center', align: 'center' },
                        { field: 'stop_end_date', headerName: '차단 종료일', width: 150, headerAlign: 'center', align: 'center' },
                        { field: 'stop_reason', headerName: '차단 사유', width: 250, headerAlign: 'center', align: 'center' },
                    ]}
                    pageSize={rowsPerPage}
                    hideFooterPagination
                    onRowClick={(params) => handleRowClick(params)}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            textAlign: 'center',
                        },
                    }}
                />
            </Paper>
            <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </Stack>

            {openDialog && selectedReportDetails && (
                <div className={styles.ad201report__customDialog}>
                    <div className={styles.ad201report__dialogContent}>
                        <h2>상세 정보</h2>
                        <p>아이디: {selectedReportDetails.user_id}</p>
                        <p>이름: {selectedReportDetails.user_name}</p>
                        <p>이메일: {selectedReportDetails.user_email}</p>
                        <p>가입일: {selectedReportDetails.user_reg_date}</p>
                        <p>차단일: {selectedReportDetails.stop_date}</p>
                        <p>차단 기간: {selectedReportDetails.stop_period}</p>
                        <p>차단 종료일: {selectedReportDetails.stop_end_date}</p>
                        <p>차단 사유: {selectedReportDetails.stop_reason}</p>
                        <Button onClick={handleDialogClose}>닫기</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
