const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const daysWeek = ['Dom', 'Seg','Ter','Qua','Qui','Sex','Sab']




function defWeek(nav){

    let today = new Date();
    let offset = today.getDay();
    let fristDay = new Date();
    let actual_day = false;
    if (nav =='-'){
        fristDay.setDate(fristDay.getDate()- 7);
        // console.log('menos');
    } else if(nav=='+'){
        // console.log('mais');
        fristDay.setDate(fristDay.getDate()+ 7);
        } 
            
            
    fristDay.setDate(fristDay.getDate()- offset);
    // console.log(fristDay);

    for(let i=0; i<=6; i++){


        if (i==offset && !nav){
            actual_day=true;
        } else {actual_day = false;};


        let displayDia = `${daysWeek[i]} \n ${fristDay.getDate()}  `;
        
        switch (i) {
            case 0: 
                makeElemtDay('day-1',displayDia)
                break;
            case 1: 
                makeElemtDay('day-2',displayDia)
                break;
            case 2: 
                makeElemtDay('day-3',displayDia)
                break;
            case 3: 
                makeElemtDay('day-4',displayDia);
                break;
            case 4: 
                makeElemtDay('day-5',displayDia);
                break;
            case 5: 
                makeElemtDay('day-6',displayDia);
                break;
            case 6:
                makeElemtDay('day-7',displayDia);
                break;
                    };


      fristDay.setDate(fristDay.getDate() + 1);


    };

function makeElemtDay(dia,displayDia){
    let element =document.getElementById(dia);
    element.innerText = displayDia;

    if (actual_day && !nav){
        element.style.color = 'white';
        element.style.borderRadius= '50px' ;//'10px 100px / 120px';
        element.style.background = 'blue';

    }else{
        element.style.color = 'black';
        element.style.borderRadius = 'none';
        element.style.background = 'none';
    
        };
};

}

