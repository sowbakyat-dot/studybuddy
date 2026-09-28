// ===============================
// LOAD STUDENTS
// ===============================

function loadStudents() {

    fetch("/students")
        .then(response => response.json())
        .then(students => {

            document.getElementById("studentCount").textContent = students.length;

            let table = document.getElementById("studentTable");
            table.innerHTML = "";

            students.forEach(student => {

                table.innerHTML += `
                    <tr>
                        <td>${student.studentId}</td>
                        <td>${student.name || ""}</td>
                        <td>${student.email || ""}</td>
                        <td>${student.department || ""}</td>
                    </tr>
                `;
            });
        });
}


// ===============================
// LOAD SUBJECTS
// ===============================

function loadSubjects() {

    fetch("/subjects")
        .then(response => response.json())
        .then(subjects => {

            document.getElementById("subjectCount").textContent = subjects.length;

            let table = document.getElementById("subjectTable");
            table.innerHTML = "";

            subjects.forEach(subject => {

                table.innerHTML += `
                    <tr>
                        <td>${subject.subjectId}</td>
                        <td>${subject.subjectName || ""}</td>
                        <td>${subject.subjectCode || ""}</td>
                    </tr>
                `;
            });
        });
}


// ===============================
// LOAD STUDY GROUPS
// ===============================

function loadStudyGroups() {

    fetch("/study-groups")
        .then(response => response.json())
        .then(groups => {

            document.getElementById("groupCount").textContent = groups.length;

            let table = document.getElementById("groupTable");
            table.innerHTML = "";

            groups.forEach(group => {

                table.innerHTML += `
                    <tr>
                        <td>${group.groupId}</td>
                        <td>${group.groupName || ""}</td>
                        <td>${group.maxMembers}</td>
                        <td>${group.subject ? group.subject.subjectName : ""}</td>
                        <td>${group.owner ? group.owner.name : ""}</td>
                    </tr>
                `;
            });
        });
}


// ===============================
// LOAD MEMBERSHIPS
// ===============================

function loadMemberships() {

    fetch("/memberships")
        .then(response => response.json())
        .then(memberships => {

            document.getElementById("membershipCount").textContent = memberships.length;

            let table = document.getElementById("membershipTable");
            table.innerHTML = "";

            memberships.forEach(membership => {

                table.innerHTML += `
                    <tr>
                        <td>${membership.membershipId}</td>
                        <td>${membership.student ? membership.student.name : ""}</td>
                        <td>${membership.studyGroup ? membership.studyGroup.groupName : ""}</td>
                    </tr>
                `;
            });
        });
}


// ===============================
// LOAD EVERYTHING
// ===============================

loadStudents();
loadSubjects();
loadStudyGroups();
loadMemberships();