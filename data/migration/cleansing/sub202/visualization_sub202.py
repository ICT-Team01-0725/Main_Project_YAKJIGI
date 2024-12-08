import os
import pandas as pd
import json
import chardet

# 데이터 읽기 (3개의 CSV 파일)
folder_path = r"C:\\Users\\5\\Desktop\\data\\seeder\\sub2-2"  # CSV 파일들이 있는 폴더 경로
csv_files = [os.path.join(folder_path, file) for file in os.listdir(folder_path) if file.endswith('.csv')]  # 폴더 내 모든 CSV 파일 가져오기
last_column_texts = []

for file in csv_files:
    try:
        # 파일의 인코딩 감지
        with open(file, 'rb') as f:
            result = chardet.detect(f.read())  # 파일 내용을 읽어서 인코딩 감지
            encoding = result['encoding']

        # 감지된 인코딩으로 파일 읽기
        df = pd.read_csv(file, encoding=encoding)
        last_column_texts.extend(df.iloc[:, -1].dropna().tolist())  # 마지막 칼럼의 데이터 추출

    except Exception as e:
        print(f"파일 읽기 오류: {file}, 오류: {str(e)}")

# 데이터를 JSON 형식으로 변환
output = {"last_column_data": last_column_texts}

# JSON 파일로 저장
output_file = os.path.join(folder_path, 'text_sub202.json')
with open(output_file, 'w', encoding='utf-8') as json_file:
    json.dump(output, json_file, ensure_ascii=False, indent=4)

print(f"CSV 파일에서 마지막 칼럼 데이터를 추출하여 '{output_file}' 파일로 저장했습니다.")
