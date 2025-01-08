import pandas as pd
import json
import chardet

# CSV 파일 경로 설정
file_path = 'C:/Users/5/Desktop/data/seeder/sub203/의약품안전사용서비스(DUR)_병용금기.csv'

# 인코딩 자동 감지
with open(file_path, 'rb') as f:
    result = chardet.detect(f.read())
    detected_encoding = result['encoding']
    print(f"Detected Encoding: {detected_encoding}")

# CSV 파일 읽기 (감지된 인코딩 사용)
df = pd.read_csv(file_path, encoding=detected_encoding)

# 이후 데이터 처리
def refine_data(df):
    result = []
    grouped = df.groupby(['제품명A', '업소명A', '성분명A', '성분코드A', '구분A'])

    for group_keys, group_data in grouped:
        top_level = {
            '제품명A': group_keys[0],
            '업소명A': group_keys[1],
            '성분명A': group_keys[2],
            '성분코드A': group_keys[3],
            '구분A': group_keys[4],
            '하위세트': []
        }

        for _, row in group_data.iterrows():
            sub_item = {
                '제품명B': row['제품명B'],
                '업소명B': row['업소명B'],
                '성분명B': row['성분명B'],
                '금기사유': row['금기사유']
            }
            top_level['하위세트'].append(sub_item)

        result.append(top_level)

    return result

refined_data = refine_data(df)

# JSON 파일 저장
output_path = 'C:/Users/5/Desktop/data/migration/cleansing/sub203/grouped_sub203_data.json'
with open(output_path, 'w', encoding='utf-8') as json_file:
    json.dump(refined_data, json_file, ensure_ascii=False, indent=4)

print(f"그룹화된 데이터가 {output_path}에 저장되었습니다.")
