
var courseAPI = "http://localhost:3000/courses";


        //  GET dữ liệu
// 3
function start(){
    getCourses(renderCourses);
    handleCreateForm();
}
start();

// Functions
// 1
function getCourses(callback){
    fetch(courseAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function renderCourses(courses){
    var listCoursesBlock = document.querySelector("#list-courses");
    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h2>${course.name}</h2>
                <p>${course.description}</p>
                <button class="btn" onclick="handleDeleteCourse(${course.id})">delete</button>
                <button class="btn" onclick="handleUpdateCourse(${course.id})">update</button>
            </li>`;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function createCourse(data, callback){
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    fetch(courseAPI, options)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id){
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };

    fetch(courseAPI + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var courseItem = document.querySelector(".course-item-"+ id);
            if(courseItem){
                courseItem.remove();
            }
        });
}

function handleCreateForm(){
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description,
        };
        createCourse(formData, function(){
            getCourses(renderCourses);
        });

    };
}

function updateCourse(id, data, callback) {
    var options = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(data),
    };
    fetch(courseAPI + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleUpdateCourse(id) {
    var courseItem = document.querySelector(".course-item-" + id);

    var getName = courseItem.querySelector("h2").innerText;
    var getDescription = courseItem.querySelector("p").innerText;

    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');

    name.value = getName;
    description.value = getDescription;


    if (!document.querySelector("#update")) {
        document.querySelector("#create").id = "update";
    }
    document.querySelector("#update").innerText = "Change";

    var updateBtn = document.querySelector("#update");
    updateBtn.onclick = function () {
        var formData = {
            name: name.value,
            description: description.value,
        };
    if (name.value != "" && description.value != "") {
        updateCourse(id, formData, function () {
        getCourses(renderCourses);
    });
    } else {
        alert("Hãy nhập đầy đủ thông tin");
    }
    };
}

