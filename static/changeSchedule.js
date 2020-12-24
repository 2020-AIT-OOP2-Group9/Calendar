// カレンダーで選択した日付の予定を表示する処理、jsonファイルにデータを追加・削除する処理
display()

// 追加
document.getElementById("send").addEventListener('click', (e) => {
    // ボタンイベントのキャンセル
    e.preventDefault();
    tm1 = document.getElementById("add_time").value
    tm2 = document.getElementById("add_time2").value
    sc = document.getElementById("add_sc").value
    const obj = {time: document.getElementById("add_time").value+"〜"+document.getElementById("add_time2").value, schedule: document.getElementById("add_sc").value};
    console.log(obj)
    const method = "post";
    const body = JSON.stringify(obj);
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    };

    let error_message = ""
    if (!tm1 && tm1 === "" || !tm2 && tm2 === "") error_message += "時間が未入力です。<br>"
    if (!sc && sc === "") error_message += "スケジュールが未入力です。<br>"

    if (error_message !== "") {
        document.getElementById('error-container').innerHTML = error_message
        document.getElementById('error-container').style.display = "block"
        return
    } else {
        document.getElementById('error-container').innerHTML = ""
        document.getElementById('error-container').style.display = "none"
    }
    fetch("./change/add", {method, headers, body}).then((res)=> res.json()).then(()=>{display();}).catch(console.error);
    document.getElementById('message-container').innerHTML = "追加完了"
    document.getElementById('message-container').style.display = "block"
});

function del(time, schedule, id){
    const obj = { "time": time, "schedule": schedule, "id": id};
    console.log(obj)
    const method = "post";
    const body = JSON.stringify(obj);
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    };
    fetch("./change/del", {method, headers, body}).then((res)=> res.json()).then(()=>{display();}).catch(console.error);
}
function check(time, schedule, id){
  ret = confirm("本当に削除しますか？");
  if (ret == true){
    del(time, schedule, id)
  }
}

function display(){
    fetch("./schedule/json")
    .then((res)=> res.json())
    .then((res)=>{
        document.getElementById("sc-body").innerHTML = "";
        res.forEach((val)=>{
            const haikuCard =
            `
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <p class="fs-2 lh-1 text-center mt-3">${val['schedule']}</p>
                        <div class="text-end">
                            <div class="row align-items-center d-flex justify-content-between">
                                <div class="col-auto align-self-end">
                                    <button type="button" class="btn btn-danger"
                                     onclick=check("${val['time']}","${val['schedule']}","${val['id']}")>
                                        <i>削除</i>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <p class="fs-5 lh-1">${val['time']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `

            document.getElementById("sc-body").innerHTML += haikuCard;
        })
    })
    .catch(console.error);
}