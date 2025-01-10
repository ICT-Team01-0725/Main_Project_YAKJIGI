CREATE TABLE admin_db.admin_level_tbl (
    admin_level_idx INT AUTO_INCREMENT PRIMARY KEY,
    admin_level_name ENUM('Super', 'GeneralApr', 'GeneralSus') NOT NULL,
    admin_level_desc VARCHAR(100)
);
