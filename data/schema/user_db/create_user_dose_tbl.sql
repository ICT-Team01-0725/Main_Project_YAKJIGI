CREATE TABLE user_db.user_dose_tbl (
    dose_idx INT AUTO_INCREMENT PRIMARY KEY,
    post_num INT NOT NULL,
    user_idx INT NOT NULL,
    dose_date DATE NOT NULL,
    medi_name VARCHAR(200) NOT NULL,
    dose_way VARCHAR(50) DEFAULT NULL,
    dose_purpose VARCHAR(50) DEFAULT NULL,
    dose_other VARCHAR(150) DEFAULT NULL,
    CONSTRAINT fk_dose_user FOREIGN KEY (user_idx) REFERENCES user_db.user_info_tbl(user_idx)
);
