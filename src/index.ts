interface Iexercsie{
        id:number
        habitname:string
        // data:Date
}

interface Input{
    id:number
    habitname:string
    habitdate:string
}



class exercise{
     async Showhabits() {
                    const response = await fetch("http://localhost:3000/habits", {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
            const habits = await response.json();
            //console.log(habits);
            let html=''
            habits.forEach((habit: { habitname: string; habitdate: string}) => {
                html+=`
                <div id="content">
             <p>${habit.habitname}</p>
             <span>${habit.habitdate}</span>
             </div>
                `
            });
            const hdisplay =document.querySelector("#display") as HTMLDivElement
            hdisplay.innerHTML = html;
        }
}

new exercise().Showhabits()


async function collectdata(){
    let collecteddata=await fetch('http://localhost:3000/habits')
    let nhabits=await collecteddata.json()
    console.log(nhabits)
}


collectdata();

const acontainer = document.querySelector('#albums') as HTMLSelectElement

acontainer.addEventListener('change', ()=>{  
    new exercise().Showhabits({acontainer.value} )
    console.log(+acontainer.value);
    
})
