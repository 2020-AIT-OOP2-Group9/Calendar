// 今月のカレンダーを表示

function init() {
    // データの初期表示
    // カレンダーを表示させる
    const tableBody = document.querySelector("#calender-list > tbody")
    tableBody.innerHTML = ""

    week_day = 7

    /**console.log(day)
    console.log(eom)
    console.log(year)
    console.log(month)**/


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
                var element = document.createElement("button")
                element.innerText = i
                element.id = i
                element.value = year + "-" + month + "-" + i

                /**console.log(element.id)
                console.log(element.value)**/

                td.appendChild(element)
                let td_2 = document.createElement('td')
                td_2.innerText = "ここに予定が表示されます"
                td.appendChild(td_2)
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

