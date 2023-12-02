from flask import Flask, request, jsonify

from transformers import pipeline

classifier = pipeline("sentiment-analysis")

app = Flask(__name__)


@app.route('/api', methods=['POST'])
def handle_request():
    data = request.get_json()
    selected_text = data.get('selectedText', '')
    result = classifier(selected_text)
    response_data = {'sentiment': result[0]['label']}
    return jsonify(response_data)


if __name__ == '__main__':
    app.run(port=5000)
