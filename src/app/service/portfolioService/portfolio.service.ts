import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../../interface/portfolio';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiDjangoRestLink = "http://127.0.0.1:8000/api/portfolio/"


  constructor(private _httpClient: HttpClient) { }


  //Listar Portfolio
  listarPortfolio(): Observable<Portfolio[]> {
    return this._httpClient.get<Portfolio[]>(`${this.apiDjangoRestLink}?format=json`)
  }

  //Get Ativo
  getAtivo(id:any):Observable<Portfolio>{
    let linkGet:string = `${this.apiDjangoRestLink}${id}/`
    return this._httpClient.get<Portfolio>(linkGet)
  }

  //Atualizar Ativo
  atualizarAtivo(id:any, portfolio:Portfolio):Observable<Portfolio>{
    let linkAtualizar:string = `${this.apiDjangoRestLink}${id}/`
    return this._httpClient.put<Portfolio>(linkAtualizar,portfolio)
  }

  
}
