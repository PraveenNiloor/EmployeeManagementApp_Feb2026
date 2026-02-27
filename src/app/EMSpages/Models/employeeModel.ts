export class employeeModel {

    empId: number;
    name: string;
    mobileNo: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    altMobileNo: string;
    address: string;
    designationId: number;

    createdDate: Date;
    modifiedDate: Date;
    role: string;
    designationName: string;
    departmentName:string;

    constructor() {
        this.empId = 0;
        this.name = '';
        this.mobileNo = '';
        this.email = '';
        this.city = '';
        this.state = '';
        this.pincode = '';
        this.altMobileNo = '';
        this.address = '';
        this.designationId = 0;

        this.createdDate = new Date();
        this.modifiedDate = new Date();
        this.role = '';
        this.designationName ='';
        this.departmentName='';
    }
}