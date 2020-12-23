from flask import Flask, request, render_template, jsonify
import json
import datetime
import calendar

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