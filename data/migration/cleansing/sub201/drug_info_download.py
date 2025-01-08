import requests
import json
import xml.etree.ElementTree as ET

# API URL과 파라미터 설정
url = 'http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01'
service_key = "1ifF5169eHQGz9EcSbNZ8axnj+IUkN9gsy/yDuF58ZX2kT8H254nUpzp3rKSdP6rIhREcwrqmsv1MByZvTnGTQ=="

params = {
    "serviceKey": service_key,
    "item_name": "",  # 필요한 값으로 수정
    "entp_name": "",  # 필요한 값으로 수정
    "item_seq": "",
    "img_regist_ts": "",
    "edi_code": "",
    "pageNo": "1",  # 첫 번째 페이지
    "numOfRows": "100",  # 한 번에 100개 항목
    "type": "json"  # JSON 형식으로 요청
}

# 데이터를 저장할 변수
all_data = []

# 데이터를 파일에 저장하는 함수
def save_data_to_file(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# 데이터를 가져오는 함수
def fetch_data(page_number):
    params["pageNo"] = page_number
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        return response  # 응답 객체를 반환
    else:
        print(f"Error fetching data for page {page_number}, Status Code: {response.status_code}")
        return None

# JSON 데이터를 파싱하는 함수
def parse_json(response_data):
    try:
        data = response_data.json()  # JSON 데이터를 직접 파싱
        items = []
        
        # 'body'와 'items' 키가 있는지 확인
        if "body" in data and "items" in data["body"]:
            for item in data["body"]["items"]:
                items.append({
                    "item_name": item.get("ITEM_NAME", "정보 없음"),  
                    "entp_name": item.get("ENTP_NAME", "정보 없음"), 
                    "item_seq": item.get("ITEM_SEQ", "정보 없음"),    
                    "chart": item.get("CHART", "정보 없음"),  
                    "item_image": item.get("ITEM_IMAGE", "정보 없음"),  
                    "drug_shape": item.get("DRUG_SHAPE", "정보 없음"),  
                    "class_name": item.get("CLASS_NAME", "정보 없음"), 
                    "etc_otc_name": item.get("ETC_OTC_NAME", "정보 없음") 
                })
        return items
    except Exception as e:
        print(f"JSON 파싱 오류: {e}")
        return []



# XML 데이터를 파싱하는 함수
def parse_xml(response_data):
    try:
        root = ET.fromstring(response_data.text)
        items = []

        # XML에서 items 추출
        for item in root.iter("item"):
            items.append({
                "item_name": item.find("ITEM_NAME").text if item.find("ITEM_NAME") is not None else "정보 없음",
                "entp_name": item.find("ENTP_NAME").text if item.find("ENTP_NAME") is not None else "정보 없음",
                # 필요한 데이터 추가
            })
        return items
    except Exception as e:
        print(f"XML 파싱 오류: {e}")
        return []

# 메인 함수
def main():
    page_no = 1
    while True:
        # 데이터를 가져옴
        response_data = fetch_data(page_no)
        if not response_data:
            break

        # 응답 내용 출력 (응답 전체를 출력해 봄)
        print("응답 내용:", response_data.text)

        # 응답이 JSON 형식인지 XML 형식인지 확인 후 처리
        if "json" in response_data.headers["Content-Type"]:
            items = parse_json(response_data)
        elif "xml" in response_data.headers["Content-Type"]:
            items = parse_xml(response_data)
        else:
            print("알 수 없는 형식입니다.")
            break

        if items:
            all_data.extend(items)
            print(f"Page {page_no} 데이터 저장 완료, {len(items)}개 항목")
        else:
            print(f"Page {page_no}에 데이터가 없습니다.")
            break

        page_no += 1

    # 모든 데이터를 로컬 파일에 저장
    save_data_to_file(all_data, "C:/Users/5/Desktop/data/migration/cleansing/sub201/all_medi_data.json")
    print(f"모든 데이터를 'all_medi_data.json' 파일에 저장했습니다. 총 {len(all_data)}개 항목")

if __name__ == "__main__":
    main()
