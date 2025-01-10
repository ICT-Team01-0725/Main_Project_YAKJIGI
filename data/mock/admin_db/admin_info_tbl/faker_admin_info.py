from faker import Faker
import random
import pandas as pd
from datetime import date
import os

# Faker 객체 생성
fake = Faker()

# 변수 설정 (관리자 등급 케이스 설정으로 인해 인원수 지정)
num_super_admin = 1  # Super 관리자 수
num_general_apr = 7  # GeneralApr 관리자 수
num_general_sus = 2  # GeneralSus 관리자 수

# 날짜 문자열을 datetime.date 객체로 변환하는 함수
def str_to_date(date_str):
    return date.fromisoformat(date_str)

# 목업 데이터 생성 함수
def generate_mock_data():
    data = []
    # Super 관리자 (1명)
    super_admin = {
        'admin_idx': 1,
        'admin_id': fake.user_name(),
        'admin_level_idx': 1,
        'admin_pw': fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True),
        'admin_profile': f"/profiles/{fake.word()}.jpg",
        'admin_profile_name': fake.word() + ".jpg",
        'admin_name': fake.name(),
        'admin_nickname': fake.first_name(),
        'admin_email': fake.email(),
        'admin_phone': fake.phone_number(),
        'admin_out': random.choice([0, 1])
    }
    data.append(super_admin)
    
    # GeneralApr 관리자 (7명)
    for _ in range(num_general_apr):
        admin = {
            'admin_idx': len(data) + 1,
            'admin_id': fake.user_name(),
            'admin_level_idx': 2,
            'admin_pw': fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True),
            'admin_profile': f"/profiles/{fake.word()}.jpg" if random.choice([True, False]) else None,
            'admin_profile_name': fake.word() + ".jpg" if random.choice([True, False]) else None,
            'admin_name': fake.name(),
            'admin_nickname': fake.first_name(),
            'admin_email': fake.email(),
            'admin_phone': fake.phone_number(),
            'admin_out': random.choice([0, 1])
        }
        data.append(admin)
    
    # GeneralSus 관리자 (2명)
    for _ in range(num_general_sus):
        admin = {
            'admin_idx': len(data) + 1,
            'admin_id': fake.user_name(),
            'admin_level_idx': 3,
            'admin_pw': fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True),
            'admin_profile': f"/profiles/{fake.word()}.jpg" if random.choice([True, False]) else None,
            'admin_profile_name': fake.word() + ".jpg" if random.choice([True, False]) else None,
            'admin_name': fake.name(),
            'admin_nickname': fake.first_name(),
            'admin_email': fake.email(),
            'admin_phone': fake.phone_number(),
            'admin_out': random.choice([0, 1])
        }
        data.append(admin)
    
    return data

# 데이터 생성
mock_data = generate_mock_data()

# pandas DataFrame으로 변환
df = pd.DataFrame(mock_data, columns=[
    'admin_idx', 'admin_id', 'admin_level_idx', 'admin_pw', 'admin_profile', 'admin_profile_name',
    'admin_name', 'admin_nickname', 'admin_email', 'admin_phone', 'admin_out'
])

# insert 문 형식으로 출력
insert_statements = []
for row in mock_data:
    insert_statement = f"INSERT INTO admin_db.admin_info_tbl (admin_idx, admin_id, admin_level_idx, admin_pw, admin_profile, admin_profile_name, admin_name, admin_nickname, admin_email, admin_phone, admin_out) "
    insert_statement += f"VALUES ({row['admin_idx']}, '{row['admin_id']}', {row['admin_level_idx']}, '{row['admin_pw']}', "
    insert_statement += f"{f'\'{row['admin_profile']}\'' if row['admin_profile'] else 'NULL'}, {f'\'{row['admin_profile_name']}\'' if row['admin_profile_name'] else 'NULL'}, "
    insert_statement += f"'{row['admin_name']}', '{row['admin_nickname']}', '{row['admin_email']}', '{row['admin_phone']}', {row['admin_out']});"
    insert_statements.append(insert_statement)

# 결과를 지정된 경로에 저장
output_path = 'C:/Users/5/Desktop/data/mock/admin_db/admin_info_tbl/mock_admin.sql'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    for statement in insert_statements:
        f.write(statement + '\n')
        