CREATE TABLE board_db.notice_tbl (
    notice_idx INT PRIMARY KEY, 
    admin_idx INT, 
    notice_title VARCHAR(100) NOT NULL, 
    notice_content TEXT NULL, 
    notice_reg_date DATE NOT NULL, 
    notice_file VARCHAR(255) NULL, 
    notice_file_name TEXT NULL, 
    notice_delete TINYINT NOT NULL, 
    notice_out_date DATE NULL, 
    CONSTRAINT notice_fk_admin FOREIGN KEY (admin_idx) REFERENCES admin_db.admin_info_tbl(admin_idx)
);
