CREATE TABLE board_db.comment_tbl (
    comment_idx INT PRIMARY KEY, 
    user_idx INT NULL, 
    admin_idx INT NULL, 
    comment_content VARCHAR(200) NULL, 
    comment_reg_date DATE NOT NULL, 
    comment_update TINYINT NOT NULL, 
    comment_delete TINYINT NOT NULL, 
    comment_board ENUM('notice', 'qna') NOT NULL, 
    comment_file VARCHAR(255) NULL, 
    comment_file_name TEXT NULL, 
    notice_idx INT NULL, 
    qna_idx INT NULL, 
    CONSTRAINT comment_fk_user FOREIGN KEY (user_idx) REFERENCES user_db.user_info_tbl(user_idx), 
    CONSTRAINT comment_fk_admin FOREIGN KEY (admin_idx) REFERENCES admin_db.admin_info_tbl(admin_idx), 
    CONSTRAINT comment_fk_notice FOREIGN KEY (notice_idx) REFERENCES board_db.notice_tbl(notice_idx), 
    CONSTRAINT comment_fk_qna FOREIGN KEY (qna_idx) REFERENCES board_db.qna_tbl(qna_idx) 
);
