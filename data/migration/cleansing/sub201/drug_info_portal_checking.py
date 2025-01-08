import requests
import json

# 요청 URL과 서비스 키 설정
base_url = "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01"
service_key = "1ifF5169eHQGz9EcSbNZ8axnj%2BIUkN9gsy%2FyDuF58ZX2kT8H254nUpzp3rKSdP6rIhREcwrqmsv1MByZvTnGTQ%3D%3D"

def fetch_data(page_no):
    params = {
        "serviceKey": service_key,
        "pageNo": page_no,
        "numOfRows": 100,  # 페이지 당 항목 수
        "type": "json",  # 응답 형식
        # 필요한 추가 파라미터들
    }
    
    try:
        response = requests.get(base_url, params=params)
        
        # 로깅: 요청 URL과 응답 코드 확인
        print(f"Request URL: {response.url}")
        print(f"Response Status Code: {response.status_code}")
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching data for page {page_no}, Status Code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# 예시로 첫 페이지 요청
data = fetch_data(1)
if data:
    print(json.dumps(data, indent=4))
else:
    print("No data received")
