//Get All Students
async function loadTable() {
  let table = document.getElementById("tblStudents");

  let body = `
            <thead class="table-secondary">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Course</th>
                        <th scope="col" class="text-center">Action</th>
                      </tr>
                    </thead>
    `;

  table.innerHTML = "";

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch("http://localhost:8080/api/v1/all", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      data.forEach(element => {
        body += `
                <tr onclick="viewStudent(${element.id})">
                    <td>${element.id}</td>
                    <td>
                        <img
                            src="../assets/images/man.png"
                            class="student-image"
                            alt="Saman Kumara"
                        />
                        ${element.firstName} ${element.lastName}
                    </td>
                    <td>${element.phoneNumber}</td>
                    <td>${element.course}</td>
                    <td class="text-center">
                        <button type="button" class="btnUpdate" onclick="editStudent()">
                        <img src="../assets/icons/edit.svg"></button></button>
                        <button type="button" class="deleteButton" onclick="deleteStudent()">
                        <img src="../assets/icons/delete.svg"></button> 
                    </td>
                </tr>
        `;
      });
    })
    .catch((error) => console.log("error", error));

    table.innerHTML = body;
}

loadTable();

function editStudent(){
    alert("Edit Student");
}

async function viewStudent(id){

    let studentID = document.getElementById("student-id");
    let name = document.getElementById("student-name");
    let address = document.getElementById("student-address");
    let phoneNumber = document.getElementById("student-phone");
    let email = document.getElementById("student-email");
    let gender = document.getElementById("student-gender");
    let course = document.getElementById("student-course");
    let dob = document.getElementById("student-dob");
    let language = document.getElementById("student-language");
    let guardianName = document.getElementById("student-guardian");
    let guardianPhone = document.getElementById("student-guardian-phone");
    let studentImage = document.getElementById("student-image");

    await fetch(`http://localhost:8080/api/v1/student/${id}`)
    .then((response) => response.json())
    .then((data) => {
        
        studentImage.src = "../assets/images/man.png";
        studentID.innerHTML = data.id;
        name.innerHTML = data.firstName + " " + data.lastName;
        address.innerHTML = data.address;
        phoneNumber.innerHTML = data.phoneNumber;
        email.innerHTML = data.email;
        gender.innerHTML = data.gender;
        course.innerHTML = data.course;
        dob.innerHTML = data.dob;
        language.innerHTML = data.language;
        guardianName.innerHTML = data.guardianName;
        guardianPhone.innerHTML = data.guardianPhone;
        
    });
}

//Search functionality
function searchTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('tblStudents');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const tds = tr[i].getElementsByTagName('td');
        let rowText = '';
        
        for (let j = 0; j < tds.length; j++) {
            rowText += tds[j].innerText.toLowerCase();
        }

        if (rowText.indexOf(input) > -1) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

//Add New Student
function addStudent(){
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let gender = document.getElementById("gender");
    let course = document.getElementById("course");
    let dob = document.getElementById("dob").value;
    let language = document.getElementById("language");
    let guardianName = document.getElementById("guardian-name").value;
    let guardianPhone = document.getElementById("guardian-phone").value;
    let guardianType = document.getElementById("guardian-type");
    let studentImage = document.getElementById("student-image");

    gender = gender.options[gender.selectedIndex].text;
    course = course.options[course.selectedIndex].text;
    language = language.options[language.selectedIndex].text;
    guardianType = guardianType.options[guardianType.selectedIndex].text;

    if(!firstName || !lastName || !address || !phoneNumber || !email || !gender || !course || !dob || !language || !guardianName || !guardianPhone || !guardianType){
        alert("Please fill all the required fields");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "phoneNumber": phoneNumber,
        "email": email,
        "gender": gender,
        "course": course,
        "dob": dob,
        "language": language,
        "guardianName": guardianName,
        "guardianPhone": guardianPhone,
        "guardianType": guardianType
    });


    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/add-student",requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}