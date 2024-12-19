import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Patient, Role, User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly usersEndpoint = `${this.baseUrl}/users`;
  private readonly rolesEndpoint = `${this.baseUrl}/roles`;
  private readonly patientsEndpoint = `${this.baseUrl}/patients`;
  private readonly employeesEndpoint = `${this.baseUrl}/employees`;
  private readonly studentsEndpoint = `${this.baseUrl}/students`;

  constructor(private readonly http: HttpClient) {}

  // Centralized error handler
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }

  // ===================== USERS API =====================
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersEndpoint).pipe(
      catchError(this.handleError<User[]>('getUsers', [])),
      delay(1000)
    );
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.usersEndpoint}/${id}`).pipe(
      catchError(this.handleError<User>(`getUserById id=${id}`)),
      delay(1000)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersEndpoint, user).pipe(
      catchError(this.handleError<User>('addUser')),
      delay(1000)
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.usersEndpoint}/${id}`, user).pipe(
      catchError(this.handleError<User>('updateUser')),
      delay(1000)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.usersEndpoint}/${id}`).pipe(
      catchError(this.handleError<void>('deleteUser')),
      delay(1000)
    );
  }

  // ===================== ROLES API =====================
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesEndpoint).pipe(
      catchError(this.handleError<Role[]>('getRoles', [])),
      delay(1000)
    );
  }

  getRolesByIDs(roleIDs: string[]): Observable<Role[]> {
    if (!roleIDs?.length) return of([]);
    return this.getRoles().pipe(
      map((roles) => roles.filter((role) => roleIDs.includes(role.roleID))),
      catchError(this.handleError<Role[]>('getRolesByIDs', [])),
      delay(1000)
    );
  }

  // ===================== PATIENTS API =====================
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsEndpoint).pipe(
      catchError(this.handleError<Patient[]>('getPatients', [])),
      delay(1000)
    );
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientsEndpoint}/${id}`).pipe(
      catchError(this.handleError<Patient>(`getPatientById id=${id}`)),
      delay(1000)
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsEndpoint, patient).pipe(
      catchError(this.handleError<Patient>('addPatient')),
      delay(1000)
    );
  }

  updatePatient(id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.patientsEndpoint}/${id}`, patient).pipe(
      catchError(this.handleError<Patient>('updatePatient')),
      delay(1000)
    );
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.patientsEndpoint}/${id}`).pipe(
      catchError(this.handleError<void>('deletePatient')),
      delay(1000)
    );
  }

  // ===================== OTHER ENTITIES =====================
  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.studentsEndpoint}/${id}`).pipe(
      catchError(this.handleError<any>(`getStudentById id=${id}`)),
      delay(1000)
    );
  }

  getEmpById(id: string): Observable<any> {
    return this.http.get<any>(`${this.employeesEndpoint}/${id}`).pipe(
      catchError(this.handleError<any>(`getEmpById id=${id}`)),
      delay(1000)
    );
  }

  // ===================== CUSTOM HELPERS =====================
  validateUserCredentials(userID: string, password: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.id === userID && user.password === password)),
      catchError(this.handleError<User | undefined>('validateUserCredentials')),
      delay(1000)
    );
  }
}
