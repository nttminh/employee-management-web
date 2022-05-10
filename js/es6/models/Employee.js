class Employee {
    constructor(username, fullname, email, password, startDate, salary, position, hoursOfWork) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.startDate = startDate;
        this.salary = +salary;
        this.position = +position;
        this.hoursOfWork = +hoursOfWork;
    }

    getPosition() {
        if (this.position === 0) { return "Sếp" }
        if (this.position === 1) { return "Trưởng phòng" }
        return "Nhân viên"
    }

    getTotalSalary() {
        if (this.position === 0) { return this.salary * 3 }
        if (this.position === 1) { return this.salary * 2 }
        return this.salary
    }

    getConduct() {
        if (this.hoursOfWork >= 192) { return "Nhân viên xuất sắc" }
        if (this.hoursOfWork >= 176) { return "Nhân viên giỏi" }
        if (this.hoursOfWork >= 160) { return "Nhân viên khá" }
        return "Nhân viên trung bình"
    }

}