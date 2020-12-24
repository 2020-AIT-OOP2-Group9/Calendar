// 月のカレンダーを表示

function init() {

    // デバック用
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





    // データの初期表示
    // カレンダーを表示させる
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    console.log(day)
    console.log(eom)
    console.log(year)
    console.log(month)


    for (var i = 1; i <= eom; i++) {
        let tr = document.createElement('tr')
        for (var j = 0; j < week_day; j++) {
            if (day != j) {
                let td = document.createElement('td')
                td.innerText = ""
                tr.appendChild(td)
            }
            else {
                let td = document.createElement('td')
                td.innerText = i
                tr.appendChild(td)
                i = i + 1
                day = day + 1
            }
        }
        tableBody.appendChild(tr)
        day = 0
    }

}

init()

document.getElementById("this_month").addEventListener("click", (e) => {
    // ボタンイベントのキャンセル
    e.preventDefault()

    // カレンダーを表示させる
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    console.log(day)
    console.log(eom)
    console.log(year)
    console.log(month)

    for (var i = 1; i <= eom; i++) {
        let tr = document.createElement('tr')
        for (var j = 0; j < week_day; j++) {
            if (day != j) {
                let td = document.createElement('td')
                td.innerText = ""
                tr.appendChild(td)
            }
            else {
                let td = document.createElement('td')
                td.innerText = i
                tr.appendChild(td)
                i = i + 1
                day = day + 1
            }
        }
        tableBody.appendChild(tr)
        day = 0
    }
})

document.getElementById("next_month_1").addEventListener("click", (e) => {
    // ボタンイベントのキャンセル
    e.preventDefault()

    // カレンダーを表示させる
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    console.log(day)
    console.log(eom)
    console.log(year)
    console.log(month)


    for (var i = 1; i <= eom; i++) {
        let tr = document.createElement('tr')
        for (var j = 0; j < week_day; j++) {
            if (day != j) {
                let td = document.createElement('td')
                td.innerText = ""
                tr.appendChild(td)
            }
            else {
                let td = document.createElement('td')
                td.innerText = i
                tr.appendChild(td)
                i = i + 1
                day = day + 1
            }
        }
        tableBody.appendChild(tr)
        day = 0
    }
})

document.getElementById("next_month_2").addEventListener("click", (e) => {
    // ボタンイベントのキャンセル
    e.preventDefault()

    // カレンダーを表示させる
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    console.log(day)
    console.log(eom)
    console.log(year)
    console.log(month)

    for (var i = 1; i <= eom; i++) {
        let tr = document.createElement('tr')
        for (var j = 0; j < week_day; j++) {
            if (day != j) {
                let td = document.createElement('td')
                td.innerText = ""
                tr.appendChild(td)
            }
            else {
                let td = document.createElement('td')
                td.innerText = i
                tr.appendChild(td)
                i = i + 1
                day = day + 1
            }
        }
        tableBody.appendChild(tr)
        day = 0
    }
})

document.getElementById("month_after_next").addEventListener("click", (e) => {
    // ボタンイベントのキャンセル
    e.preventDefault()

    // カレンダーを表示させる
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    console.log(day)
    console.log(eom)

    for (var i = 1; i <= eom; i++) {
        let tr = document.createElement('tr')
        for (var j = 0; j < week_day; j++) {
            if (day != j) {
                let td = document.createElement('td')
                td.innerText = ""
                tr.appendChild(td)
            }
            else {
                let td = document.createElement('td')
                td.innerText = i
                tr.appendChild(td)
                i = i + 1
                day = day + 1
            }
        }
        tableBody.appendChild(tr)
        day = 0
    }
})

// 日付の表示
// １ヶ月分の日付の表示
// ３ヶ月分の日付の表示
// 日付をクリックしてページ遷移
// 日付の空欄箇所に予定の表示

