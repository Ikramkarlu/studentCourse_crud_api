var std = '';
$(document).ready(function () {
    getStudentsData();
    getCoursesInDD();
    getSelectedValue();
    /*$(".selectpicker").selectpicker();*/
    /*$('#btnUpdateStd').hide(true);*/
    $("#btnUpdateStd").click(function () {
        if (std != '') {
            updateStudentData(std)
        } else {
            alert("No Employee id Found Or Update!")
        }
    });
});
function geocodeAddress() {
    var address = document.getElementById('txtAddress').value;
    const API_KEY = '8a97cb51dc374598b70d65f63b9906ce';

    fetch(`https://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${encodeURIComponent(address)}&limit=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //if (data.data.length > 0) {
            //    var latitude = data.data[0].latitude;
            //    var longitude = data.data[0].longitude;
            //    // Do something with the latitude and longitude, such as display a map
            //    console.log(latitude, longitude);
            //} else {
            //    // Handle case where no results were found
            //    console.log('No results found for address:', address);
            //}
        })
        .catch(error => console.error(error));
}

//function getPositionstackUrl(query, accessKey) {
//  const baseUrl = 'http://api.positionstack.com/v1/forward';
//  const queryString = `?access_key=${accessKey}&query=${query}`;
//  return baseUrl + queryString;
//}

//function geocodeAddress(event) {
//    event.preventDefault();
//    const API_KEY = '8a97cb51dc374598b70d65f63b9906ce';
//    const address = document.getElementById('txtAddress').value;
//    axios.get(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${address}`)
//        .then(response => {
//            // The response will contain an array of results
//            const results = response.data.data;
//            // You can use the results to display a map or to get the latitude and longitude of the address
//            console.log(results);
//        })
//        .catch(error => {
//            console.error(error);
//        });
//}


//function autoComplete() {
//    $.ajax({
//        url: 'https://api.positionstack.com/v1/forward',
//        data: {
//            access_key:'8a97cb51dc374598b70d65f63b9906ce',
//            query:'islamabad',
//            limit:1
//        }
//    }).done(function (data) {
//        console.log(JSON.parse(data));
//    });

//}

function getSelectedValue() {

    //var std = $('#tblDdl').val();
    //return std;

    var newcourseId = document.getElementById("tblDdl");
    var courses = [];
    for (var i = 0; i < newcourseId.options.length; i++) {
        if (newcourseId.options[i].selected) {
            courses.push(newcourseId.options[i].value);
        }
    }

    return courses;
}

function createStudent() {
    courseIds = getSelectedValue();
    //var id = getSelectedValue();
    //var url = "https://localhost:7185/api/Students?courseIds=2&courseIds=4&courseIds=5&courseIds=1"
    //var url = "https://localhost:7185/api/Students?courseIds=" + courseIds;
    var url = "https://localhost:7185/api/Students?";
    var url = url + "courseIds=" + courseIds.join("&courseIds=");

    var student = {};

    if ($('#txtName').val() === '' || $('#txtfatherName').val() === '' || $('#txtAddress').val() === '') {
        alert("No Field can be left blank!");
    }
    else {
        student.Name = $('#txtName').val();
        student.FatherName = $('#txtfatherName').val();
        student.Address = $('#txtAddress').val();
        /* student.courses = $('#tblDdl').val();*/

        if (student) {
            $.ajax({

                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(student),
                type: "Post",
                success: function (result) {
                    clearForm();
                    getStudentsData();
                    $('.selectpicker').selectpicker('refresh');
                },

                error: function (msg) {
                    alert(msg);
                }

            });
        }
    }
}

function pageRedirect() {

    window.location.replace("https://localhost:7185/Update.html");
}

function getStudentsData() {
    var url = "https://localhost:7185/api/students";

    $.ajax({

        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#tblStdBody").html('');
                var row = '';
                for (var i = 0; i < result.length; i++) {
                    //var course = result[i].courses.map(e => e.name)
                    row = row
                        + "<tr>"
                        + "<td>" + result[i].id + "</td>"
                        + "<td>" + result[i].name + "</td>"
                        + "<td>" + result[i].fatherName + "</td>"
                        + "<td>" + result[i].address + "</td>"
                        + "<td>" + result[i].course + "</td>"
                        // + "<td>" + course[i].id + "</td>"
                        
                        + "<td><button class='btn btn-warning' onClick='editStudentData(" + result[i].id + "),pageRedirect()'>Edit</button>&nbsp;&nbsp; | &nbsp;&nbsp;<button class='btn btn-danger' onClick='deleteStudentData(" + result[i].id + ")'>Delete</button></td>"
                }
                if (row != '') {
                    $("#tblStdBody").append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

//function createCourseData() {
//    //$('#tblDdl').on("change", function () {
//    //    var item = $("#tblDdl option:selected").text();

//    //    $.post("https://localhost:7185/api/courses",
//    //        {
//    //            data: item
//    //    });
//    //});
//    var url = "https://localhost:7185/api/courses";
//    var courses = {};

//    if (courses) {
//        $.ajax({
//            url: url,
//            contenttype: "application/json; charset=utf-8",
//            datatype: "json",
//            data: JSON.stringify(courses),
//            type: "Post",
//            success: function (result) {
//                $.each(result, function (i, course) {
//                    $('#tblDdl').append('<option value=' + course.id + '>' + course.name + '</option>');
//                });
//                $('#tblDdl').on("change", function () {
//                    courses = $("#tblDdl option:selected").text();
//                    course = courses
//                });
//            },
//            error: function (msg) {
//                alert(msg);
//            }

//        });
//    }

//}


function getCoursesInDD() {
    var url = "https://localhost:7185/api/courses";

    $.ajax({

        url: url,
        //contentType: "application/json; charset=utf-8",
        //dataType: "json",
        //type: "Get",
        success: function (result) {
            $.each(result, function (i, data) {
                $('#tblDdl').append('<option value=' + data.id + '>' + data.name + '</option>');
            });
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function deleteStudentData(id) {
    var url = "https://localhost:7185/api/students/" + id;

    $.ajax({

        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Delete",
        success: function (result) {
            clearForm();
            alert('Are You Sure You Want To Delete This Record!');
            getStudentsData();
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function editStudentData(id) {
    var url = "https://localhost:7185/api/students/" + id;

    $.ajax({

        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                std = result.id;
                $('#txtName').val(result.name);
                $('#txtfatherName').val(result.fatherName);
                $('#txtAddress').val(result.address);
                //for (var i = 0; i < result.courses.length; i++) {
                //    var courseId = result.course[i].id;
                //    var courseName = result.course[i].name;
                //    $('<option>').val(courseId).text(courseName).appendTo('#tblDdl');
                //}
                //for (var i = 0; i < result.course.length; i++) {
                //    var courseId = result[i].course.id;
                //    var courseName = result[i].course.name;
                //    $("option[value=" + courseId + "]").prop('selected', true).html(courseName);
                //}
                /*var selectedCourses = getSelectedValue("tblDdl");*/
                /*$('#tblDdl').val(result.courseIds);*/
            }
            //$("#btnCreateStd").prop('disabled', true);
            //$("#btnUpdateStd").prop('disabled', false);
            $('#btnCreateStd').hide(true);
            $('#btnUpdateStd').show(true);
            //var options = "<option value=''>--Select an Option--</option>";
            //for (var i = 0; i < result.length; i++) {
            //    options += "<option value='" + result[i].OptionId + "'>" + result[i].OptionName + "</option>";
            //}
            //$("#tblDdl").html(options);
            //// Set the selected value
            //$("#tblDdl").val(selectedValue);
        },
        error: function (msg) {
            alert(msg);
        }

    });
}

function updateStudentData(courseIds) {
    courseIds = getSelectedValue();
    //https://localhost:7185/api/Students?courseIds=1&courseIds=5
    //var url = "api/students/" + id;
    var url = "https://localhost:7185/api/Students?";
    var url = url + "courseIds=" + courseIds.join("&courseIds=");
    var student = {};
    student.id = std;
    student.Name = $('#txtName').val();
    student.FatherName = $('#txtfatherName').val();
    student.Address = $('#txtAddress').val();
    student.courses = $('#tblDdl').val();

    if (student) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(student),
            type: 'Put',
            success: function (result) {
                getSelectedValue();
                clearForm();
                getStudentsData();
                $('.selectpicker').selectpicker('refresh');
                //$("#btnCreateStd").prop('disabled', false);
                //$("#btnUpdateStd").prop('disabled', true);
            },
            error: function (msg) {
                alert(msg);
            }

        });
    }
}



function clearForm() {
    $('#txtName').val('');
    $('#txtfatherName').val('');
    $('#txtAddress').val('');
    $('#tblDdl').val('');
}