import time
from typing import Dict

import jwt
from decouple import config


JWT_SECRET = config("SECRET_KEY")
JWT_ALGORITHM = config("ALGORITHM")


def token_response(token: str):
    return {
        "access_token": token,
        "token_type": "Bearer",
    }


def signJWT(user_id: str, user_name: str, email: str, first_name: str, last_name: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "user_name": user_name,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(
            token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token
    except:
        return {}
