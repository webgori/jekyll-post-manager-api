from typing import Union

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import aiohttp
from fastapi.middleware.cors import CORSMiddleware


class AccessTokenRequest(BaseModel):
    client_id: str
    client_secret: str
    code: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
#session = aiohttp.ClientSession(headers=headers)
#GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_ACCESS_TOKEN_URL = "https://reqbin.com/sample/post/json"


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/oauth/github/access-token")
async def generate_access_token(request: AccessTokenRequest):
    return await call_github_access_token_api(request)
    # return request


async def call_github_access_token_api(request):
    client_id = request.client_id
    client_secret = request.client_secret
    code = request.code

    headers = {'Content-Type': 'application/json', 'Accept': '*/*', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}
    data = {"client_id": client_id, "client_secret": client_secret, "code": code}

    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.post(GITHUB_ACCESS_TOKEN_URL, headers=headers, data=data) as response:
            json = await response.json()
            print(json)
            return json

if __name__ == '__main__':
    uvicorn.run('main:app', host="0.0.0.0", port=8000)