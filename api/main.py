from flask import Flask, request, jsonify
from flask_cors import CORS

from ImageTransform import trataImagem

app = Flask(__name__)
CORS(app)

url = None

@app.route('/images', methods=['POST', 'GET'])
def image():
    global url
    url = request.json['input_value']
    return trataImagem(url)

if __name__ == '__main__':
    app.run(debug = True)