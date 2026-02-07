const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();

function render() {
  monthYear.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(viewYear, viewMonth));
  daysContainer.innerHTML = '';

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // previous month's days to fill
  const prevMonthDays = startDay;
  const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();

  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const d = prevMonthLastDate - i;
    const el = document.createElement('div');
    el.className = 'day outside';
    el.textContent = d;
    daysContainer.appendChild(el);
  }

  // current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'day';
    el.textContent = d;

    if (viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate()) {
      el.classList.add('today');
    }

    daysContainer.appendChild(el);
  }

  // fill trailing cells to complete the last week
  const totalCells = prevMonthDays + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= trailing; i++) {
    const el = document.createElement('div');
    el.className = 'day outside';
    el.textContent = i;
    daysContainer.appendChild(el);
  }
}

prevBtn.addEventListener('click', () => {
  viewMonth -= 1;
  if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
  render();
});

nextBtn.addEventListener('click', () => {
  viewMonth += 1;
  if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
  render();
});

render();
