class MonthView {
    constructor() {
        this.currentDate = new Date();
        this.months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    }

    render() {
        const monthName = this.months[this.currentDate.getMonth()];
        const year = this.currentDate.getFullYear();
        const daysInMonth = this.getDaysInMonth(this.currentDate.getMonth(), year);
        const firstDay = new Date(year, this.currentDate.getMonth(), 1).getDay();

        let daysHtml = '';
        for (let i = 0; i < firstDay; i++) {
            daysHtml += '<div class="day empty"></div>';
        }
        for (let day = 1; day <= daysInMonth; day++) {
            daysHtml += `<div class="day">${day}</div>`;
        }

        return `
            <div class="month-view">
                <h2>${monthName} ${year}</h2>
                <div class="days-grid">
                    ${daysHtml}
                </div>
                <button onclick="prevMonth()">Previous</button>
                <button onclick="nextMonth()">Next</button>
            </div>
        `;
    }

    getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.updateView();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.updateView();
    }

    updateView() {
        const monthViewElement = document.querySelector('.month-view');
        monthViewElement.innerHTML = this.render();
    }
}

export default MonthView;