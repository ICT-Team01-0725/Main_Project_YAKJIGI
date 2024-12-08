import pandas as pd
from pyproj import Transformer
import chardet

# CSV 파일 경로
file_path = 'C:/Users/5/Desktop/data/seeder/sub3-1/전국약국표준데이터.csv'

# 파일 인코딩 감지
def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read())
        return result['encoding']

# 인코딩 시도 목록
encoding_options = ['utf-8', 'euc-kr', 'cp949']

# 인코딩을 시도하여 CSV 파일 읽기
def read_csv_with_encoding(file_path, encoding_options):
    for encoding in encoding_options:
        try:
            print(f"시도하는 인코딩: {encoding}")
            df = pd.read_csv(file_path, encoding=encoding, low_memory=False)
            return df
        except UnicodeDecodeError as e:
            print(f"{encoding} 인코딩에서 오류 발생: {e}")
    raise ValueError("모든 인코딩 옵션에서 오류가 발생했습니다.")

# 인코딩 시도하여 데이터프레임 읽기
df = read_csv_with_encoding(file_path, encoding_options)

# '영업상태명'이 '영업'인 행만 필터링
df_filtered = df[df['영업상태명'].str.contains('영업', na=False)]

# 필요한 칼럼만 추출
df_selected = df_filtered[['사업장명', '도로명우편번호', '도로명전체주소', '좌표정보(x)', '좌표정보(y)']]

# 좌표 변환 함수 (x, y --> 위도, 경도 / EPSG:5174 --> WGS84 )
def convert_coordinates(x, y):
    try:
        transformer = Transformer.from_crs("epsg:5174", "epsg:4326", always_xy=True)
        lat, lon = transformer.transform(x, y)
        return lat, lon
    except Exception as e:
        print(f"좌표 변환 실패: x={x}, y={y}, 에러={e}")
        return None, None

# 좌표 변환 적용
df_selected['phar_lat'], df_selected['phar_long'] = zip(
    *df_selected.apply(lambda row: convert_coordinates(row['좌표정보(x)'], row['좌표정보(y)']), axis=1)
)

# 불필요한 칼럼 제거
df_selected = df_selected[['사업장명', '도로명우편번호', '도로명전체주소', 'phar_lat', 'phar_long']]

# 칼럼명 변경
df_selected.columns = ['phar_name', 'phar_address_num', 'phar_address', 'phar_lat', 'phar_long']

# 결과 저장 (JSON 형식으로 저장)
output_path_json = 'C:/Users/5/Desktop/data/migration/cleansing/sub301/filtered_sub301.json'
df_selected.to_json(output_path_json, orient='records', force_ascii=False, indent=4)  # JSON으로 저장

print(f"처리된 데이터가 JSON 형식으로 저장되었습니다: {output_path_json}")
