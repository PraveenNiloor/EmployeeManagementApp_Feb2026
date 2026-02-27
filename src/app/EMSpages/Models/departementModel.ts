export class departmentModel
{
    deptId:number;
    deptName:string;
    isActive:boolean;
    createdDate:Date;
    modifiedDate:Date;

    constructor()
    {
        this.deptId = 0,
        this.deptName ='',
        this.isActive = false;
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }
}


