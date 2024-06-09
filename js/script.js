const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const daysWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.']

// Runs when the page loads
window.onload = () => {
    let currentSunday;
    currentSunday = setWeek('today', currentSunday);

    const previousButtonNode = document.getElementById('previous-week-btn')
    const thisWeekButtonNode = document.getElementById('this-week-btn');
    const nextButtonNode = document.getElementById('next-week-btn');


    previousButtonNode.onclick = () => {
        currentSunday = setWeek('previous', currentSunday);
    }

    thisWeekButtonNode.onclick = () => {
        currentSunday = setWeek('today', currentSunday);
    }

    nextButtonNode.onclick = () => {
        currentSunday = setWeek('next', currentSunday);
    }
}


function setWeek(nav, currentSunday) {
    switch(nav){
        case 'previous':
            currentSunday = getPreviousSunday(currentSunday);
            break;
        case 'today':
            currentSunday = getSunday();
            break;
        case 'next':
            currentSunday = getNextSunday(currentSunday);
            break;
    }

    renderMonth(currentSunday);
    renderDaysOfWeek(currentSunday);

    return currentSunday;
}

function getSunday() {
    const today = new Date();
    const offset = today.getDay();
    const sunday = new Date();

    sunday.setDate(today.getDate() - offset);

    return sunday
}

function getNextSunday(sunday) {
    const nextSunday = new Date(sunday);
    nextSunday.setDate(nextSunday.getDate() + 7);
    return nextSunday;
}

function getPreviousSunday(sunday) {
    const previousSunday = new Date(sunday);
    previousSunday.setDate(previousSunday.getDate() - 7);
    return previousSunday;
}

function renderMonth(sunday) {
    // Get the node
    const monthNode = document.getElementById('month');
    
    // Get Month for sunday
    const sundayMonth = months[sunday.getMonth()];
    
    // Get Month for saturday
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);    
    const saturdayMonth = months[saturday.getMonth()];
    
    // Compare the two
    // If they are the same, show month
    if(saturdayMonth === sundayMonth) {
        monthString = `${sundayMonth} de ${sunday.getFullYear()}` ;
    
    // If they are not, concat and show both
    } else {
        monthString = `${sundayMonth}\n\n${saturdayMonth}`;
    }

    
    monthNode.innerText = monthString;
}

function renderDaysOfWeek(sunday) {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const currentDay = new Date(sunday);
    currentDay.setHours(0,0,0,0);
    
    let dayString;
    for (let i = 0; i <= 6; i++) {
        dayNode = document.getElementById(`day-${i+1}`);
        dayString = `${daysWeek[i]} \n ${currentDay.getDate()}`;

        dayNode.innerText = dayString;

        if(currentDay.getTime() == today.getTime()) {
            dayNode.classList.add("today");
        } else {
            dayNode.classList.remove("today");
        }

        
        currentDay.setDate(currentDay.getDate() + 1);
    };

}

function showDay(divNod){
    let day =divNod.id.substring(divNod.id.length -1);
    let dayNode = document.getElementById(`day-${day}`);
     divNod.title=dayNode.innerText;
    };

// function clearDay(id_){
//     let divNode =document.getElementById(id_);
//     divNode.innerText='';
// };

function creatForm(divNode){
    const formNod =document.createElement('form')
    formNod.innerHTML=`<input type="text" id="pname" name="pname" placeholder="Digite o nome do paciente"> <br> \
     <input type="text" id="psname" sname="spname" placeholder="Digite o sobrenome">  <br> \
     <input type="submit" name= ${divNode.id} value="submit" onclick="saveSchedule(this)"></button> ` 

    divNode.appendChild(formNod);
}

function saveSchedule(id_){
    let divNode =document.getElementById(id_.name);
    divNode.innerText=id_.name;
   


}