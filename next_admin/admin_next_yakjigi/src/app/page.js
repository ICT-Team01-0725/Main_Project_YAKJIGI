import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import styles from './styles/page.module.css';


// 테이블1 데이터
const columns1 = [
    { field: 'idx', headerName: '회원번호', width: 90 },
    { field: 'id', headerName: '아이디', width: 130 },
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'nickname', headerName: '닉네임', width: 150 },
    { field: 'level', headerName: '등급', sortable: false, width: 120 }
];

const rows1 = [
    { idx: 'user_idx', id: 'user_id', name: 'user_name', nickname: 'user_nickname', level: 'user_level' },
    { idx: '2', id: 'safw', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '3', id: 'wqerwe', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '4', id: 'sdfhh', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '5', id: 'sdfy', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '6', id: 'gfds', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '7', id: 'sfsew', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '8', id: 'as23', name: 'hong', nickname: 'nickname', level: '일반' },
    { idx: '9', id: 'df33', name: 'hong', nickname: 'nickname', level: '일반' }
];

// 테이블2 데이터
const columns2 = [
    { field: 'id', headerName: '문의 번호', width: 100 },
    { field: 'title', headerName: '문의 제목', width: 220 },
    { field: 'regdate', headerName: '문의 일자', width: 140 },
    { field: 'answer', headerName: '답변 여부', width: 100 }
];

const rows2 = [
    { id: 'qna_idx', title: 'qna_title', regdate: 'qna_regdate', answer: 'qna_answer' },
    { id: '2', title: '제목입니다', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '3', title: '제목입니다', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '4', title: '제목입니다', regdate: '2024.00.00', answer: '답변 대기' },
    { id: '5', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '6', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '7', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '8', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' },
    { id: '9', title: '제목입니다', regdate: '2024.00.00', answer: '답변 완료' }
];


const paginationModel = { page: 0, pageSize: 5 };

export default function HomePage() {
  return (
    <div className={styles.ad101__container}>
        {/* 그래프 영역 */}
        <div className={styles.ad101__graph}>
            <div className={styles.ad101__graph1}>
                <h2>Graph 1</h2>
            </div>
            <div className={styles.ad101__graph2}>
                <h2>Graph 2</h2>
            </div>
        </div>

        {/* 테이블 영역 */}
        <div className={styles.ad101__table}>
            <div className={styles.ad101__table1}>
                <div className={styles.ad101__table1menu}>
                    <h2 className={styles.ad101__table1title}>회원 관리</h2>
                    <h4 className={styles.ad101__tablemenu}>더보기
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                    </h4>
                </div>
                <Paper>
                    <DataGrid
                        rows={rows1}
                        columns={columns1}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                textAlign: 'center', // 모든 셀을 가운데 정렬
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                textAlign: 'center', // 헤더도 가운데 정렬
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                textAlign: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />
                </Paper>
            </div>
            <div className={styles.ad101__table2}>
                <div className={styles.ad101__table2menu}>
                    <h2 className={styles.ad101__table2title}>문의 내역</h2>
                    <h4 className={styles.ad101__tablemenu} style={{ fontSize: '16px' }}>더보기
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                    </h4>
                </div>
                <Paper>
                    <DataGrid
                        rows={rows2}
                        columns={columns2}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                textAlign: 'center', // 모든 셀을 가운데 정렬
                            },
                            '& .MuiDataGrid-columnHeader': {
                                textAlign: 'center', // 헤더도 가운데 정렬
                                justifyContent: 'center',
                                display: 'flex',
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                textAlign: 'center',
                                justifyContent: 'center',
                            }
                        }}
                    />
                </Paper>
            </div>
        </div>
             {/* 알림 아이콘 */}
             <div className={styles.ad101__notification}>
  <div className={styles.ad101__notificationicon}>
    <span className={`${styles.ad101__notificationicon} material-symbols-outlined`}>
      notifications
    </span>
    <div className={styles.ad101__notificationbadge1}>1</div>
  </div>
  
  <div className={styles.ad101__notificationicon}>
    <span className={`${styles.ad101__notificationicon} material-symbols-outlined`}>
      notifications
    </span>
    <div className={styles.ad101__notificationbadge2}>5</div>
  </div>

  <div className={styles.ad101__notificationicon}>
    <span className={`${styles.ad101__notificationicon} material-symbols-outlined`}>
      notifications
    </span>
    <div className={styles.ad101__notificationbadge3}>9+</div>
  </div>
</div>
</div>
  );
}