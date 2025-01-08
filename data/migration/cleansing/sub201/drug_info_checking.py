import requests
from urllib.parse import urlencode

url = "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01"

# 이미 인코딩된 serviceKey인지 확인
service_key = "1ifF5169eHQGz9EcSbNZ8axnj%2BIUkN9gsy%2FyDuF58ZX2kT8H254nUpzp3rKSdP6rIhREcwrqmsv1MByZvTnGTQ%3D%3D"

# 필요 시 인코딩
if "%" not in service_key:
    from urllib.parse import quote
    service_key = quote(service_key)

params = {
    "serviceKey": service_key,
    "item_name": "",
    "entp_name": "",
    "item_seq": "",
    "img_regist_ts": "",
    "edi_code": "",
    "pageNo": "1",
    "numOfRows": "100",
    "type": "json"
}

# URL 인코딩
encoded_params = urlencode(params, safe="%")
print(f"요청 URL: {url}?{encoded_params}")

# API 요청
try:
    response = requests.get(f"{url}?{encoded_params}")
    response.raise_for_status()
    print("API 요청 성공!")
    print(response.text)
except requests.exceptions.RequestException as e:
    print(f"API 요청 실패: {e}")
