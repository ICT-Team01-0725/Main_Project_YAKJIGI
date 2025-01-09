CREATE TABLE board_db.qna_tbl (
    qna_idx INT PRIMARY KEY, 
    user_idx INT, 
    user_level_idx INT, 
    qna_title VARCHAR(100) NOT NULL, 
    qna_question TEXT NULL,
    qna_q_reg_date DATE NOT NULL,
    admin_idx INT, 
    qna_answer_stat TINYINT NOT NULL, 
    CONSTRAINT qna_fk_user FOREIGN KEY (user_idx) REFERENCES user_db.user_info_tbl(user_idx), 
    CONSTRAINT qna_fk_user_level FOREIGN KEY (user_level_idx) REFERENCES user_db.user_level_tbl(user_level_idx) 
);
