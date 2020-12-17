from flask import Flask, request, render_template, jsonify
import json
import datetime

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

# カレンダー表示
@app.route('/')
def index():
    return render_template("index.html")

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