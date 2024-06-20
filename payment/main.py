from fastapi  import FastAPI
from fastapi.background import BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel
from starlette.requests import Request
import requests
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)

#this should be a diffrent database
redis = get_redis_connection(
    host="redis-19840.c13.us-east-1-3.ec2.redns.redis-cloud.com",
    port=19840,
    password="VJoPm7tEdLxfZXZNtH3gB7dwA7CX2H7d",
    decode_responses=True
)

class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str #completed,pending,refunded

    class Meta:
        database=redis

@app.get('/order/{pk}')
def get(pk: str):
    return Order.get(pk)

@app.post('/orders')
async def create(request:Request, background_tasks:BackgroundTasks):  #id,quantity
    body = await request.json()

    req = requests.get(f'http://localhost:8000/products/{body["id"]}')

    product =req.json()

    order= Order(
    product_id=body['id'],
    price=product['price'],
    fee=0.2* product['price'],
    total=1.2*product['price'],
    quantity=body['quantity'],
    status='pending'
    )
    order.save()

    background_tasks.add_task(order_completed, order)

    return order

def order_completed(order:Order):
    time.sleep(5)
    order.status='completed'
    order.save()
    redis.xadd('order_completed',order.dict(),'*')