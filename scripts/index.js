const cityFromFieldContainer = document.querySelector(".header-search-input-fields-from")
const cityToFieldContainer = document.querySelector(".header-search-input-fields-to")

let cityPickerInput = null
let cityPickerInputContainer = null

const cityPicker = document.querySelector(".headerModal-cityPicker");

function City(name, code) {
    this.name = name;
    this.code = code
}

const cityList = [
    new City("Варшава", "WAW"),
    new City("Кишинев", "RMO"),
    new City("Балице", "KRK"),
    new City("Париж", "PAR"),
    new City("Нью-Йорк", "NYC"),
    new City("Лондон", "LON"),
]

function closeCityPicker() {
    document.querySelector(".headerModal-cityPicker").style.display = "none";
}

function openCityPicker() {
    cityPicker.style.display = "block";
    let pickedCity = cityPicker.querySelector(".headerModal-cityPicker-picked");
    let pickedCityValue = cityPicker.querySelector(".headerModal-cityPicker-picked-city");
    let value = cityPickerInput.value;
    let city = cityList.filter(city => city.name === value)[0]
    if (value && city) {
        pickedCity.style.display = "block";
        pickedCityValue.innerHTML = `<span class="headerModal-cityPicker-picked-city-name">${city.name}</span><span>${city.code}</span>`;
        let clearButton = document.createElement("button");
        clearButton.addEventListener("click", (e) => {
            e.stopPropagation()
            cityPickerInput.value = "";
            openCityPicker()
        })
        pickedCityValue.appendChild(clearButton);
    } else {
        pickedCity.style.display = "none";
        pickedCityValue.textContent = "";
    }
    let cityListDiv = cityPicker.querySelector(".headerModal-cityPicker-cityList");
    cityListDiv.innerHTML = "<div class=\"headerModal-cityPicker-cityList-title\">Ближайшие аэропорты</div>";

    cityList.forEach((city, index) => {
        let item = document.createElement("div");
        item.classList.add("headerModal-cityPicker-cityList-item");
        item.addEventListener("click", (e) => {
            e.stopPropagation()
            cityPickerInput.value = cityList[index].name;
            openCityPicker()
        })
        item.innerHTML = `<span class="headerModal-cityPicker-cityList-item-name">${city.name}</span><span>${city.code}</span>`;
        cityListDiv.appendChild(item);
    })

}

const months = ['Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

let date = new Date()
let currentMonth = date.getMonth()
let currentYear = date.getFullYear()
let currentDay = date.getDate()
let shownDatesCells = []
let shownDates = []

const fromField = document.querySelector('.header-search-input-fields-from')
const toField = document.querySelector('.header-search-input-fields-to')
const detailsField = document.querySelector('.header-search-input-fields-details')

let fields = [fromField, toField, detailsField]
fields.forEach(field => {
    field.addEventListener('click', () => {
        field.querySelector('input').focus()
    })
})

const dateFromField = getById("dateFrom");
const dateToField = getById("dateTo");

const calendarContainer = document.querySelector(".header-search-input-fields-calendar");

let datePickerVisible = false
const datePicker = document.querySelector(".headerModal-datePicker");

document.addEventListener("click", function (event) {
    if (datePicker.contains(event.target) || calendarContainer.contains(event.target)) {
        openDatePicker()
    } else {
        closeDatePicker()
    }

    console.log(event.target)

    if (cityFromFieldContainer.contains(event.target)) {
        cityPickerInputContainer = cityFromFieldContainer
        cityPickerInput = cityFromFieldContainer.querySelector("input")
        openCityPicker()
    } else if (cityToFieldContainer.contains(event.target)) {
        cityPickerInputContainer = cityToFieldContainer
        cityPickerInput = cityToFieldContainer.querySelector("input")
        cityToFieldContainer.classList.add("header-search-input-fields-to-focused")
        openCityPicker()
    } else if (cityPicker.contains(event.target)) {
        openCityPicker()
    } else {
        closeCityPicker()
        cityPickerInputContainer = null;
    }

    switch (cityPickerInputContainer) {
        case cityFromFieldContainer: {
            cityFromFieldContainer.classList.add("header-search-input-fields-from-focused");
            cityToFieldContainer.classList.remove("header-search-input-fields-to-focused");
            break;
        }
        case cityToFieldContainer: {
            cityToFieldContainer.classList.add("header-search-input-fields-to-focused");
            cityFromFieldContainer.classList.remove("header-search-input-fields-from-focused");
            break;
        }
        default: {
            cityFromFieldContainer.classList.remove("header-search-input-fields-from-focused");
            cityToFieldContainer.classList.remove("header-search-input-fields-to-focused");
            break;
        }
    }


})

function openDatePicker() {
    if (!datePickerVisible) {
        datePicker.style.display = "block";
        datePickerVisible = true;
        calendarContainer.classList.add("header-search-input-fields-calendar-focused");
    }
}

function closeDatePicker() {
    if (datePickerVisible) {
        datePicker.style.display = "none";
        datePickerVisible = false
        calendarContainer.classList.remove("header-search-input-fields-calendar-focused");
    }
}

const daysContainer = getById('datePicker-days');
daysContainer.addEventListener('click', (e) => {
    let element = e.target.closest('div')
    paintDay(element)
})

function getById(id) {
    return document.getElementById(id)
}

function showCurrentMonth() {
    showMonth(currentYear, currentMonth)
}

function showMonth(year, month) {

    getById('datePicker-month').textContent = `${months[month]} ${year}`;
    let firstDateOfMonth = new Date(year, month, 1).getDate();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDateOfPrevMonth = new Date(year, month, 0)
    let firstDateOfNextMonth = new Date(year, month + 1, 1)
    daysContainer.innerHTML = "";

    function updateDateCells(dateNumber, monthNumber, itemClass = null) {
        let date = new Date(year, monthNumber, dateNumber);
        let dateIndex = shownDates.indexOf(date)
        if (dateIndex === -1) {
            let day = document.createElement('div');
            day.textContent = dateNumber;
            day.classList.add(itemClass);
            daysContainer.append(day);
            shownDatesCells.push(day);
            shownDates.push(date);
        } else {
            daysContainer.append(shownDatesCells[dateIndex]);
        }
    }

    for (let i = lastDateOfPrevMonth.getDay(); i >= 1; i--) {
        let dateNumber = lastDateOfPrevMonth.getDate() - i + 1;
        updateDateCells(dateNumber, month - 1, "headerModal-datePicker-days-inactive")
    }

    for (let i = firstDateOfMonth; i <= lastDateOfMonth; i++) {
        updateDateCells(i, month);
    }

    for (let i = firstDateOfNextMonth.getDay(); i <= 7; i++) {
        if (i === 1) break
        let dateNumber = firstDateOfNextMonth.getDate() - firstDateOfNextMonth.getDay() + i;
        updateDateCells(dateNumber, month, "headerModal-datePicker-days-inactive");
    }

    colorCells()
}

let datePickerCounter = 0
let pickedDates = []
let pickedDatesAll = []

function formatDate(date) {

    let day = date.getDate();
    if (("" + day).length < 2) {
        day = "0" + day;
    }

    let month = date.getMonth() + 1;
    if (("" + month).length < 2) {
        month = "0" + month;
    }

    return `${day}.${month}.${date.getFullYear()}`;
}

function paintDay(element) {

    if (datePickerCounter > 1) {
        datePickerCounter = 0;
        pickedDates.forEach(item => {
            item.classList.remove("headerModal-datePicker-days-chosen")
        });
        pickedDates = [];
        pickedDatesAll.forEach(item => {
            item.classList.remove("headerModal-datePicker-days-between")
        });
        pickedDatesAll = [];
    }
    pickedDates.push(element)

    switch (datePickerCounter) {
        case 0: {
            let dateIndex = shownDatesCells.indexOf(element)
            let date = shownDates[dateIndex]
            dateFromField.value = formatDate(date)
            break
        }
        case 1: {
            let dateIndex = shownDatesCells.indexOf(element)
            let date = shownDates[dateIndex]
            dateToField.value = formatDate(date)
            break
        }
    }

    element.classList.add("headerModal-datePicker-days-chosen");

    colorCells()

    datePickerCounter++;
}

function colorCells() {
    if (datePickerCounter === 1) {

        let firstIndex = shownDatesCells.indexOf(pickedDates[0]);
        let lastIndex = shownDatesCells.indexOf(pickedDates[1]);

        if (firstIndex > lastIndex) {
            let temp = lastIndex;
            lastIndex = firstIndex;
            firstIndex = temp;
        }

        pickedDatesAll = shownDatesCells.slice(firstIndex, lastIndex);

        for (element of pickedDatesAll) {
            if (element !== pickedDates[0] && element !== pickedDates[1])
                element.classList.add("headerModal-datePicker-days-between");
        }

    }
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0
        currentYear++
    } else currentMonth++

    showCurrentMonth()
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11
        currentYear--
    } else currentMonth--

    showCurrentMonth()
}

function createCalendar() {
    getById('prevMonthPage').addEventListener('click', (e) => {
        prevMonth()
    })
    getById('nextMonthPage').addEventListener('click', (e) => {
        nextMonth()
    })
    let title = getById('datePicker-daysTitle');
    daysOfWeek.forEach(item => {
        let day = document.createElement('div');
        day.textContent = item
        title.append(day)
    })
    showCurrentMonth()
}

createCalendar();