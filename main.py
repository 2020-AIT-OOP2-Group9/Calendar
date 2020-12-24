from flask import Flask, request, render_template, jsonify
import json
import datetime

import calendar
import uuid


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False



# 今月のカレンダーのカレンダー表示(初期表示)

@app.route('/')
def index():
    dt_now = datetime.datetime.now()
    # 今日の日付(年・月)を取得
    year = dt_now.year
    month = dt_now.month
    # 月末の日にちを取得
    eom = calendar.monthrange(year, month)[1]

    # 月の初めの曜日を取得
    dt = datetime.datetime(year, month, 1)
    day = dt.weekday()

    return render_template("index.html", year=year,
                                         month=month,
                                         eom=eom,
                                         day=day)
                                   
# 以下htmlで「前の月へ」、「次の月へ」のボタンを押されたときの処理                                         
# 今月のカレンダーを表示
@app.route('/this_month', methods=["GET", "POST"])
def this_month():
    dt_now = datetime.datetime.now()
    # 今日の日付(年・月)を取得
    year = dt_now.year
    month = dt_now.month
    # 月末の日にちを取得
    eom = calendar.monthrange(year, month)[1]

    # 月の初めの曜日を取得
    dt = datetime.datetime(year, month, 1)
    day = dt.weekday()

    return render_template("index.html", year=year,
                                         month=month,
                                         eom=eom,
                                         day=day)
    
# 来月のカレンダーの表示
@app.route('/next_month', methods=["POST"])
def month_ago():
    dt_now = datetime.datetime.now()
    year = dt_now.year
    month = dt_now.month
    if month == 12:
        year = year + 1
        month = 1
    else:
        month = month + 1
    # 月末の日にちを取得
    eom = calendar.monthrange(year, month)[1]

    # 月の初めの曜日を取得
    dt = datetime.datetime(year, month, 1)
    day = dt.weekday()

    return render_template("index.html", year=year,
                                         month=month,
                                         eom=eom,
                                         day=day)


# 再来月のカレンダーの表示
@app.route('/month_after_next', methods=["POST"])
def next_month():
    dt_now = datetime.datetime.now()
    year = dt_now.year
    month = dt_now.month
    if month == 11:
        year = year + 1
        month = 1
    elif month == 12:
        year = year + 1
        month = 2
    else:
        month = month + 2
    # 月末の日にちを取得
    eom = calendar.monthrange(year, month)[1]

    # 月の初めの曜日を取得
    dt = datetime.datetime(year, month, 1)
    day = dt.weekday()

    return render_template("index.html", year=year,
                                         month=month,
                                         eom=eom,
                                         day=day)


# index.htmlに表示するsucedule.jsonの取得
@app.route('/json', methods=["GET"])
def calender_schedule_get():
    with open('schedule.json') as f:
        json_data = json.load(f)        

    # 並び替え(日付が古い順)
    json_data = sorted(json_data, key=lambda x:x['date'])  

    # 現在の日付を取得
    dt_now = datetime.datetime.now()    


    # 現在の月より古いデータを削除    
    dict1 = []
    for j in json_data:  
        date = j["date"][0:4] + j["date"][5:7]              
        if not(int(date) < int(dt_now.strftime('%Y%m'))):            
            dict1.append(j)   

    # jsonファイルを更新する
    with open('schedule.json', 'w') as f:
        json.dump(dict1, f, indent=4, ensure_ascii=False)
    
    # 5文字より大きいの予定を省略する
    limnum = 5
    i = 0
    for j in dict1:        
        if len(j['schedule']) > limnum:
            dict1[i]['schedule'] = j['schedule'][0:limnum] + "..."

        i = i + 1            

    # 同じ日付の予定が3つ以上ある場合、省略する（未完成）
    i = 0
    count = 0    
    k = 0
    dict2 = []    
    for j in dict1:
        # 最初
        if i == 0:
            tmp_date = j['date']            
            dict2.append(j)  

        #次から
        else:
            # 前のデータの日付と同じなら
            if j['date'] == tmp_date:
                count = count + 1
                
            # 前のデータの日付と違うなら
            else:
                count = 0

            dict2.append(j)  
                
        i = i + 1                   
       
    #print(dict2)
    return jsonify(dict2)


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
    print(time,schedule)

    json_sc = {
        "time": time,
        "schedule": schedule,
        "id": str(uuid.uuid4())
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
    id = request.json.get('id', None)

    # チェック
    check = {
        "time": time,
        "schedule": schedule,
        "id": id
    }

    # JSON読み込み
    with open('schedule.json') as f:
        sc_data = json.load(f)

    # リスト型に変換
    sc_list = list(sc_data)

    # フラグ
    flag = False

    # idを用いて予定を判別
    for i in range(len(sc_list)):
        # print(sc_list[i], check)
        if sc_list[i].get("id") == check["id"]:
            # print("削除完了")
            flag = True
            # 元データを削除
            sc_list.remove(sc_list[i])

            # ファイル書き込み
            with open('schedule.json', 'w') as f:
                json.dump(sc_list, f, indent=4, ensure_ascii=False)
            break
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
