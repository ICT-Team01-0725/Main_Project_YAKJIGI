CREATE TABLE user_db.user_level_tbl (
    user_level_idx INT AUTO_INCREMENT PRIMARY KEY,
    user_level_name ENUM('General', 'ProPen', 'ProApr', 'ProDecl') NOT NULL,
    user_level_desc VARCHAR(100),
    user_license ENUM('일반', '약사면허', '의사면허') DEFAULT '일반'
);
