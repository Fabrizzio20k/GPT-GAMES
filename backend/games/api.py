import os
import requests
from dotenv import load_dotenv
from django.http import JsonResponse
from datetime import datetime, timezone


from rest_framework.parsers import JSONParser

load_dotenv()
def fetch_games(body, path):
    url = "https://api.igdb.com/v4/" + path
    headers = {
        "Client-ID": os.getenv("CLIENT_ID_IGDB"),
        "Authorization": "Bearer " + os.getenv("TOKEN_IGDB"),
        "Accept": "application/json"
    }

    try:
        response = requests.post(url, headers=headers, data=body)
        return response
    except requests.exceptions.HTTPError as e:
        return JsonResponse({"error": str(e)})


def get_game_info_api(id):
    fields = "fields summary, name, first_release_date, genres.name, platforms.name, involved_companies.company.name, cover.image_id;"
    body = fields + " where id = " + str(id) + ";"

    try:
        data = fetch_games(body, "games").json()[0]

        return {
            'api_id': id,
            'name': data["name"],
            'release_year': datetime.fromtimestamp(data.get("first_release_date", 0), timezone.utc).strftime('%d-%m-%Y'),
            'genres': [i["name"] for i in data["genres"]],
            'platforms': [i["name"] for i in data["platforms"]],
            'summary': data["summary"],
            'involved_companies': [i["company"]["name"] for i in data["involved_companies"]],
            'cover': "https://images.igdb.com/igdb/image/upload/t_1080p/" + data["cover"]["image_id"] + ".jpg",
        }
    except requests.exceptions.HTTPError as e:
        return JsonResponse({"error": "Game not found"})


def get_games():
    fields = "fields summary, name, first_release_date, genres.name, platforms.name, involved_companies.company.name, cover.image_id;"
    body = fields + " sort first_release_date desc;" + " limit 20;"

    try:
        data = fetch_games(body, "games").json()

        res = []

        for item in data:
            info = {
                'api_id': item.get("id"),
                'name': item.get("name"),
                'release_year': datetime.fromtimestamp(item.get("first_release_date", 0), timezone.utc).strftime('%d-%m-%Y'),
                'genres': [i["name"] for i in item.get("genres", [])],
                'platforms': [i["name"] for i in item.get("platforms", [])],
                'summary': item.get("summary"),
                'involved_companies': [i["company"]["name"] for i in item.get("involved_companies", [])],
                'cover': f"https://images.igdb.com/igdb/image/upload/t_1080p/{item.get('cover', {}).get('image_id', '')}.jpg"
            }

            res.append(info)

        return res

    except requests.exceptions.HTTPError as e:
        return JsonResponse({"error": "Game not found"})


