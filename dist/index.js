"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Exercise {
    showHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("http://localhost:3000/habits", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const habits = yield response.json();
            let html = "";
            habits.forEach((habit) => {
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
            const hdisplay = document.querySelector("#display");
            hdisplay.innerHTML = html;
        });
    }
    addHabit(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("http://localhost:3000/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            const result = yield response.json();
            console.log(result);
        });
    }
}
const addButton = document.querySelector("#addBtn");
addButton.addEventListener("click", () => {
    const habitName = document.querySelector("#name");
    const habitDate = document.querySelector("#date");
    const input = {
        id: 0,
        habitname: habitName.value,
        habitdate: habitDate.value,
    };
    new Exercise().addHabit(input);
    habitName.value = "";
    habitDate.value = "";
});
new Exercise().showHabits();
