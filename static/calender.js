// 月のカレンダーを表示

// 表示
function init() {
    // データの初期表示
    fetch("/json").then(response => {
        console.log(response)
        response.json().then((data) => {
            console.log(data) // 取得されたレスポンスデータをデバッグ表示
            // カレンダーを表示させるように変更してください
            const tableBody = document.querySelector("#sc_list > tbody")
            tableBody.innerHTML = ""            
            data.forEach(elm => {                   

                // 1行づつ処理を行う
                let tr = document.createElement('tr')
                // 日付
                let td = document.createElement('td')
                
                td.innerText = elm.date
                tr.appendChild(td)
                // スケジュール
                td = document.createElement('td')                                  

                td.innerText = elm.schedule
                tr.appendChild(td)                

                // 1行分をtableタグ内のtbodyへ追加する
                tableBody.appendChild(tr)
            })
            // ここまで
        })
    })
}

init()