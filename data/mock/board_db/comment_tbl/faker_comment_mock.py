from faker import Faker
import random
import pandas as pd
from datetime import date, timedelta
import os

# Faker 객체 생성
fake = Faker()

# 변수 설정
num_records = 100  # 생성할 데이터 수
start_date = date(2024, 12, 15)
end_date = date(2025, 1, 13)

# 날짜 문자열을 datetime.date 객체로 변환하는 함수 (자료형 이슈 해결)
def str_to_date(date_str):
    return date.fromisoformat(date_str)

# 목업 데이터 생성 함수
def generate_mock_data(num_records):
    data = []
    for _ in range(num_records):
        comment_idx = random.randint(1, 100)  # 댓글 고유 인덱스 범위 설정 (데이터 개수와 일치)
        user_idx = random.randint(1, 50)  # 사용자 인덱스 범위 설정 ( 가상 사용자 : 50명 설정 )
        admin_idx = random.randint(1, 10)  # 관리자 인덱스 범위 설정 ( 가상 관리자 : 10명 설정 ) 
        comment_content = fake.sentence(nb_words=10)  # 댓글 내용
        comment_reg_date = fake.date_between(start_date=start_date, end_date=end_date)  # 댓글 등록일
        comment_update = random.choice([0, 1])  # 댓글 수정 여부 (0: 수정되지 않음, 1: 수정됨)
        comment_delete = random.choice([0, 1])  # 댓글 삭제 여부 (0: 삭제되지 않음, 1: 삭제됨)
        comment_board = random.choice(['notice', 'qna'])  # 게시판 종류 (공지사항 or 질문/답변)
        
        # 첨부파일 및 파일명 생성
        comment_file = None
        comment_file_name = None
        if random.choice([True, False]):  # 첨부파일이 있을 수도 있고 없을 수도 있는 경우 고려 
            comment_file = f"/files/{fake.word()}.jpg"
            comment_file_name = fake.word() + ".jpg"
        
        # 공지사항 또는 질문/답변 인덱스 생성
        notice_idx = None
        qna_idx = None
        if comment_board == 'notice':
            notice_idx = random.randint(1, 50)  # 범위 설정
        else:
            qna_idx = random.randint(1, 50)  # 범위 설정
        
        # 데이터 리스트에 추가
        data.append([
            comment_idx, user_idx, admin_idx, comment_content, comment_reg_date, 
            comment_update, comment_delete, comment_board, comment_file, comment_file_name, 
            notice_idx, qna_idx
        ])
    
    return data

# 데이터 생성
mock_data = generate_mock_data(num_records)

# pandas DataFrame으로 변환 
df = pd.DataFrame(mock_data, columns=[
    'comment_idx', 'user_idx', 'admin_idx', 'comment_content', 'comment_reg_date',
    'comment_update', 'comment_delete', 'comment_board', 'comment_file', 'comment_file_name',
    'notice_idx', 'qna_idx'
])

# insert 문 형식으로 출력
insert_statements = []
for row in mock_data:
    insert_statement = f"INSERT INTO board_db.comment_tbl (comment_idx, user_idx, admin_idx, comment_content, comment_reg_date, comment_update, comment_delete, comment_board, comment_file, comment_file_name, notice_idx, qna_idx) "
    insert_statement += f"VALUES ({row[0]}, {row[1]}, {row[2]}, '{row[3]}', '{row[4]}', {row[5]}, {row[6]}, '{row[7]}', "
    insert_statement += f"{f'\'{row[8]}\'' if row[8] else 'NULL'}, {f'\'{row[9]}\'' if row[9] else 'NULL'}, "
    insert_statement += f"{f'{row[10]}' if row[10] else 'NULL'}, {f'{row[11]}' if row[11] else 'NULL'});"
    insert_statements.append(insert_statement)

# 결과를 지정된 경로에 저장
output_path = 'C:/Users/5/Desktop/data/mock/board_db/comment_tbl/mock_comment.sql'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    for statement in insert_statements:
        f.write(statement + '\n')
