import pandas as pd

# CSV 파일 경로 설정
file_path = 'C:/Users/5/Desktop/data/seeder/sub203/의약품안전사용서비스(DUR)_병용금기.csv'

# CSV 파일 읽기 (인코딩을 cp949로 지정, dtype을 str로 지정)
df = pd.read_csv(file_path, encoding='cp949', dtype={'column_name_or_index': str})

# 한글 칼럼명을 영문 칼럼명으로 매핑
column_mapping = {
    '제품명A': 'product_name_a',
    '업소명A': 'company_name_a',
    '성분명A': 'ingredient_name_a',
    '성분코드A': 'ingredient_code_a',
    '구분A': 'category_a',
    '제품명B': 'product_name_b',
    '업소명B': 'company_name_b',
    '성분명B': 'ingredient_name_b',
    '금기사유': 'prohibition_reason'
}

# 칼럼명 변경
df.rename(columns=column_mapping, inplace=True)

# 데이터를 계층적으로 정제
def refine_data(df):
    result = []
    # 그룹화: 'product_name_a', 'company_name_a', 'ingredient_name_a', 'ingredient_code_a', 'category_a'를 기준으로
    grouped = df.groupby(['product_name_a', 'company_name_a', 'ingredient_name_a', 'ingredient_code_a', 'category_a'])

    for group_keys, group_data in grouped:
        # 상위 계층 정보 (product_name_a 등)
        top_level = {
            'product_name_a': group_keys[0],
            'company_name_a': group_keys[1],
            'ingredient_name_a': group_keys[2],
            'ingredient_code_a': group_keys[3],
            'category_a': group_keys[4],
            'sub_items': []
        }

        # 하위 계층 정보 (product_name_b 등)
        for _, row in group_data.iterrows():
            sub_item = {
                'product_name_b': row['product_name_b'],
                'company_name_b': row['company_name_b'],
                'ingredient_name_b': row['ingredient_name_b'],
                'prohibition_reason': row['prohibition_reason']
            }
            top_level['sub_items'].append(sub_item)

        result.append(top_level)

    return result

# 정제된 데이터
refined_data = refine_data(df)

# JSON 파일로 저장
import json
output_file = 'C:/Users/5/Desktop/data/migration/cleansing/sub203/grouped_sub203_data.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(refined_data, f, ensure_ascii=False, indent=4)

print(f'그룹화된 데이터가 {output_file}에 저장되었습니다.')
