// read company from local storage
const getCompanyFromLocalStorage = () => {
    let company = JSON.parse(localStorage.getItem('company'));
    if (company) {
        let companyWithPrototypes = new Company();
        companyWithPrototypes.employees = company.employees.map(e => (
            new Employee(e.username, e.fullname, e.email, e.password, e.startDate, e.salary, e.position, e.hoursOfWork)
        ));
        return companyWithPrototypes;
    }
    return new Company();
}

// write company to local storage
const writeCompanyToLocalStorage = () => {
    localStorage.setItem('company', JSON.stringify(company));
}

let company = getCompanyFromLocalStorage();



// ----------------- Events -----------------
$('#btnThem').on('click', function () {
    $('#header-title').text('Thêm nhân viên');
    $('#btnThemNV').show();
    $('#btnCapNhat').hide();
});

handleOnKeypress = (e) => {
    e.parentElement.parentElement.getElementsByTagName('span')[1].style.display = "none";
    return
}

handleOnChangeSelect = (e) => {
    if ($(e).val() == -1) {
        e.parentElement.parentElement.getElementsByTagName('span')[1].style.display = "block";
    } else {
        e.parentElement.parentElement.getElementsByTagName('span')[1].style.display = "none";
        return
    }
}

handleAddEmployee = () => {
    $('#tknv').prop('disabled', false);
    $('#btnThemNV').show();
    $('#btnCapNhat').hide();

    if (!validate()) {
        return
    }

    let username = $('#tknv').val();
    let fullName = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let startDate = $('#datepicker').val();
    let salary = $('#luongCB').val();
    let position = $('#chucvu option:selected').val();
    let hoursOfWork = $('#gioLam').val();
    let newEmployee = new Employee(username, fullName, email, password, startDate, salary, position, hoursOfWork);

    company.addEmployee(newEmployee);
    localStorage.setItem('company', JSON.stringify(company));

    $('#btnThem').click();
    renderEmployees();
}

handleDeleteEmployee = (username) => {
    company.deleteEmployeeByUsername(username);
    localStorage.setItem('company', JSON.stringify(company));
    renderEmployees();
}

handleFixEmployee = (username) => {
    $('#btnThem').click();
    $('#header-title').html('Sửa nhân viên');
    $('#tknv').prop('disabled', true);
    $('#btnThemNV').hide();
    $('#btnCapNhat').show();

    let employee = company.getEmployeeByUsername(username);
    $('#tknv').val(employee.username);
    $('#name').val(employee.fullname);
    $('#email').val(employee.email);
    $('#password').val(employee.password);
    $('#datepicker').val(employee.startDate);
    $('#luongCB').val(employee.salary);
    $('#chucvu').val(employee.position);
    $('#gioLam').val(employee.hoursOfWork);
}

handleUpdateModal = () => {
    if (!validate()) {
        return
    }

    let username = $('#tknv').val();
    let fullName = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let startDate = $('#datepicker').val();
    let salary = $('#luongCB').val();
    let position = $('#chucvu option:selected').val();
    let hoursOfWork = $('#gioLam').val();
    let newEmployee = new Employee(username, fullName, email, password, startDate, salary, position, hoursOfWork);

    company.updateEmployeeByUsername(username, newEmployee);
    localStorage.setItem('company', JSON.stringify(company));
    renderEmployees();
    $('#btnThem').click();
}

handleSearchStudents = (event) => {
    if (event.keyCode === 13) {
        let inputValue = $('#searchName').val();
        let employees = company.getEmployeesByConduct(inputValue);
        renderEmployees(employees);
    }
}


// ----------------- Render -----------------
renderEmployees = (emp) => {
    let employees = emp;
    if (!employees) {
        company = getCompanyFromLocalStorage();
        employees = company.employees;
    }

    let html = '';
    employees.forEach(employee => {
        html += `
            <tr>
                <td>${employee.username}</td>
                <td>${employee.fullname}</td>
                <td>${employee.email}</td>
                <td>${employee.startDate}</td>
                <td>${employee.getPosition()}</td>
                <td>${employee.getTotalSalary()}</td>
                <td>${employee.getConduct()}</td>
                <td>
                    <button class="btn btn-primary" onclick="handleFixEmployee('${employee.username}')">Sửa</button>
                    <button class="btn btn-danger" onclick="handleDeleteEmployee('${employee.username}')">Xóa</button>
                </td>
            </tr>
        `;
    });
    $('#tableDanhSach').html(html);
}
renderEmployees();

// ----------------- Validation -----------------
var validate = function () {
    const username = $('#tknv').val();
    const fullName = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const startDate = $('#datepicker').val();
    const salary = $('#luongCB').val();
    const position = $('#chucvu').val();
    const hoursOfWork = $('#gioLam').val();

    // regex for name, must be all words, no numbers, no special characters
    const nameRegex = /^[a-zA-Z ]+$/;
    // regex for email, must be in the format:
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // regex for password, at least one number, one special character, at least one uppercase letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    var isValid = true

    const NAME_MIN_LENGTH = 4;
    const NAME_MAX_LENGTH = 6;
    const PASSWORD_MIN_LENGTH = 6;
    const PASSWORD_MAX_LENGTH = 10;
    const SALARY_MIN = 1000000;
    const SALARY_MAX = 20000000;
    const HOURS_OF_WORK_MIN = 80;
    const HOURS_OF_WORK_MAX = 200;

    isValid &= require(username, "tbTKNV") && length(username, "tbTKNV", NAME_MIN_LENGTH, NAME_MAX_LENGTH);
    isValid &= require(fullName, "tbTen") && pattern(fullName, "tbTen", nameRegex);
    isValid &= require(email, "tbEmail") && pattern(email, "tbEmail", emailRegex);
    isValid &= require(password, "tbMatKhau") && length(password, "tbMatKhau", PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH) && pattern(password, "tbMatKhau", passwordRegex);
    isValid &= require(startDate, "tbNgay");
    isValid &= require(salary, "tbLuongCB") && isNumber(salary, "tbLuongCB") && range(salary, "tbLuongCB", SALARY_MIN, SALARY_MAX);
    isValid &= require(position, "tbChucVu") && checkPosition(position, "tbChucVu");
    isValid &= require(hoursOfWork, "tbGiolam") && isNumber(hoursOfWork, "tbGiolam") && range(hoursOfWork, "tbGiolam", HOURS_OF_WORK_MIN, HOURS_OF_WORK_MAX);

    return isValid;
}

// Required
var require = function (value, spanId, message) {
    if (!value.trim()) {
        document.getElementById(spanId).innerText = message || "* Trường này bắt buộc nhập";
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).innerText = "";
    return true;
}

// Length
var length = function (value, spanId, min, max, message) {
    if (value.length < min || value.length > max) {
        document.getElementById(spanId).innerText = message || `* Trường này phải có độ dài từ ${min} đến ${max} ký tự`;
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).innerText = "";
    return true;
}

// Pattern
var pattern = function (value, spanId, regex, message) {
    if (!regex.test(value)) {
        document.getElementById(spanId).innerText = message || "* Trường này không đúng định dạng";
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).innerText = "";
    return true;
}

// isNumber
var isNumber = function (value, spanId, message) {
    if (isNaN(value)) {
        document.getElementById(spanId).innerText = message || "* Trường này phải là số";
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).innerText = "";
    return true;
}

// Range
var range = function (value, spanId, min, max, message) {
    if (value < min || value > max) {
        document.getElementById(spanId).innerText = message || `* Trường này phải có giá trị từ ${min} đến ${max}`;
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).innerText = "";
    return true;
}

// Check position
var checkPosition = function (value, spanId, message) {
    if (value == -1) {
        document.getElementById(spanId).innerText = message || "Vui lòng chọn chức vụ";
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).innerText = "";
    return true;
}