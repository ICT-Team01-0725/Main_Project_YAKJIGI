from faker import Faker
import random
import pandas as pd
from datetime import date

# Faker 객체 생성
fake = Faker()

# 변수 설정
num_records = 50  # 생성할 데이터 수

# 날짜 범위 설정 (2024년 12월 15일부터 2025년 1월 13일까지)
start_date = date(2024, 12, 15)
end_date = date(2025, 1, 13)

# 목업 데이터 생성 함수
def generate_mock_data(num_records):
    data = []
    for _ in range(num_records):
        qna_idx = random.randint(1, 100)  # qna_idx 범위 설정
        user_idx = random.randint(1, 50)  # 사용자 인덱스 범위 설정 ( 가상 사용자 : 50명 설정 )
        user_level_idx = random.randint(1, 4)  # 사용자 레벨 인덱스 범위 설정 ( enum 4가지 값 )
        qna_title = fake.sentence(nb_words=5)  # 질문 제목 생성
        qna_question = fake.text(max_nb_chars=300)  # 질문 내용 생성
        qna_q_reg_date = fake.date_between(start_date=start_date, end_date=end_date)  # 질문 등록 날짜 (범위 설정)
        admin_idx = random.randint(1, 10)  # 관리자 인덱스 범위 설정 ( 가상 관리자 : 10명 설정 )
        qna_answer_stat = random.choice([0, 1])  # 답변 상태 (0 = 미답변, 1 = 답변 완료)
        data.append([qna_idx, user_idx, user_level_idx, qna_title, qna_question, qna_q_reg_date, admin_idx, qna_answer_stat])
    
    return data

# 데이터 생성
mock_data = generate_mock_data(num_records)

# pandas DataFrame으로 변환 (보기 편하게 출력하기 위해)
df = pd.DataFrame(mock_data, columns=[
    'qna_idx', 'user_idx', 'user_level_idx', 'qna_title', 'qna_question', 'qna_q_reg_date', 'admin_idx', 'qna_answer_stat'
])

# insert 문 형식으로 출력
insert_statements = []
for row in mock_data:
    insert_statement = f"INSERT INTO board_db.qna_tbl (qna_idx, user_idx, user_level_idx, qna_title, qna_question, qna_q_reg_date, admin_idx, qna_answer_stat) "
    insert_statement += f"VALUES ({row[0]}, {row[1]}, {row[2]}, '{row[3]}', '{row[4]}', '{row[5]}', {row[6]}, {row[7]});"
    insert_statements.append(insert_statement)

# 결과를 지정된 경로에 저장
output_path = 'C:/Users/5/Desktop/data/mock/board_db/qna_tbl/mock_data.sql'

# 디렉토리가 존재하지 않으면 생성
import os
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# SQL 파일로 저장
with open(output_path, 'w', encoding='utf-8') as f:
    for statement in insert_statements:
        f.write(statement + '\n')

# 확인용 출력
for statement in insert_statements[:5]:  # 처음 5개만 출력
    print(statement)
