import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../../interface/portfolio';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiLink: string = "http://localhost:3000/carteira";


  constructor(private _httpClient: HttpClient) { }


  //Listar Carteira
  listarCarteira(): Observable<Portfolio[]> {
    return this._httpClient.get<Portfolio[]>(`${this.apiLink}?_sort=tipo`)
  }

  //Listar Ativo
  getAtivo(id: any): Observable<Portfolio[]> {
    const urlLink = `${this.apiLink}/${id}`
    return this._httpClient.get<Portfolio[]>(urlLink)
  }

  //Listar Ativo pelo nome
  getAtivoNome(ativo: any): Observable<Portfolio[]> {
    const urlLink = `${this.apiLink}?ativo=${ativo}`
    return this._httpClient.get<Portfolio[]>(urlLink)
  }

  //Atualizar Ativo
  atualizarAtivo(id: any, ativo: Portfolio): Observable<Portfolio[]> {
    const urlAtualizar = `${this.apiLink}/${id}`
    return this._httpClient.put<Portfolio[]>(urlAtualizar, ativo)
  }


  search(term:string):Observable<Portfolio[]> {
    if(term == ''){
      return this._httpClient.get<Portfolio[]>(`${this.apiLink}?_sort=tipo`)
    }
    const urlSearchTipo:string = `${this.apiLink}?q=${term.toLocaleLowerCase()}`
    return this._httpClient.get<Portfolio[]>(urlSearchTipo)
  }
}
