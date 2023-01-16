const rates = {}
const valUsd = document.querySelector('[data-value="USD"]')
const valGbp = document.querySelector('[data-value="GBP"]')
const valEur = document.querySelector('[data-value="EUR"]')
const inputFirst = document.querySelector('#input')
const inputTwo = document.querySelector('#result')


fetchHandler()
//Функция получения курса валют и отображение их на странице
async function fetchHandler() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await response.json();
    const result = await data;
    console.log(result)

    rates.USD = result.Valute.USD
    rates.EUR = result.Valute.EUR
    rates.GBP = result.Valute.GBP
    console.log(rates)

    valUsd.textContent = rates.USD.Value.toFixed(2)
    valEur.textContent = rates.EUR.Value.toFixed(2)
    valGbp.textContent = rates.GBP.Value.toFixed(2)

    if (rates.USD.Value > rates.USD.Previous) {
        valUsd.classList.add("top")
    } else {
        valUsd.classList.add('bottom')
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        valEur.classList.add("top")
    } else {
        valEur.classList.add('bottom')
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        valGbp.classList.add("top")
    } else {
        valGbp.classList.add('bottom')
    }

}
//Слушаем изменения в текстовом поле и в select (из HTML)
input.oninput = convertValue
select.oninput = convertValue
//Функция конвертации
function convertValue() {
    inputTwo.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2) 
}

//Если хотим сделать обновление валют каждый 10 секунд (Будет работать только если api тоже будет каждый 10 сек обновлять данные)
//setInterval(getCurrencies, 10000);


