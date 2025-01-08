import requests
import json
import os
from PIL import Image
from io import BytesIO
import pymysql  # MySQL 연동
import xml.etree.ElementTree as ET
import pandas as pd

# MySQL 데이터베이스 연결 설정 (pymysql 사용)
db_connection = pymysql.connect(
    host="localhost",  # MySQL 서버 주소
    user="root",  # MySQL 사용자명
    password="1111",  # MySQL 비밀번호
    database="yakjigi_api_db",  # 데이터베이스 이름
    charset="utf8mb4"  # 문자셋 설정
)

cursor = db_connection.cursor()

# API URL과 기본 파라미터 설정
url = "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01"

params = {
    "serviceKey": "1ifF5169eHQGz9EcSbNZ8axnj%2BIUkN9gsy%2FyDuF58ZX2kT8H254nUpzp3rKSdP6rIhREcwrqmsv1MByZvTnGTQ%3D%3D",
    "item_name": "",
    "entp_name": "",
    "item_seq": "",
    "img_regist_ts": "",
    "edi_code": "",
    "pageNo": "1",
    "numOfRows": "100",
    "type": "json"
}

def save_image_to_db(image_url, item_seq):
    """이미지를 로컬에 저장하는 대신 데이터베이스에 저장하는 함수"""
    try:
        print(f"이미지 다운로드 시도: {image_url}")
        img_response = requests.get(image_url)
        img_response.raise_for_status()  # HTTP 오류 발생 시 예외 처리
        img = Image.open(BytesIO(img_response.content))
        img_byte_arr = BytesIO()
        img.save(img_byte_arr, format='JPG')  # 이미지를 JPG 형식으로 저장
        img_byte_arr = img_byte_arr.getvalue()  # 이미지 데이터를 바이너리로 변환

        # DB에 이미지 저장
        cursor.execute("""
            UPDATE drug_info_tbl 
            SET image_data = %s 
            WHERE item_seq = %s
        """, (img_byte_arr, item_seq))
        db_connection.commit()

        print(f"이미지 저장 성공: {image_url}")
        return True
    except Exception as e:
        print(f"이미지 다운로드 실패: {image_url}, 오류: {e}")
    return False

def fetch_and_save_data():
    """전체 데이터를 API에서 가져와 DB에 저장하는 함수"""
    page_no = 1  # 페이지 번호
    all_items = []  # items 데이터를 저장할 리스트

    while True:
        params["pageNo"] = str(page_no)
        print(f"API 요청: 페이지 {page_no}")
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()  # HTTP 오류 발생 시 예외 처리
        except requests.exceptions.RequestException as e:
            print(f"API 요청 실패: {e}")
            break

        data = response.text
        try:
            # JSON 처리
            json_data = json.loads(data)
            items = json_data.get('items', [])
            if not items:
                print("더 이상 가져올 데이터가 없습니다.")
                break  # 더 이상 데이터가 없으면 종료

            all_items.extend(items)  # 아이템 데이터를 리스트에 추가

            for item in items:
                item_data = {
                    'item_seq': item.get('ITEM_SEQ'),
                    'item_name': item.get('ITEM_NAME'),
                    'entp_name': item.get('ENTP_NAME'),
                    'img_url': item.get('ITEM_IMAGE'),
                    'drug_shape': item.get('DRUG_SHAPE'),
                    'color_class1': item.get('COLOR_CLASS1'),
                }

                # 이미지 URL이 유효한 경우에만 다운로드 및 DB에 저장
                if item_data['img_url'] and item_data['img_url'] != '':
                    save_image_to_db(item_data['img_url'], item_data['item_seq'])

                # drug_info_tbl에 데이터 삽입 (중복 처리)
                try:
                    cursor.execute("""
                        INSERT INTO drug_info_tbl (item_seq, item_name, entp_name, img_url, drug_shape, color_class1)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ON DUPLICATE KEY UPDATE
                            item_name = VALUES(item_name),
                            entp_name = VALUES(entp_name),
                            img_url = VALUES(img_url),
                            drug_shape = VALUES(drug_shape),
                            color_class1 = VALUES(color_class1)
                    """, (item_data['item_seq'], item_data['item_name'], item_data['entp_name'], item_data['img_url'], item_data['drug_shape'], item_data['color_class1']))
                    db_connection.commit()
                    print(f"DB 저장 성공: {item_data}")
                except pymysql.MySQLError as e:
                    print(f"DB 저장 오류: {e}")

            # 페이지 증가
            page_no += 1

        except json.JSONDecodeError:
            print("JSON 데이터 파싱 실패, XML 처리 시도")
            try:
                tree = ET.ElementTree(ET.fromstring(data))
                root = tree.getroot()
                print("XML 데이터:", ET.tostring(root, encoding="unicode"))
            except ET.ParseError as e:
                print(f"XML 파싱 실패: {e}")
                break

    # 수집한 데이터 출력
    if all_items:
        df = pd.DataFrame(all_items)
        print("수집된 데이터 DataFrame:")
        print(df)

        # 데이터를 CSV로 저장
        csv_path = "C:/Users/5/Desktop/data/migration/cleansing/sub201/drug_data.csv"
        df.to_csv(csv_path, index=False)
        print(f"데이터가 CSV로 저장되었습니다: {csv_path}")
    else:
        print("수집된 데이터가 없습니다.")

# 데이터 가져오기 및 이미지 저장
fetch_and_save_data()

# 연결 종료
cursor.close()
db_connection.close()
