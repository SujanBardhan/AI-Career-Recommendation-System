from flask import Flask, render_template, request, jsonify
from google import genai

app = Flask(__name__)

API_KEY = "GEMINI_API_KEY"

client = genai.Client(api_key=API_KEY)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


@app.route("/result")
def result():
    return render_template("result.html")


@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()

        prompt = f"""
You are an experienced career counselor.

A student answered the following career assessment quiz:

{data}

Recommend the single most suitable career.

Reply ONLY in this format:

Best Career:
Reason:
Skills Required:
- Skill 1
- Skill 2
- Skill 3

Expected Salary in India:
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return jsonify({"result": response.text})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)