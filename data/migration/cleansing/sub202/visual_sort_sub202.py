import pandas as pd
import json

# 기존 JSON 파일 경로
input_file = "C:/Users/5/Desktop/data/migration/cleansing/sub202/merged_sub202_data.json"
# 시각화용 JSON 파일 경로
output_file = "C:/Users/5/Desktop/data/migration/cleansing/sub202/visualized_sub202.json"

# JSON 파일 로드
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# JSON 데이터를 pandas DataFrame으로 변환
df = pd.DataFrame(data)

# 필요한 칼럼만 추출 (data_source와 side_detail)
df_filtered = df[['data_source', 'side_detail']]

# data_source별로 side_detail의 빈도수 계산
df_count = df_filtered.groupby(['data_source', 'side_detail']).size().reset_index(name='count')

# 결과를 계층 구조로 변환
# 데이터 구조를 계층적으로 변환
result = df_count.to_dict(orient='records')

# 새로운 JSON 파일에 저장
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)

print(f"계층화된 JSON 파일이 {output_file}에 저장되었습니다.")
