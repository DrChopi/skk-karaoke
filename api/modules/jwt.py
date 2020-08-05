import random, string, hashlib, base64, hmac, json

class Jwt :
    def token(len) :
        return ''.join(random.choice(string.ascii_letters) for i in range(len))

    def sha256(str) :
        return hashlib.sha256(str.encode('utf-8')).hexdigest()

    def generate(data, secret):
        head = json.dumps({ 'alg' : 'HS512', 'typ' : 'JWT' }).encode('utf-8')
        body = json.dumps(data).encode('utf-8')
        sign = hmac.new( secret.encode('utf-8'), base64.urlsafe_b64encode(head) + '.'.encode('utf-8') +  base64.urlsafe_b64encode(body), hashlib.sha512 ).hexdigest()
        return base64.urlsafe_b64encode(head).decode("utf-8")  + '.' +  base64.urlsafe_b64encode(body).decode("utf-8")  + '.' + base64.urlsafe_b64encode(sign.encode('utf-8')).decode("utf-8")
    
    