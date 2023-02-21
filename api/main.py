from flask import Flask, request, jsonify
from flask_cors import CORS

from ImageTransform import trataImagem

app = Flask(__name__)
CORS(app)

@app.route('/images', methods=['POST'])
def image():
    url = request.json['input_value']
    trataImagem(url)
    return jsonify({'message': url})

if __name__ == '__main__':
    app.run(debug = True)