from faker import Faker
import random
import pandas as pd
from datetime import date, timedelta
import os

# Faker 객체 생성
fake = Faker()

# 변수 설정
num_records = 100  # 생성할 데이터 수
start_date = date(2024, 12, 15)  # 시작 날짜
end_date = date(2025, 1, 13)  # 종료 날짜

# 목업 데이터 생성 함수
def generate_mock_data(num_records):
    data = []
    for i in range(1, num_records + 1):
        fna_idx = i  # fna_idx는 1부터 num_records까지 고유값 (목업용 글의 개수 지정)
        admin_idx = random.randint(1, 10)  # 관리자 인덱스 (admin_idx 로 설정된 1~10 중 랜덤)
        fna_question = fake.sentence(nb_words=8)  # 질문 내용 (단어개수 제한)
        fna_answer = fake.sentence(nb_words=12)  # 답변 내용 (단어개수 제한)
        fna_reg_date = fake.date_between(start_date=start_date, end_date=end_date)  # 등록 날짜
        fna_up_date = (
            fake.date_between(start_date=fna_reg_date + timedelta(days=1), end_date=end_date)
            if random.choice([True, False]) else None
        )  # 업데이트 날짜 (50% 확률로 랜덤 지정)
        fna_delete = random.choice([0, 1])  # 삭제 여부 (0: 유지, 1: 삭제)
        fna_out_date = (
            fake.date_between(start_date=fna_reg_date + timedelta(days=1), end_date=date(2025, 12, 31))
            if fna_delete == 1 else None
        )  # 삭제된 경우 만료일 설정
        
        data.append([
            fna_idx, admin_idx, fna_question, fna_answer, fna_reg_date,
            fna_up_date, fna_delete, fna_out_date
        ])
    return data

# 데이터 생성
mock_data = generate_mock_data(num_records)

# pandas DataFrame으로 변환
df = pd.DataFrame(mock_data, columns=[
    'fna_idx', 'admin_idx', 'fna_question', 'fna_answer', 'fna_reg_date',
    'fna_up_date', 'fna_delete', 'fna_out_date'
])

# insert 문 형식으로 출력
insert_statements = []
for row in mock_data:
    insert_statement = f"INSERT INTO board_db.fna_tbl (fna_idx, admin_idx, fna_question, fna_answer, fna_reg_date, fna_up_date, fna_delete, fna_out_date) "
    insert_statement += f"VALUES ({row[0]}, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', "
    insert_statement += f"{f'\'{row[5]}\'' if row[5] else 'NULL'}, {row[6]}, {f'\'{row[7]}\'' if row[7] else 'NULL'});"
    insert_statements.append(insert_statement)

# 결과를 지정된 경로에 저장
output_path = 'C:/Users/5/Desktop/data/mock/board_db/fna_tbl/mock_fna.sql'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    for statement in insert_statements:
        f.write(statement + '\n')

