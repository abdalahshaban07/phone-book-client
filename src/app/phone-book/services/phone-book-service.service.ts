import { Record } from './../models/record';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const BASE_URL = `http://localhost:3002/api/phone-book`

@Injectable({
  providedIn: 'root'
})
export class PhoneBookServiceService {

  constructor(private http: HttpClient) { }

  getPhones(): Observable<Record[]> {
    return this.http.get<Record[]>(`${BASE_URL}`)
  }

  createPhone(body: Record): Observable<Record> {
    return this.http.post<Record>(`${BASE_URL}`, body)
  }

  deletePhone(id: string): Observable<Record> {
    return this.http.delete<Record>(`${BASE_URL}/${id}`)
  }

  getPhoneByName(name: string): Observable<Record> {
    return this.http.get<Record>(`${BASE_URL}/getName/${name}`)
  }
  getPhone(id: string): Observable<Record> {
    return this.http.get<Record>(`${BASE_URL}/${id}`)
  }

  updatePhone(id: string, body: Record): Observable<Record> {
    return this.http.put<Record>(`${BASE_URL}/${id}`, body)
  }

  checkExist(phoneNumber: number) {
    return this.http.get<Record>(`${BASE_URL}/phone/${phoneNumber}`).toPromise()
  }


}
