import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8000/api';
  private acessToken: string = '';

  constructor(private http: HttpClient) { }

  // amadurecer essa funcao
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, user);
  }

  // Função para fazer login e obter o token
  login(username: string, password: string): Observable<any> {
    const body = { username, password }
    return this.http.post(`${this.apiUrl}/token/`, body);
  }

  // Função para guardar o token no localStorage
  storeToken(token: string) {
    localStorage.setItem('access_token', token);
    this.acessToken = token;
  }

  // Função para obter o token do localStorage
  getToken() {
    return localStorage.getItem('access_token')
  }

  // Função para adicionar o token ao header das requisições
  getHeaders() {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Função para logout (limpar token)
  logout() {
    localStorage.removeItem('access_token');
  }

}
