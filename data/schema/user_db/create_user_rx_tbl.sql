CREATE TABLE user_db.user_rx_tbl (
    rx_idx INT AUTO_INCREMENT PRIMARY KEY,
    post_num INT NOT NULL,
    user_idx INT NOT NULL,
    rx_date DATE NOT NULL,
    rx_phar_name VARCHAR(50) NOT NULL,
    rx_pst_name VARCHAR(50) DEFAULT NULL,
    dose_way VARCHAR(50) DEFAULT NULL,
    drug_idx INT DEFAULT NULL,
    phar_idx INT DEFAULT NULL,
    rx_other TEXT DEFAULT NULL,
    rx_photo VARCHAR(255) DEFAULT NULL,
    CONSTRAINT fk_rx_user FOREIGN KEY (user_idx) REFERENCES user_db.user_info_tbl(user_idx),
    CONSTRAINT fk_rx_phar FOREIGN KEY (phar_idx) REFERENCES pharmacy_db.pharmacy_info_tbl(phar_idx)
);
