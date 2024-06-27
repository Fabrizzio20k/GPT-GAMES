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
        response = requests.post(url, headers=headers, data=body, timeout=5)
        return response
    except requests.exceptions.HTTPError as e:
        return JsonResponse({"error": str(e)})


def game_response(data):
    game = {
        'api_id': data.get("id", ""),
        'name': data.get("name", ""),
        'release_year': datetime.fromtimestamp(data.get("first_release_date", 0), timezone.utc).strftime('%d-%m-%Y') if data.get("first_release_date") else "",
        'genres': [i.get("name", "") for i in data.get("genres", [])],
        'platforms': [i.get("name", "") for i in data.get("platforms", [])],
        'summary': data.get("summary", ""),
        'involved_companies': [i["company"].get("name", "") for i in data.get("involved_companies", []) if i.get("company")],
        'cover': "https://images.igdb.com/igdb/image/upload/t_720p/" + data.get("cover", {}).get("image_id", "") + ".jpg" if data.get("cover") else "",
    }

    return game



def get_game_info_api(id):
    fields = "fields summary, name, first_release_date, genres.name, platforms.name, involved_companies.company.name, cover.image_id;"
    body = fields + " where id = " + str(id) + ";"

    data = fetch_games(body, "games").json()

    if len(data) == 0:
        return {"error": "No games found"}

    return game_response(data[0])


def get_game_by_name(name):
    fields = "fields summary, name, first_release_date, genres.name, platforms.name, involved_companies.company.name, cover.image_id;"
    body = fields + " search " + '"' + name + '";' + " limit 10;"

    try:
        data = fetch_games(body, "games").json()
        res = []

        for item in data:
            res.append(game_response(item))

        return res

    except requests.exceptions.HTTPError as e:
        return JsonResponse({"error": "Game not found"})


def get_games():
    fields = "fields summary, name, first_release_date, genres.name, platforms.name, involved_companies.company.name, cover.image_id;"
    body = fields + " sort first_release_date desc;" + " limit 20;"

    try:
        data = fetch_games(body, "games").json()
        res = []

        for item in data:
            res.append(game_response(item))

        return res

    except requests.exceptions.HTTPError as e:
        return JsonResponse({"error": "Game not found"})


