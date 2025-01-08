import pandas as pd
import os

# 1. 파일 읽기 및 데이터 정리 함수
def read_and_add_source(file_path, source_name, column_mapping):
    """
    파일을 읽고, 데이터 출처 열을 추가하며, 칼럼을 매핑하는 함수.
    
    Args:
    - file_path (str): 파일 경로
    - source_name (str): 데이터 출처 값 (예: 'senior')
    - column_mapping (dict): 원본 칼럼명 -> 변경할 칼럼명 매핑
    
    Returns:
    - pd.DataFrame: 정리된 데이터프레임
    """
    try:
        # 파일 읽기 (CP949 인코딩 사용)
        df = pd.read_csv(file_path, encoding='cp949')
        
        # 칼럼명 매핑
        df = df.rename(columns=column_mapping)
        
        # NaN 값 처리: 데이터에서 필요한 칼럼만 선택
        df = df[column_mapping.values()]
        
        # 데이터 출처 열 추가
        df['data_source'] = source_name  # 데이터 출처 열 추가
        
        return df
    except UnicodeDecodeError as e:
        print(f"Error reading file {file_path}: {e}")
        raise

# 2. 기본 경로 설정
base_path = "C:/Users/5/Desktop/data/seeder/sub202"

# 3. 파일 경로 및 매핑 설정
senior_file = os.path.join(base_path, "의약품안전사용서비스(DUR)_노인주의.csv")
pregnancy_file = os.path.join(base_path, "의약품안전사용서비스(DUR)_임산부금기.csv")
age_file = os.path.join(base_path, "의약품안전사용서비스(DUR)_연령금기.csv")

# 4. 파일별 칼럼 매핑 설정
senior_column_mapping = {
    "성분명": "ingredient_name",
    "성분코드": "ingredient_code",
    "제품코드": "product_code",
    "제품명": "product_name",
    "업소명": "company_name",
    "약품상세정보": "side_detail",
}

pregnancy_column_mapping = {
    "성분명": "ingredient_name",
    "성분코드": "ingredient_code",
    "제품코드": "product_code",
    "제품명": "product_name",
    "업체명": "company_name",
    "상세정보": "side_detail",
}

age_column_mapping = {
    "성분명": "ingredient_name",
    "성분코드": "ingredient_code",
    "제품코드": "product_code",
    "제품명": "product_name",
    "업체명": "company_name",
    "상세정보": "side_detail",
}

# 5. 각각의 데이터 읽기 및 정리
senior_df = read_and_add_source(senior_file, 'senior', senior_column_mapping)
pregnancy_df = read_and_add_source(pregnancy_file, 'pregnancy', pregnancy_column_mapping)
age_df = read_and_add_source(age_file, 'age', age_column_mapping)

# 6. 데이터 병합
merged_df = pd.concat([senior_df, pregnancy_df, age_df], ignore_index=True)

# 7. JSON 파일로 저장
output_dir = "C:/Users/5/Desktop/data/migration/cleansing/sub202"
# 디렉토리 생성 (없으면 생성)
os.makedirs(output_dir, exist_ok=True)  
output_file = os.path.join(output_dir, "merged_sub202_data.json")

# product_code 에 따라서 정렬렬
merged_df = merged_df.sort_values(by='product_code', ascending=True)
# json 파일 형태로 저장
merged_df.to_json(output_file, orient='records', force_ascii=False, indent=4)
print(f"칼럼병합된 파일이 {output_file}로 저장되었습니다.")
