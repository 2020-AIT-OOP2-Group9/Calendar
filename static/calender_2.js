// 来月のカレンダーを表示
function init() {
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
                if (i < eom && j < 6) {
                    i = i + 1
                    day = day + 1
                }
            }
        }
        tableBody.appendChild(tr)
        day = 0
    }
}

init()