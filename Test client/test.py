from client import ReqClient


r = ReqClient.addNews(
    id=2,
    title="Тест",
    content="Тест",
    publisher="Test"
)

print(r)

