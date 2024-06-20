from main import redis, Product
import time


key='order_completed'
group='inventory-group'

try:
    redis.xgroup_create(key, group)
except:
    print("Group is already exist!!")

while True:
    try:
        results = redis.xreadgroup(group, key, {key: '>'}, None)

        print(results)
    except Exception as e:
        print(str(e))
    time.sleep(1)