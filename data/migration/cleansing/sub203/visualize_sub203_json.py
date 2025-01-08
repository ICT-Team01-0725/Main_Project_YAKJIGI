import json

# 원본 JSON 데이터 로드
with open('C:/Users/5/Desktop/data/migration/cleansing/sub203/grouped_sub203_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# sub_items 개수를 기준으로 정렬하고 상위 50개 추출
top_50_data = sorted(data, key=lambda x: len(x.get("sub_items", [])), reverse=True)[:50]

# 필요한 데이터 추출
refined_data = []
for item in top_50_data:
    refined_item = {
        "product_name_a": item.get("product_name_a"),
        "sub_items": [
            {
                "product_name_b": sub_item.get("product_name_b"),
                "prohibition_reason": sub_item.get("prohibition_reason"),
            }
            for sub_item in item.get("sub_items", [])
        ],
    }
    refined_data.append(refined_item)

# 새 JSON 파일로 저장
with open('C:/Users/5/Desktop/data/migration/cleansing/sub203/visualized_sub203_data.json', 'w', encoding='utf-8') as file:
    json.dump(refined_data, file, ensure_ascii=False, indent=4)

print("데이터 정제가 완료되었습니다. (상위 50개 항목만 반영)")
