import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const uriSanbox = 'http://localhost:3000/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private httpClient: HttpClient ) { }

  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(uriSanbox);
  }

  getUser(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${uriSanbox}/find`, { params: { id } });
  }

  createUser(userDto: any): Observable<Object> {
    return this.httpClient.post(`${uriSanbox}`, userDto);
  }

  updateUser(id: string, userDto: any): Observable<Object> {
    return this.httpClient.patch(`${uriSanbox}/update`, userDto, { params: { id } });
  }

  deleteUser(id: string): Observable<Object> {
    return this.httpClient.delete(`${uriSanbox}/delete`, { params: { id } })
  }

}
