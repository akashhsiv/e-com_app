
from fastapi  import FastAPI
# from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_methods=['*'],
    allow_headers=['*']
)


redis = get_redis_connection(
    host="redis-19840.c13.us-east-1-3.ec2.redns.redis-cloud.com",
    port=19840,
    password="VJoPm7tEdLxfZXZNtH3gB7dwA7CX2H7d",
    decode_responses=True
)

class Product(HashModel):
    name: str
    price: float
    quantity: int
    image_url: str = None

    class Meta:
        database = redis


@app.get('/products')
def all():
    return [format(pk) for pk in Product.all_pks()]

def format(pk: str):
    product= Product.get(pk)

    return {
        'id':product.pk,
        'name':product.name,
        'price':product.price,
        'quantity':product.quantity,
        'image_url':product.image_url
    }

@app.post('/products')
def create(product:Product):
    return product.save()

@app.get('/products/{pk}')
def get(pk: str):
    return Product.get(pk)

@app.delete('/products/{pk}')
def delete(pk:str):
    return Product.delete(pk)
