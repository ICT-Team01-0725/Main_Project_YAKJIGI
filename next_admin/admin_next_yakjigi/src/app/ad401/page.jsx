import React from 'react';
import styles from '../styles/ad401.module.css'
import adcommons from "../styles/adcommons.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Page(props) {


    return (
        <>

            <div className={adcommons.adcommons__main_background_color}>
                <div className={adcommons.adcommons__main_container}>
                    <p className={adcommons.adcommons__main_name}>의약품 정의</p>
                    <div className={adcommons.adcommons__main_container_box}>
                        <div className={adcommons.adcommons__main_title}>메인 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="메인 타이틀" id="fullWidth"  />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__main_content_textarea}>
                        <div className={adcommons.adcommons__main_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                               
                            />
                        </div>
                    </div>


                    <div className={adcommons.adcommons__sub1_container_box}>
                        <div className={adcommons.adcommons__sub1_title}>서브1 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="서브1 타이틀" id="fullWidth"/>
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub1_content_textarea}>
                        <div className={adcommons.adcommons__sub1_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                                
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub2_container_box}>
                        <div className={adcommons.adcommons__sub2_title}>서브2 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="서브2 타이틀" id="fullWidth"
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub2_content_textarea}>
                        <div className={adcommons.adcommons__sub2_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                                
                            />
                        </div>
                    </div>

                    <div className={adcommons.adcommons__sub3_container_box}>
                        <div className={adcommons.adcommons__sub3_title}>서브3 타이틀</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField fullWidth label="서브3 타이틀" id="fullWidth" 
                            />
                        </div>

                    </div>

                    <div className={adcommons.adcommons__sub3_content_textarea}>
                        <div className={adcommons.adcommons__sub3_content}>내용</div>
                        <div className={adcommons.adcommons__box}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline
                                maxRows={4}
                                rows={4}
                                fullWidth
                                
                            />
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