// 今月のカレンダーを表示

// データの初期表示
function init() {
    var len = 0
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    /**console.log(day)
    console.log(eom)
    console.log(year)
    console.log(month)**/


    // デバック用
    fetch("/json").then(response => {
        //console.log(response)
        response.json().then((data) => {
            //console.log(data) // 取得されたレスポンスデータをデバッグ表示
            // カレンダーを表示させるように変更してください
            len = data.length
            console.log(len)
            cnt_schedule = 0

            for (var i = 1; i <= eom; i++) {
                let tr = document.createElement('tr')
                for (var j = 0; j < week_day; j++) {
                    if (day != j) {
                        let td = document.createElement('td')
                        td.innerText = ""
                        tr.appendChild(td)
                    }
                    else {
                        tr.id = year + "-" + month + "-" + i
                        let td_2 = document.createElement('td')
                        //let td_2 = document.createElement('td')
                        var element = document.createElement("button")
                        element.innerText = i
                        element.name = "date"
                        element.value = year + "-" + month + "-" + i
                        td_2.appendChild(element)
                        data.forEach(elm => {
                            let td = document.createElement('td')
                            if (tr.id === elm.date) {
                                td.innerText = elm.schedule
                                td_2.appendChild(td)
                                cnt_schedule = cnt_schedule + 1
                            }
                        })
                        if (cnt_schedule == 0) {
                            let td = document.createElement('td')
                            td.innerText = "・予定なし"
                            td_2.appendChild(td)
                        }
                        tr.appendChild(td_2)
                        if (i < eom && j < 6) {
                            i = i + 1
                            day = day + 1
                        }
                        cnt_schedule = 0
                    }
                }
                tableBody.appendChild(tr)
                day = 0
            }
        })
    })
}

init()

