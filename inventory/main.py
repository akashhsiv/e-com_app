
from fastapi  import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)


redis = get_redis_connection(
    host="redis-19840.c13.us-east-1-3.ec2.redns.redis-cloud.com:",
    port=19840,
    password="VJoPm7tEdLxfZXZNtH3gB7dwA7CX2H7d",
    decode_responses=True
)

class Product(HashModel):
    name: str
    price: float
    quantity: int

    class meta:
        database = redis


@app.get('/products')
def all():
    return Product.all_pks()

@app.post('/products')
def create(product:Product):
    return product.save()