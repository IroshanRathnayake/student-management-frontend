// Sidebar Actions
const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");

  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

// Student Chart
const ctx = document.getElementById("studentChart").getContext("2d");
const studentChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["February", "March", "April", "May", "June", "July", "August"],
    datasets: [
      {
        label: "Attendance",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(94, 99, 255)",
        tension: 0.4,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Bar Chart
const ctx2 = document.getElementById("barChart").getContext("2d");
const barChart = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Math", "Science", "History", "English", "ICT"],
    datasets: [
      {
        label: "Students per Subject",
        data: [85, 70, 30, 95, 60],
        backgroundColor: [
          "rgba(181,184,255,1)",
          "rgba(94, 99, 255)",
          "rgba(181,184,255,1)",
          "rgba(94, 99, 255)",
          "rgba(181,184,255,1)",
        ],
        borderColor: [
          "rgba(94, 99, 255)",
          "rgba(94, 99, 255)",
          "rgba(94, 99, 255)",
          "rgba(94, 99, 255)",
          "rgba(94, 99, 255)",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});
