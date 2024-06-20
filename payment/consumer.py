from main import redis, Order
import time


key='refund_order'
group='payment-group'

try:
    redis.xgroup_create(key, group)
except:
    print("Group is already exist!!")

while True:
    try:
        results = redis.xreadgroup(group, key, {key: '>'}, None)
        print(results)
        if results !=[]:
            for result in results:
                obj = result[1][0][1]
                print(obj['pk'])
                order = Order.get(obj['pk'])
                order.status ='refunded'
                order.save()

    
    except Exception as e:
        print(str(e))
    time.sleep(1)