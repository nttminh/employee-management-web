class Company {
    constructor(...args) {
        this.employees = new Array();
        for (const i in args) {
            this.employees.push(args[i]);
        }
    }

    // add employee
    addEmployee(e) {
        this.employees = [...this.employees, e];
        return this
    }

    // find index of employee by username
    getIndexOfEmployeeByUsername(username) {
        return this.employees.findIndex(e => e.username === username);
    }

    // find employee by username
    getEmployeeByUsername(username) {
        return this.employees.find(e => e.username === username);
    }

    // find employee by email
    getEmployeeByEmail(email) {
        return this.employees.find(e => e.email === email);
    }

    // find employees by full name
    getEmployeesByFullName(fullname) {
        return this.employees.filter(e => e.fullname.includes(fullname));
    }

    // find employees by conduct
    getEmployeesByConduct(conduct) {
        conduct = conduct.toLowerCase();
        return this.employees.filter(e => e.getConduct().toLowerCase().includes(conduct));
    }

    // delete employee by username
    deleteEmployeeByUsername(username) {
        let index = this.getIndexOfEmployeeByUsername(username);
        if (index !== -1) {
            this.employees.splice(index, 1);
            console.log(this.employees);
        }
        return this;
    }

    // update employee by username
    updateEmployeeByUsername(username, newEmployee) {
        let index = this.getIndexOfEmployeeByUsername(username);
        if (index !== -1) {
            this.employees[index] = newEmployee;
        }
        return this;
    }
}