function clear() {
  // Usar la función de confirmación personalizada en lugar de window.confirm
  customConfirm("Do you want to delete all the projects from your Local Storage?", (isConfirmed) => {
    if (isConfirmed) {
      localStorage.clear();
      showCustomAlert("Project Deleted");
    }
  });
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
  filter();
  showCustomAlert("Project saved");
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

const deleteProject = (projectDate) => {
  recoverProjects();
  const projectIndex = projects.findIndex((item) => item.date === projectDate);
  
  if (projectIndex !== -1) {
    const projectToDelete = projects[projectIndex];
    customConfirm(`Do you want to delete ${projectToDelete.name} project from your Local Storage?`, (isConfirmed) => {
      
      if (isConfirmed) {
      projects.splice(projectIndex, 1); 
      saveProjects();
      filter(); 
      showCustomAlert("Project Deleted");
      }
    });
     
  } else showCustomAlert("Project not found");
  
};


const chargeSelectsData = () => {
  recoverProjects();
  
  if (projects.length === 0) {
    document.getElementById("showProjects").innerHTML = "Storage Empty";
    return;
  }
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

  document.getElementById(
    "clear"
  ).innerHTML = `Delete All Projects`;


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
    const svgDel = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="history__svg" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg>'
    const svgInfo = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="history__svg--info" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>'

    tableHTML += `<tr>
                <td class="history__td">${date}</td>
                <td class="history__td">${MiliSecToHourMinSec(time)}</td>
                <td class="history__td">${projectName}</td>
                <td class="history__td"><button title="More Info" onclick="moreInfo('${item.date}');">${svgInfo}</button></td>
                <td class="history__td"><button title="Delete Project" onclick="deleteProject('${item.date}');">${svgDel}</button></td>
                </tr>`;
  });

  tableHTML += `</tbody>
            </table>`;

  return tableHTML;
};

const moreInfo = (projectDate) => {
  recoverProjects();
  const filterProject = projects.find((item) => item.date === projectDate);
  
  if (filterProject) {
    let finishedTime = new Date(filterProject.date);
    let startedTime = finishedTime.getTime() - filterProject.totalTime;
     
    finishedTime = finishedTime.toLocaleTimeString();
    startedTime = new Date(startedTime).toLocaleTimeString();
    showCustomAlert(`Started Time: ${startedTime}\n Finished Time: ${finishedTime}`);
  } else {
    showCustomAlert("Project not found");
  }
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
    const dayOfWeek = startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1;
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    
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
document.getElementById("clear").onclick = clear;


