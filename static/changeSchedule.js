// カレンダーで選択した日付の予定を表示する処理、jsonファイルにデータを追加・削除する処理

// 表示
function init() {
  // データの初期表示
  fetch("/schedule/json").then(response => {
      console.log(response)
      response.json().then((data) => {
          console.log(data) // 取得されたレスポンスデータをデバッグ表示
          // データを表示させる
          const tableBody = document.querySelector("#sc_list > tbody")
          tableBody.innerHTML = ""

          data.forEach(elm => {
              // 1行づつ処理を行う
              let tr = document.createElement('tr')
              // 時間
              let td = document.createElement('td')
              td.innerText = elm.time
              tr.appendChild(td)
              // スケジュール
              td = document.createElement('td')
              td.innerText = elm.schedule
              tr.appendChild(td)
              //　削除ボタン
              td = document.createElement('td')
              td.innerHTML = "<input type='submit' id='sc_delete' value='削除' class='btn btn-danger'>"
              tr.appendChild(td)

              // 1行分をtableタグ内のtbodyへ追加する
              tableBody.appendChild(tr)
          })
      })
  })
}

init()
// 追加
document.getElementById("add-submit").addEventListener('click', (e) => {
  // ボタンイベントのキャンセル
  e.preventDefault()
  console.log(document.getElementById('add_sc').value)

  const obj = {time: document.getElementById("add_time").value, schedule: document.getElementById("add_sc").value};
  const method = "POST";
  const body = JSON.stringify(obj);
  console.log(obj)

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  fetch('/change/add', { method, headers, body }).then(function (response) {
  init()
  document.getElementById('message-container').innerHTML = "スケジュール登録完了"
  document.getElementById('message-container').style.display = "block"
  })
});

// 削除
document.getElementById("list_body").addEventListener('click', (e) => {
  // ボタンイベントのキャンセル
  e.preventDefault()


  const method = "POST";




  fetch('/change/del', { method }).then(function (response) {
  init()
  document.getElementById('message-container').innerHTML = "削除完了"
  document.getElementById('message-container').style.display = "block"
  })
});