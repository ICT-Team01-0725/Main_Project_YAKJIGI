import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import styles from '../styles/ad101.module.css';


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
        {/* 차트영역 */}
        <div className={styles.ad101__chart}>
            <div className={styles.ad101__chart1}>
                <h2>chart 1</h2>
            </div>
            <div className={styles.ad101__chart2}>
                <h2>chart 2</h2>
            </div>
        </div>
</div>
  );
}