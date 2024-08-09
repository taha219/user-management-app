import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>(); 

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `page-${page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<any>(`${this.apiUrl}?page=${page}&per_page=6`).pipe(
      tap(response => this.cache.set(cacheKey, response)),
      catchError(error => {
        console.error('Error fetching users', error);
        return of(null); // Handle error appropriately
      }),
      shareReplay(1)
    );
  }

  getUserById(id: number): Observable<any> {
    const cacheKey = `user-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(response => this.cache.set(cacheKey, response)),
      catchError(error => {
        console.error('Error fetching user', error);
        return of(null); // Handle error appropriately
      }),
      shareReplay(1)
    );
  }
}
