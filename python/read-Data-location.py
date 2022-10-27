import pyrebase

config = {
  "apiKey": "AIzaSyB9RkZFAwtJfZUXYvXZBb2S4GYVSzOkpjEv",
  "authDomain": "location-a26be.firebaseapp.com",
  "databaseURL": "https://location-a26be-default-rtdb.asia-southeast1.firebasedatabase.app",
  "storageBucket": "location-a26be.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

def stream_handler(message):
    print(message["event"]) # put
    print(message["path"]) # /air
    print(message["data"]) # ON or OFF
    # print(type(message["data"]))
    # print(message["data"]["location"]["latitude"])
    # print(message["data"]["location"]["longitude"])

my_stream = db.stream(stream_handler)