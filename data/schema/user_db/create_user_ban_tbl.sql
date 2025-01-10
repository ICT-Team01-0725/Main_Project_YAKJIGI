CREATE TABLE user_db.user_ban_tbl (
    user_stop_idx INT AUTO_INCREMENT PRIMARY KEY,
    user_idx INT NOT NULL,
    stop_date DATE NOT NULL,
    stop_period INT NOT NULL,
    stop_end_date DATE NOT NULL,
    stop_reason ENUM('Violation', 'Spam', 'Harassment', 'Other') NOT NULL,
    stop_other TEXT DEFAULT NULL,
    admin_idx INT NOT NULL,
    CONSTRAINT fk_ban_user FOREIGN KEY (user_idx) REFERENCES user_db.user_info_tbl(user_idx),
    CONSTRAINT fk_ban_admin FOREIGN KEY (admin_idx) REFERENCES admin_db.admin_info_tbl(admin_idx)
);
