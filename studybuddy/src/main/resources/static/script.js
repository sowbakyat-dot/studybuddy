/* =========================================================
   STUDYBUDDY - COMPLETE APPLICATION JAVASCRIPT
========================================================= */


/* =========================================================
   API ENDPOINTS
========================================================= */

const API = {

    students: "/students",

    subjects: "/subjects",

    groups: "/study-groups",

    memberships: "/memberships",

    users: "/users"

};


/* =========================================================
   GLOBAL DATA
========================================================= */

let students = [];

let subjects = [];

let groups = [];

let memberships = [];


/* =========================================================
   AUTHENTICATION
========================================================= */

async function registerUser() {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;


    const message =
        document.getElementById("registerMessage");


    if (!name || !email || !password) {

        if (message) {
            message.textContent =
                "Please fill all fields.";
        }

        return;

    }


    try {

        const response =
            await fetch(
                `${API.users}/register`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        password: password

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Registration failed"
            );

        }


        if (message) {

            message.textContent =
                "Registration successful! Please login.";

        }


        document
            .getElementById("registerName")
            .value = "";


        document
            .getElementById("registerEmail")
            .value = "";


        document
            .getElementById("registerPassword")
            .value = "";


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        if (message) {

            message.textContent =
                "Unable to register user.";

        }

    }

}


async function loginUser() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const message =
        document.getElementById("loginMessage");


    if (!email || !password) {

        if (message) {

            message.textContent =
                "Please enter email and password.";

        }

        return;

    }


    try {

        const response =
            await fetch(
                `${API.users}/login`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        email: email,

                        password: password

                    })

                }
            );


        const result =
            await response.text();


        if (result === "Login successful") {

            if (message) {

                message.textContent =
                    "Login successful!";

            }


            /*
             * Hide authentication sections
             */
            document
                .querySelectorAll(".auth-page")
                .forEach(section => {

                    section.classList.add("hidden");

                });


            /*
             * Show dashboard
             */
            const dashboard =
                document.getElementById("dashboard");


            if (dashboard) {

                dashboard.classList.remove("hidden");

            }


            /*
             * Load application data
             */
            await loadData();


        } else {

            if (message) {

                message.textContent =
                    "Invalid email or password.";

            }

        }


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        if (message) {

            message.textContent =
                "Unable to login.";

        }

    }

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showSection(sectionId, clickedButton) {

    document
        .querySelectorAll(".page-section")
        .forEach(section => {

            section.classList.add("hidden");

        });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.remove("hidden");

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    loadData();

}


/* =========================================================
   LOAD ALL DATA
========================================================= */

async function loadData() {

    try {

        const [

            studentsResponse,

            subjectsResponse,

            groupsResponse,

            membershipsResponse

        ] = await Promise.all([

            fetch(API.students),

            fetch(API.subjects),

            fetch(API.groups),

            fetch(API.memberships)

        ]);


        students =
            await studentsResponse.json();


        subjects =
            await subjectsResponse.json();


        groups =
            await groupsResponse.json();


        memberships =
            await membershipsResponse.json();


        updateDashboard();


        displayStudents();

        displaySubjects();

        displayGroups();

        displayMemberships();


    } catch (error) {

        console.error(
            "Error loading StudyBuddy data:",
            error
        );

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const studentCount =
        document.getElementById("studentCount");


    const subjectCount =
        document.getElementById("subjectCount");


    const groupCount =
        document.getElementById("groupCount");


    const membershipCount =
        document.getElementById("membershipCount");


    if (studentCount) {

        studentCount.textContent =
            students.length;

    }


    if (subjectCount) {

        subjectCount.textContent =
            subjects.length;

    }


    if (groupCount) {

        groupCount.textContent =
            groups.length;

    }


    if (membershipCount) {

        membershipCount.textContent =
            memberships.length;

    }

}


/* =========================================================
   STUDENTS
========================================================= */

function displayStudents(list = students) {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );


    if (!tableBody) return;


    tableBody.innerHTML = "";


    if (list.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty-state">

                    No students found

                </td>

            </tr>

        `;

        return;

    }


    list.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.studentId ?? "-"}
            </td>

            <td>
                ${student.name ?? "-"}
            </td>

            <td>
                ${student.department ?? "-"}
            </td>

            <td>
                ${student.email ?? "-"}
            </td>

            <td>

                <button
                    onclick="editStudent(${student.studentId})">

                    Edit

                </button>


                <button
                    onclick="deleteStudent(${student.studentId})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   STUDENT FORM
========================================================= */

function showStudentForm() {

    document
        .getElementById("studentForm")
        .classList.remove("hidden");


    document
        .getElementById("studentFormTitle")
        .textContent = "Add Student";


    document
        .getElementById("studentId")
        .value = "";


    document
        .getElementById("studentName")
        .value = "";


    document
        .getElementById("studentEmail")
        .value = "";


    document
        .getElementById("studentDepartment")
        .value = "";

}


function hideStudentForm() {

    document
        .getElementById("studentForm")
        .classList.add("hidden");

}


/* =========================================================
   SAVE STUDENT
========================================================= */

async function saveStudent() {

    const id =
        document
            .getElementById("studentId")
            .value;


    const student = {

        name:
        document
            .getElementById("studentName")
            .value,

        email:
        document
            .getElementById("studentEmail")
            .value,

        department:
        document
            .getElementById("studentDepartment")
            .value

    };


    try {

        let response;


        if (id) {

            response =
                await fetch(
                    `${API.students}/${id}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(student)

                    }
                );

        } else {

            response =
                await fetch(
                    API.students,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(student)

                    }
                );

        }


        if (!response.ok) {

            throw new Error(
                "Failed to save student"
            );

        }


        hideStudentForm();

        await loadData();


    } catch (error) {

        console.error(
            "Error saving student:",
            error
        );

        alert(
            "Unable to save student."
        );

    }

}


/* =========================================================
   EDIT STUDENT
========================================================= */

function editStudent(id) {

    const student =
        students.find(
            s => s.studentId === id
        );


    if (!student) return;


    document
        .getElementById("studentForm")
        .classList.remove("hidden");


    document
        .getElementById("studentFormTitle")
        .textContent = "Edit Student";


    document
        .getElementById("studentId")
        .value =
        student.studentId;


    document
        .getElementById("studentName")
        .value =
        student.name ?? "";


    document
        .getElementById("studentEmail")
        .value =
        student.email ?? "";


    document
        .getElementById("studentDepartment")
        .value =
        student.department ?? "";

}


/* =========================================================
   DELETE STUDENT
========================================================= */

async function deleteStudent(id) {

    if (
        !confirm(
            "Delete this student?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API.students}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete student"
            );

        }


        await loadData();


    } catch (error) {

        console.error(
            "Error deleting student:",
            error
        );

        alert(
            "Unable to delete student."
        );

    }

}


/* =========================================================
   STUDENT SEARCH
========================================================= */

function filterStudents() {

    const search =
        document
            .getElementById("studentSearch")
            .value
            .toLowerCase();


    const filtered =
        students.filter(student =>

            String(
                student.name ?? ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                student.email ?? ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                student.department ?? ""
            )
                .toLowerCase()
                .includes(search)

        );


    displayStudents(filtered);

}


/* =========================================================
   SUBJECTS
========================================================= */

function displaySubjects(list = subjects) {

    const tableBody =
        document.getElementById(
            "subjectTableBody"
        );


    if (!tableBody) return;


    tableBody.innerHTML = "";


    if (list.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="empty-state">

                    No subjects found

                </td>

            </tr>

        `;

        return;

    }


    list.forEach(subject => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${subject.subjectId ?? "-"}
            </td>

            <td>
                ${subject.subjectName ?? "-"}
            </td>

            <td>
                ${subject.subjectCode ?? "-"}
            </td>

            <td>

                <button
                    onclick="editSubject(${subject.subjectId})">

                    Edit

                </button>


                <button
                    onclick="deleteSubject(${subject.subjectId})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   SUBJECT FORM
========================================================= */

function showSubjectForm() {

    document
        .getElementById("subjectForm")
        .classList.remove("hidden");


    document
        .getElementById("subjectFormTitle")
        .textContent =
        "Add Subject";


    document
        .getElementById("subjectId")
        .value = "";


    document
        .getElementById("subjectName")
        .value = "";


    document
        .getElementById("subjectCode")
        .value = "";

}


function hideSubjectForm() {

    document
        .getElementById("subjectForm")
        .classList.add("hidden");

}


/* =========================================================
   SAVE SUBJECT
========================================================= */

async function saveSubject() {

    const id =
        document
            .getElementById("subjectId")
            .value;


    const subject = {

        subjectName:
        document
            .getElementById("subjectName")
            .value,

        subjectCode:
        document
            .getElementById("subjectCode")
            .value

    };


    try {

        let response;


        if (id) {

            response =
                await fetch(
                    `${API.subjects}/${id}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(subject)

                    }
                );

        } else {

            response =
                await fetch(
                    API.subjects,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(subject)

                    }
                );

        }


        if (!response.ok) {

            throw new Error(
                "Failed to save subject"
            );

        }


        hideSubjectForm();

        await loadData();


    } catch (error) {

        console.error(
            "Error saving subject:",
            error
        );

        alert(
            "Unable to save subject."
        );

    }

}


/* =========================================================
   EDIT SUBJECT
========================================================= */

function editSubject(id) {

    const subject =
        subjects.find(
            s => s.subjectId === id
        );


    if (!subject) return;


    document
        .getElementById("subjectForm")
        .classList.remove("hidden");


    document
        .getElementById("subjectFormTitle")
        .textContent =
        "Edit Subject";


    document
        .getElementById("subjectId")
        .value =
        subject.subjectId;


    document
        .getElementById("subjectName")
        .value =
        subject.subjectName ?? "";


    document
        .getElementById("subjectCode")
        .value =
        subject.subjectCode ?? "";

}


/* =========================================================
   DELETE SUBJECT
========================================================= */

async function deleteSubject(id) {

    if (
        !confirm(
            "Delete this subject?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API.subjects}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete subject"
            );

        }


        await loadData();


    } catch (error) {

        console.error(
            "Error deleting subject:",
            error
        );

        alert(
            "Unable to delete subject."
        );

    }

}


/* =========================================================
   SUBJECT SEARCH
========================================================= */

function filterSubjects() {

    const search =
        document
            .getElementById("subjectSearch")
            .value
            .toLowerCase();


    const filtered =
        subjects.filter(subject =>

            String(
                subject.subjectName ?? ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                subject.subjectCode ?? ""
            )
                .toLowerCase()
                .includes(search)

        );


    displaySubjects(filtered);

}


/* =========================================================
   STUDY GROUPS
========================================================= */

function displayGroups(list = groups) {

    const tableBody =
        document.getElementById(
            "groupTableBody"
        );


    if (!tableBody) return;


    tableBody.innerHTML = "";


    if (list.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="empty-state">

                    No study groups found

                </td>

            </tr>

        `;

        return;

    }


    list.forEach(group => {

        const subjectName =
            group.subject?.subjectName
            ?? "-";


        const ownerName =
            group.owner?.name
            ?? "-";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${group.groupId ?? "-"}
            </td>

            <td>
                ${group.groupName ?? "-"}
            </td>

            <td>
                ${group.maxMembers ?? "-"}
            </td>

            <td>
                ${subjectName}
            </td>

            <td>
                ${ownerName}
            </td>

            <td>

                <button
                    onclick="editGroup(${group.groupId})">

                    Edit

                </button>


                <button
                    onclick="deleteGroup(${group.groupId})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   GROUP FORM
========================================================= */

function showGroupForm() {

    document
        .getElementById("groupForm")
        .classList.remove("hidden");


    document
        .getElementById("groupFormTitle")
        .textContent =
        "Add Study Group";


    document
        .getElementById("groupId")
        .value = "";


    document
        .getElementById("groupName")
        .value = "";


    document
        .getElementById("maxMembers")
        .value = "";


    document
        .getElementById("groupSubjectId")
        .value = "";


    document
        .getElementById("groupOwnerId")
        .value = "";

}


function hideGroupForm() {

    document
        .getElementById("groupForm")
        .classList.add("hidden");

}


/* =========================================================
   SAVE GROUP
========================================================= */

async function saveGroup() {

    const id =
        document
            .getElementById("groupId")
            .value;


    const group = {

        groupName:
        document
            .getElementById("groupName")
            .value,


        maxMembers:
            Number(
                document
                    .getElementById("maxMembers")
                    .value
            ),


        subject: {

            subjectId:
                Number(
                    document
                        .getElementById(
                            "groupSubjectId"
                        )
                        .value
                )

        },


        owner: {

            studentId:
                Number(
                    document
                        .getElementById(
                            "groupOwnerId"
                        )
                        .value
                )

        }

    };


    try {

        let response;


        if (id) {

            response =
                await fetch(
                    `${API.groups}/${id}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(group)

                    }
                );

        } else {

            response =
                await fetch(
                    API.groups,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(group)

                    }
                );

        }


        if (!response.ok) {

            throw new Error(
                "Failed to save study group"
            );

        }


        hideGroupForm();

        await loadData();


    } catch (error) {

        console.error(
            "Error saving study group:",
            error
        );

        alert(
            "Unable to save study group."
        );

    }

}


/* =========================================================
   EDIT GROUP
========================================================= */

function editGroup(id) {

    const group =
        groups.find(
            g => g.groupId === id
        );


    if (!group) return;


    document
        .getElementById("groupForm")
        .classList.remove("hidden");


    document
        .getElementById("groupFormTitle")
        .textContent =
        "Edit Study Group";


    document
        .getElementById("groupId")
        .value =
        group.groupId;


    document
        .getElementById("groupName")
        .value =
        group.groupName ?? "";


    document
        .getElementById("maxMembers")
        .value =
        group.maxMembers ?? "";


    document
        .getElementById("groupSubjectId")
        .value =
        group.subject?.subjectId ?? "";


    document
        .getElementById("groupOwnerId")
        .value =
        group.owner?.studentId ?? "";

}


/* =========================================================
   DELETE GROUP
========================================================= */

async function deleteGroup(id) {

    if (
        !confirm(
            "Delete this study group?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API.groups}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete study group"
            );

        }


        await loadData();


    } catch (error) {

        console.error(
            "Error deleting study group:",
            error
        );

        alert(
            "Unable to delete study group."
        );

    }

}


/* =========================================================
   GROUP SEARCH
========================================================= */

function filterGroups() {

    const search =
        document
            .getElementById("groupSearch")
            .value
            .toLowerCase();


    const filtered =
        groups.filter(group =>

            String(
                group.groupName ?? ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                group.subject?.subjectName ?? ""
            )
                .toLowerCase()
                .includes(search)

            ||

            String(
                group.owner?.name ?? ""
            )
                .toLowerCase()
                .includes(search)

        );


    displayGroups(filtered);

}


/* =========================================================
   MEMBERSHIPS
========================================================= */

function displayMemberships() {

    const tableBody =
        document.getElementById(
            "membershipTableBody"
        );


    if (!tableBody) return;


    tableBody.innerHTML = "";


    if (memberships.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="empty-state">

                    No memberships found

                </td>

            </tr>

        `;

        return;

    }


    memberships.forEach(membership => {

        const studentName =
            membership.student?.name
            ?? "-";


        const groupName =
            membership.studyGroup?.groupName
            ?? "-";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${membership.membershipId ?? "-"}
            </td>

            <td>
                ${studentName}
            </td>

            <td>
                ${groupName}
            </td>

            <td>

                <button
                    onclick="editMembership(
                        ${membership.membershipId}
                    )">

                    Edit

                </button>


                <button
                    onclick="deleteMembership(
                        ${membership.membershipId}
                    )">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   MEMBERSHIP FORM
========================================================= */

function showMembershipForm() {

    document
        .getElementById("membershipForm")
        .classList.remove("hidden");


    document
        .getElementById("membershipFormTitle")
        .textContent =
        "Add Membership";


    document
        .getElementById("membershipId")
        .value = "";


    document
        .getElementById("membershipStudentId")
        .value = "";


    document
        .getElementById("membershipGroupId")
        .value = "";

}


function hideMembershipForm() {

    document
        .getElementById("membershipForm")
        .classList.add("hidden");

}


/* =========================================================
   SAVE MEMBERSHIP
========================================================= */

async function saveMembership() {

    const id =
        document
            .getElementById("membershipId")
            .value;


    const studentId =
        Number(
            document
                .getElementById(
                    "membershipStudentId"
                )
                .value
        );


    const groupId =
        Number(
            document
                .getElementById(
                    "membershipGroupId"
                )
                .value
        );


    const membership = {

        student: {

            studentId: studentId

        },


        studyGroup: {

            groupId: groupId

        }

    };


    try {

        let response;


        if (id) {

            response =
                await fetch(
                    `${API.memberships}/${id}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                membership
                            )

                    }
                );

        } else {

            response =
                await fetch(
                    API.memberships,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                membership
                            )

                    }
                );

        }


        if (!response.ok) {

            throw new Error(
                "Failed to save membership"
            );

        }


        hideMembershipForm();

        await loadData();


    } catch (error) {

        console.error(
            "Error saving membership:",
            error
        );

        alert(
            "Unable to save membership."
        );

    }

}


/* =========================================================
   EDIT MEMBERSHIP
========================================================= */

function editMembership(id) {

    const membership =
        memberships.find(
            m =>
                m.membershipId === id
        );


    if (!membership) return;


    document
        .getElementById("membershipForm")
        .classList.remove("hidden");


    document
        .getElementById("membershipFormTitle")
        .textContent =
        "Edit Membership";


    document
        .getElementById("membershipId")
        .value =
        membership.membershipId;


    document
        .getElementById(
            "membershipStudentId"
        )
        .value =
        membership.student?.studentId
        ?? "";


    document
        .getElementById(
            "membershipGroupId"
        )
        .value =
        membership.studyGroup?.groupId
        ?? "";

}


/* =========================================================
   DELETE MEMBERSHIP
========================================================= */

async function deleteMembership(id) {

    if (
        !confirm(
            "Delete this membership?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API.memberships}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete membership"
            );

        }


        await loadData();


    } catch (error) {

        console.error(
            "Error deleting membership:",
            error
        );

        alert(
            "Unable to delete membership."
        );

    }

}


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

    }
);