from faker import Faker
import random
import pandas as pd
from datetime import date, timedelta
import os

# Faker 객체 생성
fake = Faker()

# 변수 설정
num_records = 150 # 생성할 데이터 수
start_date = date(2024, 12, 15)
end_date = date(2025, 1, 13)

# 날짜 문자열을 datetime.date 객체로 변환하는 함수
def str_to_date(date_str):
    return date.fromisoformat(date_str)

# 목업 데이터 생성 함수
def generate_mock_data(num_records):
    data = []
    for _ in range(num_records):
        counsel_idx = random.randint(1, 150)  # 상담 고유 인덱스 범위 설정 (데이터 개수와 통일)
        user_idx = random.randint(1, 50)  # 사용자 인덱스 범위 설정 (예: 50명의 사용자)
        question_date = fake.date_between(start_date=start_date, end_date=end_date)  # 질문 등록일
        question_title = fake.sentence(nb_words=5)  # 질문 제목
        question_content = fake.paragraph(nb_sentences=5)  # 질문 내용
        counsel_open = random.choice([0, 1])  # 상담 진행상황 (0: 상담미완, 1: 상담완료)
        
        # 상담 진행상황에 따라 답변 내용 및 답변일 생성
        if counsel_open == 1:
            response_content = fake.paragraph(nb_sentences=3)  # 상담 답변 내용
            response_date = fake.date_between(start_date=question_date, end_date=end_date)  # 답변 등록일
            counsel_out_date = fake.date_between(start_date=response_date, end_date=str_to_date("2025-12-31"))  # 답변 삭제일
        else:
            response_content = None
            response_date = None
            counsel_out_date = None
        
        counsel_delete = random.choice([0, 1])  # 상담 삭제 여부 (0: 삭제되지 않음, 1: 삭제됨)

        # 데이터 리스트에 추가
        data.append([
            counsel_idx, user_idx, question_date, question_title, question_content,
            counsel_open, response_content, response_date, counsel_out_date, counsel_delete
        ])
    
    return data

# 데이터 생성
mock_data = generate_mock_data(num_records)

# pandas DataFrame으로 변환 (보기 편하게 출력하기 위해)
df = pd.DataFrame(mock_data, columns=[
    'counsel_idx', 'user_idx', 'question_date', 'question_title', 'question_content',
    'counsel_open', 'response_content', 'response_date', 'counsel_out_date', 'counsel_delete'
])

# insert 문 형식으로 출력
insert_statements = []
for row in mock_data:
    insert_statement = f"INSERT INTO board_db.counsel_tbl (counsel_idx, user_idx, question_date, question_title, question_content, counsel_open, response_content, response_date, counsel_out_date, counsel_delete) "
    insert_statement += f"VALUES ({row[0]}, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', {row[5]}, "
    insert_statement += f"{f'\'{row[6]}\'' if row[6] else 'NULL'}, {f'\'{row[7]}\'' if row[7] else 'NULL'}, {f'\'{row[8]}\'' if row[8] else 'NULL'}, {row[9]});"
    insert_statements.append(insert_statement)

# 결과를 지정된 경로에 저장
output_path = 'C:/Users/5/Desktop/data/mock/board_db/counsel_tbl/mock_counsel.sql'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    for statement in insert_statements:
        f.write(statement + '\n')