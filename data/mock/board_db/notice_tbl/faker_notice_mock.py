from faker import Faker
import random
import pandas as pd
from datetime import date, timedelta
import os

# Faker 객체 생성
fake = Faker()

# 변수 설정
num_records = 50  # 생성할 데이터 수
start_date = date(2024, 12, 15)  # 시작 날짜
end_date = date(2025, 1, 13)  # 종료 날짜

# 목업 데이터 생성 함수
def generate_mock_data(num_records):
    data = []
    for _ in range(num_records):
        notice_idx = random.randint(1, 100)  # notice_idx 범위 설정
        admin_idx = random.randint(1, 10)  # 관리자 인덱스 (가상 관리자: 10명 설정)
        notice_title = fake.sentence(nb_words=5)  # 공지 제목 생성
        notice_content = fake.paragraph(nb_sentences=5)  # 공지 내용 생성
        notice_reg_date = fake.date_between(start_date=start_date, end_date=end_date)  # 공지 등록 날짜
        notice_file = fake.file_path(depth=1, category='text') if random.choice([True, False]) else None  # 첨부 파일 경로
        notice_file_name = fake.file_name(category='text') if notice_file else None  # 첨부 파일 이름
        notice_delete = random.choice([0, 1])  # 삭제 여부 (0: 유지, 1: 삭제)
        
        # 삭제된 경우 만료일 설정 (등록일 이후 날짜, 최대 2025-12-31까지)
        notice_out_date = (
            fake.date_between(start_date=notice_reg_date + timedelta(days=1), end_date=date(2025, 12, 31))
            if notice_delete == 1 else None
        )
        
        data.append([
            notice_idx, admin_idx, notice_title, notice_content, notice_reg_date,
            notice_file, notice_file_name, notice_delete, notice_out_date
        ])
    return data

# 데이터 생성
mock_data = generate_mock_data(num_records)

# pandas DataFrame으로 변환 (보기 편하게 출력하기 위해)
df = pd.DataFrame(mock_data, columns=[
    'notice_idx', 'admin_idx', 'notice_title', 'notice_content', 'notice_reg_date',
    'notice_file', 'notice_file_name', 'notice_delete', 'notice_out_date'
])

# insert 문 형식으로 출력
insert_statements = []
for row in mock_data:
    insert_statement = f"INSERT INTO board_db.notice_tbl (notice_idx, admin_idx, notice_title, notice_content, notice_reg_date, notice_file, notice_file_name, notice_delete, notice_out_date) "
    insert_statement += f"VALUES ({row[0]}, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', "
    insert_statement += f"{f'\'{row[5]}\'' if row[5] else 'NULL'}, {f'\'{row[6]}\'' if row[6] else 'NULL'}, {row[7]}, {f'\'{row[8]}\'' if row[8] else 'NULL'});"
    insert_statements.append(insert_statement)

# 결과를 지정된 경로에 저장
output_path = 'C:/Users/5/Desktop/data/mock/board_db/notice_tbl/mock_notice.sql'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    for statement in insert_statements:
        f.write(statement + '\n')