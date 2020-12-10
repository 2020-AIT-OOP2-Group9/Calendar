from flask import Flask, request, render_template, jsonify
import json

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

# カレンダー表示
@app.route('/')
def index():
    return render_template("index.html")

# 予定の追加
@app.route('/change', methods=["POST"])
def schedule_add():
    pass

# 予定の削除
@app.route('/change', methods=[])
def schedule_del():
    pass




if __name__ == "__main__":
    # debugモードが不要の場合は、debug=Trueを消してください
    app.run(debug=True)