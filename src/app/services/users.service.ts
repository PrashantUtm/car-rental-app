import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [
    {
      username: '1',
      firstName: 'Tom',
      lastName: 'Ford',
      address: '2 Rose Street, Curepipe',
      dob: new Date(1980, 5, 7),
      email: 'tomford@mail.com',
      phoneNumber: '+230 5 777 8888'
    },
    {
      username: '2',
      firstName: 'Patrick',
      lastName: 'Harry',
      address: '3 Rose Street, Curepipe',
      dob: new Date(1910, 5, 7),
      email: 'patrickharry@mail.com',
      phoneNumber: '+230 5 777 5555'
    },
    {
      username: '3',
      firstName: 'Phillip',
      lastName: 'Sam',
      address: '4 Rose Street, Curepipe',
      dob: new Date(1990, 5, 7),
      email: 'sam@mail.com',
      phoneNumber: '+230 5 777 6666'
    },
    {
      username: '4',
      firstName: 'Mary',
      lastName: 'Jane',
      address: '5 Rose Street, Curepipe',
      dob: new Date(1985, 5, 7),
      email: 'maryjane@mail.com',
      phoneNumber: '+230 5 777 9999'
    },
  ]

  constructor() { }

  public getUser(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }
}
