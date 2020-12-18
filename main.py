from flask import Flask, request, render_template, jsonify
import json

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


# カレンダー表示
@app.route('/')
def index():
    return render_template("index.html")


# スケジュールの表示
@app.route('/schedule')
def schedule():
    return render_template("schedule.html")


@app.route('/schedule/json', methods=["GET"])
def schedule_get():
    with open('schedule.json') as f:
        json_data = json.load(f)

    return jsonify(json_data)


# 予定の追加
@app.route('/change/add', methods=["POST"])
def schedule_add():
    time = request.json.get('time', None)
    schedule = request.json.get('schedule', None)

    # print(time)
    # print(schedule)

    json_sc = {
        "time": time,
        "schedule": schedule
    }

    # 値が入ってなかった場合の処理
    if not schedule or not time:
        return jsonify({
            "message": "Error"
    })

    # JSON読み込み
    with open('schedule.json') as f:
        sc_data = json.load(f)
    # list変換
    sc_list = list(sc_data)
    # 入力されたデータを追加
    sc_list.append(json_sc)
    # 追加されたlistを書き込み
    with open('schedule.json', 'w') as f:
        json.dump(sc_list, f, indent=4, ensure_ascii=False)

    return jsonify({
        "message": "Success"
    })


# 予定の削除
@app.route('/change/del', methods=["POST"])
def schedule_del():
    # 削除したい予定を持ってくる
    time = request.json.get('time', None)
    schedule = request.json.get('schedule', None)

    # チェック
    check = {
        "time": time,
        "schedule": schedule
    }

    # JSON読み込み
    with open('schedule.json') as f:
        sc_data = json.load(f)

    # リスト型に変換
    sc_list = list(sc_data)

    # フラグ
    flag = False

    # 認証
    for i in range(len(sc_list)):
        print(sc_list[i], check)
        if sc_list[i].get("time") == check["time"] and sc_list[i].get("schedule") == check["schedule"]:
            flag = True
            # 元データを削除
            sc_list.remove(sc_list[i])

            # ファイル書き込み
            with open('schedule.json', 'w') as f:
                json.dump(sc_list, f, indent=4, ensure_ascii=False)
        else:
            continue

    if not flag:
        return jsonify({
            "message": "Error"
        })

    return jsonify({
        "message": "Success"
    })


if __name__ == "__main__":
    # debugモードが不要の場合は、debug=Trueを消してください
    app.run(debug=True)
