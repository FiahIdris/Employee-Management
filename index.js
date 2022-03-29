const xhr = new XMLHttpRequest();
let employees;
let totalPages = 1;
let chosedRow = 10;
let currentPageNumber = 1;
let sortDesc = [false, false, false, false];
let searchString;
let foundSearch = [];
let indexEdit;

xhr.open("GET", "http://localhost:3000/employees");
xhr.onload = function () {
  employees = JSON.parse(xhr.responseText);

  if (employees.length == 0) {
    document.querySelector(".container-table").innerHTML +=
      "<p style='text-align: center; margin-top:50px;margin-bottom:100px'>List empty</p>";
  } else {
    if (chosedRow > employees.length) {
      showTotalRowTablesValue(0, employees.length);
    } else {
      showTotalRowTablesValue(0, chosedRow);
    }
    totalPages = Math.ceil(employees.length / chosedRow);
  }
  document.querySelector(
    "#total-pages"
  ).innerHTML = `<span><i class="fa fa-angle-double-left" onclick="goToFirstPage()"></i></span>
        <span
          ><i class="fa fa-angle-left" onclick="goToPreviousPage()"></i
        ></span>
        page ${currentPageNumber} of ${totalPages}
        <span><i class="fa fa-angle-right" onclick="goToNextPage()"></i></span>
        <span><i class="fa fa-angle-double-right" onclick="goToLastPage()"></i></span>`;
};
xhr.send();

function showTotalRowTablesValue(start, end) {
  if (end <= employees.length) {
    document.querySelector("#input-rows").value = chosedRow;
    const table = document.querySelector("tbody");
    table.innerHTML = "";

    for (let i = start; i < end; i++) {
      table.innerHTML += ` <tr>
            <td>${employees[i].userId}</td>
            <td>${employees[i].name}</td>
            <td>${employees[i].email}</td>
            <td>${employees[i].mobile}</td>
            <td>
             
              <button onclick="onDetail(${i})" >Detail</button>
              <button onclick="onEdit(${i})">Edit</button>
             
              <button onclick="onDelete(${i})" >Delete</button>
            
            </td>
          </tr>`;
    }
  }
}

function editTotalRows(value) {
  if (value != 0) {
    chosedRow = value;
    totalPages = Math.ceil(employees.length / chosedRow);
    if (currentPageNumber > totalPages) {
      currentPageNumber = 1;
    }

    document.querySelector(
      "#total-pages"
    ).innerHTML = ` <span><i class="fa fa-angle-double-left" onclick="goToFirstPage()"></i></span>
        <span
          ><i class="fa fa-angle-left" onclick="goToPreviousPage()"></i
        ></span>
        page ${currentPageNumber} of ${totalPages}
        <span><i class="fa fa-angle-right" onclick="goToNextPage()"></i></span>
        <span><i class="fa fa-angle-double-right" onclick="goToLastPage()"></i></span>`;

    showTotalRowTablesValue(
      chosedRow * (currentPageNumber - 1),
      currentPageNumber * chosedRow
    );
  }
}

function goToPreviousPage() {
  if (currentPageNumber > 1) {
    currentPageNumber--;
    document.querySelector(
      "#total-pages"
    ).innerHTML = `<span><i class="fa fa-angle-double-left" onclick="goToFirstPage()"></i></span>
        <span
          ><i class="fa fa-angle-left" onclick="goToPreviousPage()"></i
        ></span>
        page ${currentPageNumber} of ${totalPages}
        <span><i class="fa fa-angle-right" onclick="goToNextPage()"></i></span>
        <span><i class="fa fa-angle-double-right" onclick="goToLastPage()"></i></span>`;
    showTotalRowTablesValue(
      chosedRow * (currentPageNumber - 1),
      currentPageNumber * chosedRow
    );
  }
}

function goToNextPage() {
  if (currentPageNumber < totalPages) {
    currentPageNumber++;
    document.querySelector(
      "#total-pages"
    ).innerHTML = `<span><i class="fa fa-angle-double-left" onclick="goToFirstPage()"></i></span>
        <span
          ><i class="fa fa-angle-left" onclick="goToPreviousPage()"></i
        ></span>
        page ${currentPageNumber} of ${totalPages}
        <span><i class="fa fa-angle-right" onclick="goToNextPage()"></i></span>
        <span><i class="fa fa-angle-double-right" onclick="goToLastPage()"></i></span>`;
    showTotalRowTablesValue(
      chosedRow * (currentPageNumber - 1),
      currentPageNumber * chosedRow
    );
  }
}

function goToFirstPage() {
  currentPageNumber = 1;
  document.querySelector(
    "#total-pages"
  ).innerHTML = `<span><i class="fa fa-angle-double-left" onclick="goToFirstPage()"></i></span>
        <span
          ><i class="fa fa-angle-left" onclick="goToPreviousPage()"></i
        ></span>
        page ${currentPageNumber} of ${totalPages}
        <span><i class="fa fa-angle-right" onclick="goToNextPage()"></i></span>
        <span><i class="fa fa-angle-double-right" onclick="goToLastPage()"></i></span>`;
  showTotalRowTablesValue(
    0,
    chosedRow > employees.length ? employees.length : chosedRow
  );
}

function goToLastPage() {
  currentPageNumber = totalPages;
  document.querySelector(
    "#total-pages"
  ).innerHTML = `<span><i class="fa fa-angle-double-left" onclick="goToFirstPage()"></i></span>
        <span
          ><i class="fa fa-angle-left" onclick="goToPreviousPage()"></i
        ></span>
        page ${currentPageNumber} of ${totalPages}
        <span><i class="fa fa-angle-right" onclick="goToNextPage()"></i></span>
        <span><i class="fa fa-angle-double-right" onclick="goToLastPage()"></i></span>`;
  showTotalRowTablesValue(
    chosedRow * (currentPageNumber - 1),
    currentPageNumber * chosedRow
  );
}

function sortTable(ind) {
  !sortDesc[ind] ? sortDescending(ind) : sortAscending(ind);
  sortDesc[ind] = !sortDesc[ind];
}

function sortAscending(ind) {
  let sortedEmployee;
  if (ind == 0) {
    sortedEmployee = employees.sort(function (a, b) {
      return a.id - b.id;
    });
  } else {
    sortedEmployee = employees.sort(function (a, b) {
      let A;
      let B;

      switch (ind) {
        case 1:
          A = a.name.toLowerCase();
          B = b.name.toLowerCase();
          break;
        case 2:
          A = a.email.toLowerCase();
          B = b.email.toLowerCase();
          break;
        case 3:
          A = a.mobile.toLowerCase();
          B = b.mobile.toLowerCase();
          break;
      }

      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  }

  document.querySelector("#input-rows").value = chosedRow;
  const table = document.querySelector("tbody");
  table.innerHTML = "";

  for (let i = 0; i < sortedEmployee.length; i++) {
    table.innerHTML += ` <tr>
            <td>${sortedEmployee[i].userId}</td>
            <td>${sortedEmployee[i].name}</td>
            <td>${sortedEmployee[i].email}</td>
            <td>${sortedEmployee[i].mobile}</td>
            <td>
             
              <button onclick="onDetail(${i})" >Detail</button>
              <button onclick="onEdit(${i})">Edit</button>
             
              <button onclick="onDelete(${i})" >Delete</button>
            
            </td>
          </tr>`;
  }
}

function sortDescending(ind) {
  let sortedEmployee;
  if (ind == 0) {
    sortedEmployee = employees.sort(function (a, b) {
      return b.id - a.id;
    });
  } else {
    sortedEmployee = employees.reverse(function (a, b) {
      let A;
      let B;

      switch (ind) {
        case "name":
          A = a.name.toLowerCase();
          B = b.name.toLowerCase();
          break;
        case "email":
          A = a.email.toLowerCase();
          B = b.email.toLowerCase();
          break;
        case "name":
          A = a.mobile.toLowerCase();
          B = b.mobile.toLowerCase();
          break;
      }

      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  }

  document.querySelector("#input-rows").value = chosedRow;
  const table = document.querySelector("tbody");
  table.innerHTML = "";

  for (let i = 0; i < sortedEmployee.length; i++) {
    table.innerHTML += ` <tr>
            <td>${sortedEmployee[i].userId}</td>
            <td>${sortedEmployee[i].name}</td>
            <td>${sortedEmployee[i].email}</td>
            <td>${sortedEmployee[i].mobile}</td>
            <td>
             
              <button onclick="onDetail(${i})" >Detail</button>
              <button onclick="onEdit(${i})">Edit</button>
             
              <button onclick="onDelete(${i})" >Delete</button>
            
            </td>
          </tr>`;
  }
}

function searchValue(value) {
  searchString = value;
  if (value == "") {
    goToFirstPage();
  }
}

function search() {
  let result = [];

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].userId == searchString) {
      result.push(employees[i]);
    }
    if (employees[i].name.toLowerCase() == searchString.toLowerCase()) {
      result.push(employees[i]);
    }
    if (employees[i].email.toLowerCase() == searchString.toLowerCase()) {
      result.push(employees[i]);
    }
  }

  foundSearch = result;

  const table = document.querySelector("tbody");
  table.innerHTML = "";

  for (let i = 0; i < foundSearch.length; i++) {
    table.innerHTML += ` <tr>
            <td>${foundSearch[i].userId}</td>
            <td>${foundSearch[i].name}</td>
            <td>${foundSearch[i].email}</td>
            <td>${foundSearch[i].mobile}</td>
            <td>
              <button>Detail</button>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>`;
  }
}
function onEdit(ind) {
  window.location.href = "/edit-form.html";
  localStorage.setItem("userId", employees[ind].userId);
  localStorage.setItem("name", employees[ind].name);
  localStorage.setItem("email", employees[ind].email);
  localStorage.setItem("mobile", employees[ind].mobile);
  localStorage.setItem("birthdate", employees[ind].birthdate.slice(0, 10));
  localStorage.setItem("address", employees[ind].address);
}

function onDelete(ind) {
  window.location.href = "/delete-form.html";
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  localStorage.setItem("userId", employees[ind].userId);
  localStorage.setItem("name", employees[ind].name);
  localStorage.setItem("email", employees[ind].email);
  localStorage.setItem("mobile", employees[ind].mobile);
  localStorage.setItem(
    "birthdate",
    new Date(employees[ind].birthdate).toLocaleDateString("id-ID", options)
  );
  localStorage.setItem("address", employees[ind].address);
}

function onDetail(ind) {
  window.location.href = "/detail-form.html";
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  localStorage.setItem("userId", employees[ind].userId);
  localStorage.setItem("name", employees[ind].name);
  localStorage.setItem("email", employees[ind].email);
  localStorage.setItem("mobile", employees[ind].mobile);
  localStorage.setItem(
    "birthdate",
    new Date(employees[ind].birthdate).toLocaleDateString("id-ID", options)
  );
  localStorage.setItem("address", employees[ind].address);
}
