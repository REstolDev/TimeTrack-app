function clear() {
  localStorage.clear();
}

const add = () => {
  recoverProjects();
  projects.push(
    new project(
      document.getElementById("projectName").value,
      Date.now(),
      timeDifference
    )
  );
  saveProjects();
  alert("Project saved");
};

const recoverProjects = () => {
  projectsJSON = localStorage.getItem("projects");
  projects = JSON.parse(projectsJSON);

  if (projects === null) {
    projects = new Array();
  }
};

const saveProjects = () => {
  let var_json = JSON.stringify(projects);
  localStorage.setItem("projects", var_json);
};

const chargeSelectsData = () => {
  recoverProjects();

  const filterProjectsByName = [...new Set(projects.map((item) => item.name))];

  let listProjectsByName = filterProjectsByName.map(
    (item) => `<option value="${item}">${item}</option>`
  );

  document.getElementById(
    "projectsName"
  ).innerHTML = `<option value="" selected>Select all</option> ${listProjectsByName.reduce(
    (listado, prod) => listado + prod
  )}`;

  const filterProjectsByDate = [
    ...new Set(projects.map((item) => convertToDate(item.date))),
  ];
  filterProjectsByDate.sort((a, b) => a < b);

  let listProjectsByDate = filterProjectsByDate.map(
    (item) => `<option value="${item}">${item}</option>`
  );

  document.getElementById(
    "projectsDate"
  ).innerHTML = `<option value="" selected>Select all</option> ${listProjectsByDate.reduce(
    (listado, prod) => listado + prod
  )}`;
};

const filter = () => {
  recoverProjects();

  const projectName = document.getElementById("projectsName").value;
  const projectDate = document.getElementById("projectsDate").value;
  let filteredProjects = projects;

  if (projectName !== "") {
    filteredProjects = projects.filter((item) => item.name === projectName);
  }

  if (projectDate !== "") {
    filteredProjects = filteredProjects.filter(
      (item) => convertToDate(item.date) === projectDate
    );
  }

  if (filteredProjects.length === 0) {
    document.getElementById("showProjects").innerHTML = "No results";
    return;
  }

  filteredProjects.sort((a, b) => a.date < b.date);

  document.getElementById("showProjects").innerHTML =
    createProjectTable(filteredProjects);

  document.getElementById(
    "calcTotalTime"
  ).innerHTML = `<span class="history__span"> Total Time: ${
    calcTotalTime(filteredProjects)
  }</span>`;
};

const convertToDateTime = (date) => {
  date = new Date(date);
  date = date.toLocaleString();
  return date;
};

const convertToDate = (date) => {
  date = new Date(date);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const createProjectTable = (filteredProjects) => {
  let tableHTML = `<table>
            <thead>
            <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Project Name</th>
            </tr>
            </thead>
            <tbody>`;

  filteredProjects.forEach((item) => {
    const date = convertToDate(item.date);
    const time = item.totalTime;
    const projectName = item.name;

    tableHTML += `<tr>
                <td class="history__td">${date}</td>
                <td class="history__td">${MiliSecToHourMinSec(time)}</td>
                <td class="history__td">${projectName}</td>
                </tr>`;
  });

  tableHTML += `</tbody>
            </table>`;

  return tableHTML;
};

const calcTotalTime = (filteredProjects) => {
    const totalMilisecs=filteredProjects.reduce(
    (total, item) => total + item.totalTime,
    0);
    return  MiliSecToHourMinSec(totalMilisecs)
  };


const statistics = () => {
    recoverProjects();
    
    const currentDate = new Date();
    //TODAY
    // Filtrar proyectos para encontrar los que coinciden con la fecha actual
    const todayProjects = projects.filter((item) => convertToDate(item.date) === convertToDate(currentDate));
    document.getElementById("today").innerHTML = `<div class="statistics__span">TODAY<br>${calcTotalTime(todayProjects)}</div>`;

    //THIS WEEK
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    //getDay()-1 para que la semana empiece en lunes no en domingo
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay()-1));
    
    const weekProjects = projects.filter((item) => new Date(item.date) >= startOfWeek && new Date(item.date) <= currentDate);
    document.getElementById("thisWeek").innerHTML = `<div class="statistics__span">THIS WEEK<br>${calcTotalTime(weekProjects)}</div>`;

     //THIS MONTH
     const currentMonth = new Date(currentDate).getMonth();
     // Filtrar proyectos para encontrar los que coinciden con la semana actual
     const monthProjects = projects.filter((item) => new Date(item.date).getMonth() === currentMonth); 
     document.getElementById("thisMonth").innerHTML = `<div class="statistics__span">THIS MONTH<br>${calcTotalTime(monthProjects)}</div>`;

     
}


document.getElementById("filter").onclick = filter;
document.getElementById("history").onclick = chargeSelectsData;
document.getElementById("statistics").onclick = statistics;

