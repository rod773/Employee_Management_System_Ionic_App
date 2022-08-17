import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  employeeList = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '3201694/pexels-photo-3201694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      firstName: 'David Osei',
      lastName: 'Opoku',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      firstName: 'David Osei',
      lastName: 'Opoku',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      firstName: 'David Osei',
      lastName: 'Opoku',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '6930303/pexels-photo-6930303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      firstName: 'Kris',
      lastName: 'Adam',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      firstName: 'David Osei',
      lastName: 'Opoku',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '3201694/pexels-photo-3201694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 7,
      firstName: 'David Osei',
      lastName: 'Opoku',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '3201694/pexels-photo-3201694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 8,
      firstName: 'David Osei',
      lastName: 'Opoku',
      email: 'xuwudawei100@gmail.com',
      dateOfJoining: '08/08/2022',
      image:
        '3201694/pexels-photo-3201694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
