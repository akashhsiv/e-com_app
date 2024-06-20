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

        if results !=[]:
            for result in results:
                obj = result[1][0][1]
                

                try:
                    product = Product.get(obj['product_id'])
                    product.quantity = product.quantity - int(obj['quantity'])
                    product.save()
                except:
                    print('refund_triggered')
                    redis.xadd("refund_order", obj, "*")
    
    except Exception as e:
        print(str(e))
    time.sleep(1)