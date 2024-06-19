
from fastapi  import FastAPI
from redis_om import get_redis_connection, HashModel

app = FastAPI()

redis = get_redis_connection(
    host="redis-19840.c13.us-east-1-3.ec2.redns.redis-cloud.com:",
    port=19840,
    password="VJoPm7tEdLxfZXZNtH3gB7dwA7CX2H7d",
    decode_responses=True
)

class product(HashModel):
    name: str
    price: float
    quantity: int

    class meta:
        database = redis


@app.get('/products')
def all():
    return[]
