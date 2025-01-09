CREATE TABLE board_db.counsel_tbl (
    counsel_idx INT PRIMARY KEY, 
    user_idx INT, 
    question_date DATE NOT NULL, 
    question_title VARCHAR(100) NOT NULL, 
    question_content TEXT NOT NULL, 
    counsel_open TINYINT NOT NULL, 
    response_content TEXT NULL, 
    response_date DATE NULL, 
    counsel_out_date DATE NULL, 
    counsel_delete TINYINT NOT NULL, 
    CONSTRAINT counsel_fk_user FOREIGN KEY (user_idx) REFERENCES user_db.user_info_tbl(user_idx)
);
