import pandas as pd
import chardet

# 예시 CSV 파일 경로
file_path = 'C:/Users/5/Desktop/data/seeder/sub2-3/의약품안전사용서비스(DUR)_병용금기 품목리스트 2024.5.csv'

# 파일 인코딩 감지
with open(file_path, 'rb') as f:
    result = chardet.detect(f.read())
    file_encoding = result['encoding']

# 감지된 인코딩 출력 (디버깅용)
print(f"감지된 파일 인코딩: {file_encoding}")

# 인코딩에 맞춰 CSV 파일 읽기
try:
    df = pd.read_csv(file_path, encoding=file_encoding)
except UnicodeDecodeError:
    print(f"감지된 인코딩 '{file_encoding}'으로 파일을 읽는 데 실패했습니다. 'utf-8-sig' 또는 'cp949'를 시도합니다.")
    try:
        df = pd.read_csv(file_path, encoding='utf-8-sig')  # UTF-8 with BOM
    except UnicodeDecodeError:
        df = pd.read_csv(file_path, encoding='cp949')  # CP949 (Windows 한글 인코딩)

# 컬럼명에서 공백 제거
df.columns = df.columns.str.strip()

# 'A'로 끝나는 칼럼 선택
a_columns = [col for col in df.columns if col.endswith('A')]

# 'B'로 끝나는 칼럼 선택
b_columns = [col for col in df.columns if col.endswith('B')]

# B 칼럼에 null 값이 있는 행을 제외한 데이터프레임 생성
df_non_null_b = df.dropna(subset=b_columns)

# 'A' 칼럼 기준으로 그룹화 & 'B' 칼럼의 값을 리스트로 병합
df_grouped = df_non_null_b.groupby(a_columns).agg(lambda x: list(x)).reset_index()

# 결과를 JSON 형식으로 저장 (orient='records'로 각 행을 JSON 객체로)
output_path = 'C:\\Users\\5\\Desktop\\data\\migration\\cleansing\\sub203\\grouped_sub203.json'
try:
    df_grouped.to_json(output_path, orient='records', lines=True, force_ascii=False)
    print(f"A 칼럼으로 그룹화된 B 칼럼들로 JSON 파일로 저장 완료! 경로: {output_path}")
except Exception as e:
    print(f"JSON 저장 중 오류 발생: {e}")
