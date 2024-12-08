import pandas as pd
import json
import numpy as np  

# JSON 파일 경로
json_file = 'C:/Users/5/Desktop/data/seeder/sub3-2/전국폐의약품수거함표준데이터.json'

# JSON 파일 읽기
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 'records' 안에 있는 데이터를 데이터프레임으로 변환
df = pd.DataFrame(data['records'])

# 결측값을 처리: 결측값은 numpy.nan으로 채움
df = df.fillna({
    '설치장소명': np.nan,
    '소재지도로명주소': np.nan,
    '소재지지번주소': np.nan,
    '세부위치': np.nan,
    '위도': np.nan,
    '경도': np.nan
})

# 빈 문자열을 np.nan으로 처리
df['설치장소명'] = df['설치장소명'].replace('', np.nan)
df['소재지도로명주소'] = df['소재지도로명주소'].replace('', np.nan)
df['소재지지번주소'] = df['소재지지번주소'].replace('', np.nan)
df['세부위치'] = df['세부위치'].replace('', np.nan)
df['위도'] = df['위도'].replace('', np.nan)
df['경도'] = df['경도'].replace('', np.nan)

# 새로운 칼럼명으로 변경
df['phar_name'] = df['설치장소명']
df['phar_address_num'] = None  # 'phar_address_num'은 null로 설정
df['phar_address'] = df.apply(
    lambda row: row['소재지도로명주소'] if row['소재지도로명주소'] else row['소재지지번주소'], axis=1
)
df['phar_lat'] = df['위도']
df['phar_long'] = df['경도']

# 필요 없는 칼럼 삭제
df = df[['phar_name', 'phar_address_num', 'phar_address', 'phar_lat', 'phar_long']]

# 데이터 크기 및 각 칼럼의 길이를 다시 확인
print("\nDataframe shape after processing:")
print(df.shape)

# 결과를 새로운 JSON 파일로 저장
output_json_file = 'C:/Users/5/Desktop/data/migration/cleansing/sub302/filtered_sub302.json'
df.to_json(output_json_file, orient='records', lines=False, force_ascii=False)

# 출력하여 확인
print(df)
