class DayList {
    constructor(days) {
        this.days = days;
    }

    render() {
        const dayListContainer = document.createElement('div');
        dayListContainer.className = 'day-list';

        this.days.forEach(day => {
            const dayItem = document.createElement('div');
            dayItem.className = 'day-item';
            dayItem.textContent = day;
            dayItem.addEventListener('click', () => this.handleDayClick(day));
            dayListContainer.appendChild(dayItem);
        });

        return dayListContainer;
    }

    handleDayClick(day) {
        console.log(`Day selected: ${day}`);
        // Additional functionality for day selection can be added here
    }
}

export default DayList;