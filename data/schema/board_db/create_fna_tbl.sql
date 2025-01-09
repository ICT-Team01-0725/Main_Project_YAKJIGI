CREATE TABLE board_db.fna_tbl (
    fna_idx INT PRIMARY KEY,  
    admin_idx INT, 
    fna_question VARCHAR(500) NOT NULL, 
    fna_answer VARCHAR(500) NOT NULL, 
    fna_reg_date DATE NOT NULL, 
    fna_up_date DATE NULL, 
    fna_delete TINYINT NOT NULL, 
    fna_out_date DATE NULL, 
    CONSTRAINT fna_fk_admin FOREIGN KEY (admin_idx) REFERENCES admin_db.admin_info_tbl(admin_idx)
);
