import requests
import json
import urllib
import os
from getpass import getpass
import time
from datetime import datetime

#Autenticacao

URL = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
client_id = "bd7a72f5-90a1-4e2d-b320-307fc7618ab4"
permissions = ['files.readwrite']
response_type = 'token'
redirect_uri = 'http://localhost:4200/'
scope = ''
for items in range(len(permissions)):
    scope = scope + permissions[items]
    if items < len(permissions)-1:
        scope = scope + '+'

print('Click over this link ' +URL + '?client_id=' + client_id + '&scope=' + scope + '&response_type=' + response_type+\
     '&redirect_uri=' + urllib.parse.quote(redirect_uri))
print('Sign in to your account, copy the whole redirected URL.')
code = input("Copie o URL completo aqui :")
token = code[(code.find('access_token') + len('access_token') + 1) : (code.find('&token_type'))]


URL = 'https://graph.microsoft.com/v1.0/'
HEADERS = {'Authorization': 'Bearer ' + token}
response = requests.get(URL + 'me/drive/', headers = HEADERS)
if (response.status_code == 200):
    response = json.loads(response.text)
    print('Connected to the OneDrive of', response['owner']['user']['displayName']+' (',response['driveType']+' ).', \
         '\nConnection valid for one hour. Reauthenticate if required.')
elif (response.status_code == 401):
    response = json.loads(response.text)
    print('API Error! : ', response['error']['code'],\
         '\nSee response for more details.')
else:
    response = json.loads(response.text)
    print('Unknown error! See response for more details.')
    
    
    
#Operations

URL = 'https://graph.microsoft.com/v1.0/'

HEADERS = {'Authorization': 'Bearer ' + token}

response = requests.get(URL + 'me/drive/', headers = HEADERS)
if (response.status_code == 200):
    response = json.loads(response.text)
    print('Connected to the OneDrive of', response['owner']['user']['displayName']+' (',response['driveType']+' ).', \
         '\nConnection valid for one hour. Refresh token if required.')
elif (response.status_code == 401):
    response = json.loads(response.text)
    print('API Error! : ', response['error']['code'],\
         '\nSee response for more details.')
else:
    response = json.loads(response.text)
    print('Unknown error! See response for more details.')
    
def listarArquivoOneDrive():
    #ListFolder

    items = json.loads(requests.get(URL + 'me/drive/root/children', headers=HEADERS).text)
    items = items['value']
    for entries in range(len(items)):
        print(items[entries]['name'], '| item-id >', items[entries]['id'])

def criarPastaOneDrive():
    #Create new folder (in the root directory) if not exists

    items = json.loads(requests.get(URL + 'me/drive/root/children', headers=HEADERS).text)
    items = items['value']
    pastas = []
    for entries in range(len(items)):
        
        pastas.append(items[entries]['name'])

    if "FinanceAppBackUp" not in pastas:
        url = URL + 'me/drive/root/children/'
        body = {
            "name": "FinanceAppBackUp",
            "folder": {},
            "@microsoft.graph.conflictBehavior": "rename"
        }
        response = json.loads(requests.post(url, headers=HEADERS, json=body).text)
        print("Pasta de backup Criada no oneDrive")
    else:
        print('Pasta de backup no OndeDrive já existente...')

def downloadArquivoOneDrive():
    #Download items and save
    url = 'me/drive/root:/FinanceAppBackUp/db.sqlite3:/content'
    url = URL + url
    data = requests.get(url, headers=HEADERS)
    
    with open("db.sqlite3",'wb') as arq:
        arq.write(data.content)

def deletarArquivoOneDrive():
    #Delete items
    url = 'me/drive/root:/FinanceAppBackUp/db.sqlite3:/content'
    url = URL + url
    confirmation = "y"
    if (confirmation.lower()=='y'):
        response = requests.delete(url, headers=HEADERS)
        if (response.status_code == 204):
            print('Item gone! If need to recover, please check OneDrive Recycle Bin.')
    else:
        print("Item not deleted.")

def uploadArquivoOneDrive():
    # Upload file
    url = 'me/drive/root:/FinanceAppBackUp/db.sqlite3:/content'
    url = URL + url
    content = open('db.sqlite3', 'rb')
    response = json.loads(requests.put(url, headers=HEADERS, data = content).text)
    

