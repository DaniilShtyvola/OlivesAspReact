import requests


API_CLIENT = "http://localhost:5196/api"

class ReqClient:
    @staticmethod
    def _req(path, method, json=None):
        res = None
        if method.upper() == "GET":
            res = requests.get(f"{API_CLIENT}{path}")
        elif method.upper() == "POST":
            res = requests.post(f"{API_CLIENT}{path}", json=json)
        
        return res

    @staticmethod
    def addNews(id=0, title, content, publisher):
        r = ReqClient._req(
            path="/news/add",
            method="POST",
            json={
                "Id": id,
                "Title": title,
                "Content": content,
                "Publisher": publisher
            }
        )

        return r.json()

