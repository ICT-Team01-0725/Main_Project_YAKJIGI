CREATE TABLE admin_db.admin_info_tbl (
    admin_idx INT AUTO_INCREMENT PRIMARY KEY,
    admin_id VARCHAR(50) NOT NULL,
    admin_level_idx INT NOT NULL,
    admin_pw VARCHAR(100) NOT NULL,
    admin_profile VARCHAR(255) DEFAULT NULL,
    admin_profile_name VARCHAR(255) DEFAULT NULL,
    admin_name VARCHAR(50) NOT NULL,
    admin_nickname VARCHAR(50),
    admin_email VARCHAR(100),
    admin_phone VARCHAR(20),
    admin_out TINYINT DEFAULT 0,
    CONSTRAINT fk_admin_level FOREIGN KEY (admin_level_idx) REFERENCES admin_db.admin_level_tbl(admin_level_idx)
);
