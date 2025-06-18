const monthYear = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const selectedDateTitle = document.getElementById('selectedDateTitle');
const eventsList = document.getElementById('eventsList');
const eventInput = document.getElementById('eventInput');
const addEventBtn = document.getElementById('addEventBtn');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = new Date(currentYear, currentMonth, today.getDate());

// Agora os compromissos ficam só em memória:
const eventsMemory = {};

function getMonthName(month) {
  const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  return months[month];
}

function getDateKey(date) {
  return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
}

function renderCalendar(month, year) {
  monthYear.textContent = `${getMonthName(month)} ${year}`;
  calendarDays.innerHTML = '';
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const li = document.createElement('li');
    li.textContent = d;
    if (
      d === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    ) {
      li.classList.add('selected');
    }
    li.onclick = () => {
      selectedDate = new Date(year, month, d);
      renderCalendar(month, year);
      renderAgenda();
    };
    calendarDays.appendChild(li);
  }
}

function renderAgenda() {
  selectedDateTitle.textContent = `Compromissos de ${selectedDate.getDate()} de ${getMonthName(selectedDate.getMonth())}`;
  eventsList.innerHTML = '';
  const events = getEventsForDate(selectedDate);
  if (events.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhum compromisso para este dia.';
    li.style.opacity = '0.6';
    eventsList.appendChild(li);
  } else {
    events.forEach((event, idx) => {
      const li = document.createElement('li');
      li.textContent = event;
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.className = 'event-delete';
      delBtn.onclick = () => {
        removeEvent(selectedDate, idx);
      };
      li.appendChild(delBtn);
      eventsList.appendChild(li);
    });
  }
}

function getEventsForDate(date) {
  const key = getDateKey(date);
  return eventsMemory[key] || [];
}

function saveEventsForDate(date, events) {
  const key = getDateKey(date);
  eventsMemory[key] = events;
}

function addEvent(date, eventText) {
  if (!eventText.trim()) return;
  const events = getEventsForDate(date);
  events.push(eventText.trim());
  saveEventsForDate(date, events);
  renderAgenda();
  eventInput.value = '';
}

function removeEvent(date, idx) {
  const events = getEventsForDate(date);
  events.splice(idx, 1);
  saveEventsForDate(date, events);
  renderAgenda();
}

addEventBtn.onclick = () => {
  addEvent(selectedDate, eventInput.value);
};

eventInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addEvent(selectedDate, eventInput.value);
});

prevMonthBtn.onclick = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  selectedDate = new Date(currentYear, currentMonth, 1);
  renderCalendar(currentMonth, currentYear);
  renderAgenda();
};

nextMonthBtn.onclick = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  selectedDate = new Date(currentYear, currentMonth, 1);
  renderCalendar(currentMonth, currentYear);
  renderAgenda();
};

// Inicialização
renderCalendar(currentMonth, currentYear);
renderAgenda();