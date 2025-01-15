const cityFromFieldContainer = document.querySelector('.header-search-input-fields-from')
const cityToFieldContainer = document.querySelector('.header-search-input-fields-to')

let cityPickerInput = null
let cityPickerInputContainer = null

const cityPicker = document.querySelector('.headerModal-cityPicker');

function City(name, code) {
    this.name = name;
    this.code = code
}

const cityList = [
    new City('Варшава', 'WAW'),
    new City('Кишинев', 'RMO'),
    new City('Балице', 'KRK'),
    new City('Париж', 'PAR'),
    new City('Нью-Йорк', 'NYC'),
    new City('Лондон', 'LON'),
]

function closeCityPicker() {
    fadeOut(cityPicker);
}

function openCityPicker() {
    fadeIn(cityPicker);
    let pickedCity = cityPicker.querySelector('.headerModal-cityPicker-picked');
    let pickedCityValue = cityPicker.querySelector('.headerModal-cityPicker-picked-city');
    let value = cityPickerInput.value;
    let city = cityList.filter(city => city.name === value)[0]
    if (value && city) {
        pickedCity.style.display = 'block';
        pickedCityValue.innerHTML = `<span class='headerModal-cityPicker-picked-city-name'>${city.name}</span><span>${city.code}</span>`;
        let clearButton = document.createElement('button');
        clearButton.addEventListener('click', (e) => {
            e.stopPropagation()
            cityPickerInput.value = '';
            openCityPicker()
        })
        pickedCityValue.appendChild(clearButton);
    } else {
        pickedCity.style.display = 'none';
        pickedCityValue.textContent = '';
    }
    let cityListDiv = cityPicker.querySelector('.headerModal-cityPicker-cityList');
    cityListDiv.innerHTML = '<div class=\'headerModal-cityPicker-cityList-title\'>Ближайшие аэропорты</div>';

    cityList.forEach((city, index) => {
        let item = document.createElement('div');
        item.classList.add('headerModal-cityPicker-cityList-item');
        item.addEventListener('click', (e) => {
            e.stopPropagation()
            cityPickerInput.value = cityList[index].name;
            openCityPicker()
        })
        item.innerHTML = `<span class='headerModal-cityPicker-cityList-item-name'>${city.name}</span><span>${city.code}</span>`;
        cityListDiv.appendChild(item);
    })
}

function swapCities() {
    const cityFrom = getById("cityFrom");
    const cityTo = getById("cityTo");
    let temp = cityFrom.value;
    cityFrom.value = cityTo.value;
    cityTo.value = temp;
}

let switchButtonFlipped = false;
const switchButton = getById('switch')
switchButton.addEventListener('click', () => {
    if (switchButtonFlipped) {
        switchButton.classList.remove('switchAnimation');
        switchButton.classList.add('switchAnimationReverse');
        swapCities()
    } else {
        switchButton.classList.remove('switchAnimationReverse');
        switchButton.classList.add('switchAnimation');
        swapCities()
    }
    switchButtonFlipped = !switchButtonFlipped;
})

const months = ['Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

let date = new Date()
let currentMonth = date.getMonth()
let currentYear = date.getFullYear()
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

const dateFromField = getById('dateFrom');
const dateToField = getById('dateTo');

const calendarContainer = document.querySelector('.header-search-input-fields-calendar');

let datePickerVisible = false
const datePicker = document.querySelector('.headerModal-datePicker');

let detailsModalVisible = false

const inputForm = {
    fromPlace: null,
    toPlace: null,
    fromDate: null,
    toDate: null,
    details: null
}

function getCity(name) {
    let filteredCity = cityList.filter(
        city => city.name === name
    )[0]
    if (filteredCity) {
        return filteredCity
    } else {
        return null
    }
}

function parseDate(dateString) {
    if (dateString) {
        let list = dateString.split('.')
        return new Date(list[2], list[1] - 1, list[0]);
    } else return null;
}

function sendData() {
    inputForm.fromPlace = getCity(fromField.querySelector('input').value)
    inputForm.toPlace = getCity(toField.querySelector('input').value)

    inputForm.fromDate = parseDate(dateFromField.value)
    inputForm.toDate = parseDate(dateToField.value)

    inputForm.details = details
    let validData = true

    for (let key in inputForm) {
        if (!inputForm[key]) {
            validData = false
        }
    }

    if (!validData) {
        alert('Одно или несколько полей пустые')
    } else {
        alert('Данные отправлены (см. консоль)')
        console.log(inputForm)
    }
}

getById('submit').addEventListener('click', () => {
    sendData()
})

const details = {
    passengers: {
        adult: 0,
        kids: 0,
        babies: 0
    },
    class: ''
}

document.addEventListener('click', function (event) {
    if (datePicker.contains(event.target) || calendarContainer.contains(event.target)) {
        openDatePicker()
    } else {
        closeDatePicker()
    }

    if (cityFromFieldContainer.contains(event.target)) {
        cityPickerInputContainer = cityFromFieldContainer
        cityPickerInput = cityFromFieldContainer.querySelector('input')
        openCityPicker()
    } else if (cityToFieldContainer.contains(event.target)) {
        cityPickerInputContainer = cityToFieldContainer
        cityPickerInput = cityToFieldContainer.querySelector('input')
        cityToFieldContainer.classList.add('header-search-input-fields-to-focused')
        openCityPicker()
    } else if (cityPicker.contains(event.target)) {
        openCityPicker()
    } else {
        closeCityPicker()
        cityPickerInputContainer = null;
    }

    switch (cityPickerInputContainer) {
        case cityFromFieldContainer: {
            cityFromFieldContainer.classList.add('header-search-input-fields-from-focused');
            cityToFieldContainer.classList.remove('header-search-input-fields-to-focused');
            break;
        }
        case cityToFieldContainer: {
            cityToFieldContainer.classList.add('header-search-input-fields-to-focused');
            cityFromFieldContainer.classList.remove('header-search-input-fields-from-focused');
            break;
        }
        default: {
            cityFromFieldContainer.classList.remove('header-search-input-fields-from-focused');
            cityToFieldContainer.classList.remove('header-search-input-fields-to-focused');
            break;
        }
    }

    if (detailsField.contains(event.target)) {
        detailsModalVisible = true
        openDetailsModal()
    } else {
        detailsModalVisible = false
        closeDetailsModal()
    }
})

const detailsModal = document.querySelector('.headerModal-details')

function increaseValue(input) {
    ++input.value
}

function decreaseValue(input) {
    --input.value
}

function updateDetails() {
    let inputs = detailsModal.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.type === 'text') {
            details.passengers[input.id] = +input.value;
        } else if (input.type === 'radio') {
            if (input.checked) {
                details.class = input.value;
            }
        }
    })
    updateDetailsInput()
}

updateDetails()

function updateDetailsInput() {
    let detailsInput = getById('details')
    let passengers = details.passengers.adult + details.passengers.kids + details.passengers.babies
    detailsInput.value = `${passengers} пассажир(ов), ${details.class}`
}


const detailsButtons = detailsModal.querySelectorAll('button')

detailsButtons.forEach(element => {
    if (element.classList.contains('help')) {
        element.addEventListener('click', function () {
            alert('Вы нажали на кнопку помощи')
        },)
    } else {
        let parentDiv = element.closest('div')
        let input = parentDiv.querySelector('input')

        if (element.classList.contains('plus')) {
            element.addEventListener('click', function () {
                if (details.passengers.adult + details.passengers.kids + details.passengers.babies < 9) {
                    if (details.passengers.adult === 0 && input.id !== 'adult') {
                        alert('Невозможно купить билет детям без взрослых!')
                    } else {
                        increaseValue(input);
                        details.passengers[input.id] = +input.value;
                        updateDetailsInput()
                    }
                }
            },)
        } else if (element.classList.contains('minus')) {
            element.addEventListener('click', function () {
                if (details.passengers[input.id] > 0) {

                    if (details.passengers.kids + details.passengers.babies > 0
                        && input.id === 'adult'
                        && details.passengers.adult === 1) {
                        alert('Невозможно купить билет детям без взрослых!')
                    } else {
                        decreaseValue(input);
                        details.passengers[input.id] = +input.value;
                        updateDetailsInput()
                    }
                }
            },)
        }

    }
})

const detailsRadio = detailsModal.querySelectorAll('input[type="radio"]')
detailsRadio.forEach(element => {
    element.addEventListener('change', function () {
        details.class = element.value;
        updateDetailsInput()
    })
})

function fadeIn(element) {
    element.style.display = 'block';
    element.classList.remove('fadeOutAnimation');
    element.classList.add('fadeInAnimation');
}

function fadeOut(element) {
    element.classList.remove('fadeInAnimation');
    element.classList.add('fadeOutAnimation');
    setTimeout(() => {
        element.style.display = 'none'
    }, 200);
}

function openDetailsModal() {
    fadeIn(detailsModal)
    detailsField.classList.add('header-search-input-fields-details-focused');
}

function closeDetailsModal() {
    fadeOut(detailsModal)
    detailsField.classList.remove('header-search-input-fields-details-focused');
}

function openDatePicker() {
    if (!datePickerVisible) {
        fadeIn(datePicker)
        datePickerVisible = true;
        calendarContainer.classList.add('header-search-input-fields-calendar-focused');
    }
}

function closeDatePicker() {
    if (datePickerVisible) {
        fadeOut(datePicker);
        datePickerVisible = false;
        calendarContainer.classList.remove('header-search-input-fields-calendar-focused');
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
    daysContainer.innerHTML = '';

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
        updateDateCells(dateNumber, month - 1, 'headerModal-datePicker-days-inactive')
    }

    for (let i = firstDateOfMonth; i <= lastDateOfMonth; i++) {
        updateDateCells(i, month);
    }

    for (let i = firstDateOfNextMonth.getDay(); i <= 7; i++) {
        if (i === 1) break
        let dateNumber = firstDateOfNextMonth.getDate() - firstDateOfNextMonth.getDay() + i;
        updateDateCells(dateNumber, month, 'headerModal-datePicker-days-inactive');
    }

    colorCells()
}

let datePickerCounter = 0
let pickedDateInputs = []
let pickedDatesAll = []

function formatDate(date) {

    let day = date.getDate();
    if (('' + day).length < 2) {
        day = '0' + day;
    }

    let month = date.getMonth() + 1;
    if (('' + month).length < 2) {
        month = '0' + month;
    }

    return `${day}.${month}.${date.getFullYear()}`;
}

function paintDay(element) {

    if (datePickerCounter > 1) {
        datePickerCounter = 0;
        pickedDateInputs.forEach(item => {
            item.classList.remove('headerModal-datePicker-days-chosen')
        });
        pickedDateInputs = [];
        pickedDatesAll.forEach(item => {
            item.classList.remove('headerModal-datePicker-days-between')
        });
        pickedDatesAll = [];
    }
    pickedDateInputs.push(element)

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

    element.classList.add('headerModal-datePicker-days-chosen');

    colorCells()

    datePickerCounter++;
}

function colorCells() {
    if (datePickerCounter === 1) {

        let firstIndex = shownDatesCells.indexOf(pickedDateInputs[0]);
        let lastIndex = shownDatesCells.indexOf(pickedDateInputs[1]);

        if (firstIndex > lastIndex) {
            let temp = lastIndex;
            lastIndex = firstIndex;
            firstIndex = temp;
        }

        pickedDatesAll = shownDatesCells.slice(firstIndex, lastIndex);

        for (element of pickedDatesAll) {
            if (element !== pickedDateInputs[0] && element !== pickedDateInputs[1])
                element.classList.add('headerModal-datePicker-days-between');
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
    getById('prevMonthPage').addEventListener('click', () => {
        prevMonth()
    })
    getById('nextMonthPage').addEventListener('click', () => {
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

function PopularDestination(from, to, price) {
    this.from = from;
    this.to = to;
    this.price = price;
}

let popularDestinations = [
    new PopularDestination('Варшава', 'Милан', 771),
    new PopularDestination('Варшава', 'Лондон', 1001),
    new PopularDestination('Варшава', 'Аликанте', 1424),
    new PopularDestination('Варшава', 'Мадрид', 1646),
    new PopularDestination('Варшава', 'Барселона', 1663),
    new PopularDestination('Варшава', 'Амстердам', 3256),
    new PopularDestination('Варшава', 'Лиссабон', 3364),
    new PopularDestination('Варшава', 'Париж', 4077),
    new PopularDestination('Варшава', 'Нью-Йорк', 21277),
    new PopularDestination('Варшава', 'Денпасар-Бали', 25573),
]

function getPopularDestination() {
    const popularDestinationDiv = document.querySelector('.main-content-popular-card')

    for (let i = 0; i <= popularDestinations.length / 2; i++) {
        let firstItem = popularDestinations[i]
        let secondItem = popularDestinations[i + popularDestinations.length / 2 - 1]

        let listItem = document.createElement('div');
        listItem.classList.add('main-content-popular-card-listItem');
        listItem.innerHTML = `
        <p>${firstItem.from} → ${firstItem.to} <span>от ${firstItem.price} ₽</span></p>
        <p>${secondItem.from} → ${secondItem.to} <span>от ${secondItem.price} ₽</span></p>`
        popularDestinationDiv.append(listItem);
    }
}

getPopularDestination()

function Company(name, rate) {
    this.name = name;
    this.rate = rate;
}

let top10Companies = [
    new Company('Эйр Нью Зиланд', 4.5),
    new Company('Эмирейтс', 4.7),
    new Company('Катар Эйрвейз', 4.7),
    new Company('Тюркиш Эрлайнз', 4.7),
    new Company('Сингапур Эйрлайнз', 4.7),
    new Company('Кореан Эйр', 4.6),
    new Company('Катай Пасифик', 4.5),
    new Company('Эйр Астана', 4.5),
    new Company('Верджин Атлантик Эйрвэйз', 4.5),
]

function getTop10Companies() {

    const topDiv = document.querySelector('.main-content-top-card');
    top10Companies
        .toSorted((a, b) => b.rate - a.rate)
        .forEach((item, index) => {
            let listItem = document.createElement('div');
            listItem.classList.add('main-content-top-card-listItem');
            listItem.innerHTML = `
        <p>${index + 1}<a>${item.name}</a> <span>${item.rate}</span></p>`
            topDiv.append(listItem);
        })

}

getTop10Companies()