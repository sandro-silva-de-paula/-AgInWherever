const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const daysWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.']

let FORM_OPEN = false
let DATABASE = {}
let CURRENT_SUNDAY;

// Runs when the page loads
window.onload = () => {
    setWeek('today');

    const previousButtonNode = document.getElementById('previous-week-btn')
    const thisWeekButtonNode = document.getElementById('this-week-btn');
    const nextButtonNode = document.getElementById('next-week-btn');
    const dayNodes =  document.querySelectorAll('.day');

    previousButtonNode.onclick = () => {
        setWeek('previous');
    }

    thisWeekButtonNode.onclick = () => {
        setWeek('today');
    }

    nextButtonNode.onclick = () => {
        setWeek('next');
    }


    for (let i = 0; i < dayNodes.length; i++){
        dayNodes[i].onclick = createForm;
        dayNodes[i].onmouseenter = showDay;
    }

}


function setWeek(nav) {
    switch (nav) {
        case 'previous':
            CURRENT_SUNDAY = getPreviousSunday();
            break;
        case 'today':
            CURRENT_SUNDAY = getSunday();
            break;
        case 'next':
            CURRENT_SUNDAY = getNextSunday();
            break;
    }

    renderMonth();
    renderDaysOfWeek();
    // renderCalendar();
}

function getSunday() {
    const today = new Date();
    const offset = today.getDay();
    const sunday = new Date();

    sunday.setDate(today.getDate() - offset);
   
    return sunday
}

function getNextSunday() {
    const nextSunday = new Date(CURRENT_SUNDAY);
    nextSunday.setDate(nextSunday.getDate() + 7);
    return nextSunday;
}

function getPreviousSunday() {
    const previousSunday = new Date(CURRENT_SUNDAY);
    previousSunday.setDate(previousSunday.getDate() - 7);
    return previousSunday;
}

function renderMonth() {
    // Get the node
    const monthNode = document.getElementById('month');

    // Get Month for sunday
    const sundayMonth = months[CURRENT_SUNDAY.getMonth()];

    // Get Month for saturday
    const saturday = new Date(CURRENT_SUNDAY);
    saturday.setDate(CURRENT_SUNDAY.getDate() + 6);
    const saturdayMonth = months[saturday.getMonth()];

    // Compare the two
    // If they are the same, show month
    if (saturdayMonth === sundayMonth) {
        monthString = `${sundayMonth} de ${CURRENT_SUNDAY.getFullYear()}`;

        // If they are not, concat and show both
    } else {
        monthString = `${sundayMonth}\n\n${saturdayMonth}`;
    }


    monthNode.innerText = monthString;
}

function renderDaysOfWeek() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDay = new Date(CURRENT_SUNDAY);
    currentDay.setHours(0, 0, 0, 0);

    let dayString;
    for (let i = 0; i <= 6; i++) {
        dayNode = document.getElementById(`day-${i + 1}`);
        dayString = `${daysWeek[i]} \n ${currentDay.getDate()}`;

        dayNode.innerText = dayString;

        if (currentDay.getTime() == today.getTime()) {
            dayNode.classList.add("today");
        } else {
            dayNode.classList.remove("today");
        }


        currentDay.setDate(currentDay.getDate() + 1);
    };

}

function showDay(event) {
    let currentDayNod =event.target;
    let day = currentDayNod.id.substring(currentDayNod.id.length - 1);
    let dayHeaderNode = document.getElementById(`day-${day}`);
    currentDayNod.title = dayHeaderNode.innerText;
}


function createForm(event){
    if (FORM_OPEN) {
        FORM_OPEN = false;
        const formNode = document.getElementById('appt-form')
        if (formNode) {
            formNode.parentElement.removeChild(formNode)
        }
    } else {
        FORM_OPEN = true;
        const dayNode = event.target
        dayNode.innerHTML = `<form id="appt-form">
                                <input type="text" id="pname" name="pname" placeholder="Nome"> 
                                <br>
                                <input type="text" id="sname" placeholder="Sobrenome">
                                <br>
                                <input type="text" id="procedimento" placeholder="Procedimento">
                                <br>
                                <input id="appt-form-submit" type="submit" value="submit">
                            </form>`
        document.getElementById('appt-form-submit').onclick = saveSchedule;
        document.getElementById('pname').onclick = (event) => {
            event.stopPropagation();
        };
        document.getElementById('sname').onclick = (event) => {
            event.stopPropagation();
        };
        document.getElementById('procedimento').onclick = (event) => {
            event.stopPropagation();
        };
    }
}

function saveSchedule(event) {
    event.stopPropagation();
    
    submitNode = event.target
    dayNode = submitNode.parentElement.parentElement
    console.log(dayNode)
    
    firstName = document.getElementById('pname').value
    lastName = document.getElementById('sname').value
    procedimento = document.getElementById('procedimento').value

    if (firstName.length && procedimento.length){
        dayNode.innerText = `${firstName} ${lastName} \n ${procedimento}`
    }

    // SALVA NO BANCO DE DADOS

    // ACHAR O TIMESTAMP EM FORMATO STRING
    offsets = dayNode.id.split('-d');
    const sunday = new Date(CURRENT_SUNDAY);
    // Andou os dias
    sunday.setDate(sunday.getDate() + parseInt(offsets[1]) - 1)
    // Adicionar as horas
    sunday.setHours(parseInt(offsets[0]),0,0,0);
    // Convert to string
    const timestamp = sunday.toISOString();

    DATABASE[timestamp] = [ `${firstName} ${lastName}`, `${procedimento}`]
    console.log(DATABASE)

    
    createForm();
    // renderCalendar();
}