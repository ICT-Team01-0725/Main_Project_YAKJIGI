import React from 'react';
import styles from '../styles/ad401.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import adcommons from "../styles/adcommons.module.css";

function Page(props) {


    return (
        <>

            <div className={adcommons.adcommons__main_background_color}>
                <div className={adcommons.adcommons__main_container}>
                    <p className={adcommons.adcommons__main_name}>법령 API 관리창</p>
                    
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>법률 API URL</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="법률 URL" id="fullWidth"  />
                        </div>
                    </div>
                    
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>대통령령 API URL</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="대통령령 URL" id="fullWidth"  />
                        </div>
                    </div>
                    
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>총리령 API URL</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="총리령 URL" id="fullWidth"  />
                        </div>
                    </div>
                    
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>고시 API URL</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="고시 URL" id="fullWidth"  />
                        </div>
                    </div>

                   
                    <div className={adcommons.adcommons__button_box}>
                        <Button
                            variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                            size="medium"
                            sx={{
                                backgroundColor: 'white',  // 배경을 흰색으로 설정
                                color: '#9e9e9e',  // 글자 색상 #9e9e9e
                                border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                                '&:hover': {
                                    backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                                    color: 'white',  // hover 시 글자 색상 흰색
                                    border: '1px solid #9e9e9e',  // hover 시 보더 색상
                                    
                                }
                            }} 
                        >
                            저장
                        </Button>

                        <Button
                            variant="outlined"  // 버튼의 기본 스타일을 outlined로 설정 (배경이 투명)
                            size="medium"
                            sx={{
                                marginLeft : '15px',
                                backgroundColor: 'white',  // 배경을 흰색으로 설정
                                color: '#9e9e9e',  // 글자 색상 #9e9e9e
                                border: '1px solid #9e9e9e',  // 보더 색상 #9e9e9e
                                '&:hover': {
                                    backgroundColor: 'secondary.main',  // hover 시 배경 색상 (secondary 색상)
                                    color: 'white',  // hover 시 글자 색상 흰색
                                    border: '1px solid #9e9e9e',  // hover 시 보더 색상
                                    
                                }
                                
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