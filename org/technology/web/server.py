from flask import Flask, request
import json

all_bookings = json.load(open('data.json'))
app = Flask(__name__)

@app.route('/app/booking/<int:n>', methods=['DELETE'])
def delbooking(n):
    global all_bookings
    all_bookings['bookings'] = [b for b in all_bookings['bookings'] if b['id'] != n]
    return {"success": True}

@app.route('/app/booking/', methods=['GET', 'POST'])
def booking():
    global all_bookings
    match request.method:
        case 'GET':
            return all_bookings
        case 'POST':
            print(request.json) # print request to console
            # find an existing booking for that date
            exists = [b for b in all_bookings['bookings'] if b['whn'] == request.json['whn']]
            if len(exists) > 0:
                return {"success": False, "msg": f"That date is reserved by {exists[0]['who']}"}, 409
            newId = 1 + max(b['id'] for b in all_bookings['bookings'])
            all_bookings['bookings'].append({"id": newId, **request.json})
            print(f"{all_bookings=}")
            return {"id": newId}
        case _:
            return {"success": False, "msg": f"Unkown verb {request.method}"}
    
@app.route("/")
def index():
    return """
<!doctype html>
<html>
<head>
<title>Booking</title>
<script src='static/booking.js' defer></script>
</head>
<body>
</body>
</html>
"""

if __name__=="__main__":
    app.run(host='0.0.0.0',port=8080,debug=True)