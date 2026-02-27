import { Routes } from '@angular/router';
import { Login } from './EMSpages/login/login';
import { Header } from './EMSpages/header/header';
import { Dashboard } from './EMSpages/dashboard/dashboard';
import { Department } from './EMSpages/department/department';
import { Designation } from './EMSpages/designation/designation';
import { EmployeeForm } from './EMSpages/employee-form/employee-form';
import { EmployeeList } from './EMSpages/employee-list/employee-list';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },

    {
        path:'login',
        component:Login
    },
    {
        path:'',
        component:Header,
        children:[
            {
                path:'dashboard',
                component:Dashboard
            },
            {
                path:'department',
                component:Department
            },
            {
                path:'designation',
                component:Designation
            },
            {
                path:'employee/:id',
                component:EmployeeForm
            },
            {
                path:'employee-list',
                component:EmployeeList
            }
        ]
    }
];
