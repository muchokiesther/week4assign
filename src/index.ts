interface Input {
  id: number;
  habitname: string;
  habitdate: string;
}

class Exercise {
    async showHabits() {
        const response = await fetch("http://localhost:3000/habits", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const habits = await response.json();
        let html = "";
        habits.forEach((habit: Input) => {
          const today = new Date();
          const habitDate = new Date(habit.habitdate);
          const diffInMs = today.getTime() - habitDate.getTime();
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          html += `
            <div id="content">
              <p>${habit.habitname}</p>
              <span>${habit.habitdate} (stopped habit ${diffInDays} days ago)</span>
            </div>
          `;
        });
        const hdisplay = document.querySelector("#display") as HTMLDivElement;
        hdisplay.innerHTML = html;
      }
      

  async addHabit(input: Input) {
    const response = await fetch("http://localhost:3000/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const result = await response.json();
    console.log(result);
  }
}

const addButton = document.querySelector("#addBtn") as HTMLButtonElement;
addButton.addEventListener("click", () => {
  const habitName = document.querySelector("#name") as HTMLInputElement;
  const habitDate = document.querySelector("#date") as HTMLInputElement;
  const input: Input = {
    id: 0, // You may want to generate a unique ID for each input instead of hardcoding it to 0.
    habitname: habitName.value,
    habitdate: habitDate.value,
  };
  new Exercise().addHabit(input);
  habitName.value = "";
  habitDate.value = "";
});

new Exercise().showHabits();
