import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../../interface/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiDjangoRestLink = "http://127.0.0.1:8000/api/portfolio/"
  private apiDjangoRestLinkFile = "http://127.0.0.1:8000/api/fileUpload/"
  private apiDjangoRestAtualizarCotacao = "http://127.0.0.1:8000/api/atualizarCotacao/"

  private apiDjangoRestDownloadOnedrive = "http://127.0.0.1:8000/api/sincronizarDownload/"
  private apiDjangoRestUploadOnedrive = "http://127.0.0.1:8000/api/sincronizarUpload/"


  constructor(
    private _httpClient: HttpClient,
  ) { }

  
  //Listar Portfolio
  listarPortfolio(): Observable<Portfolio[]> {
    return this._httpClient.get<Portfolio[]>(`${this.apiDjangoRestLink}?format=json`)
  }

  //Get Ativo
  getAtivo(id: any): Observable<Portfolio> {
    let linkGet: string = `${this.apiDjangoRestLink}${id}/`
    return this._httpClient.get<Portfolio>(linkGet)
  }

  //Atualizar Ativo
  atualizarAtivo(id: any, portfolio: Portfolio): Observable<Portfolio> {
    let linkAtualizar: string = `${this.apiDjangoRestLink}${id}/`
    return this._httpClient.put<Portfolio>(linkAtualizar, portfolio)
  }

  searchApi(word: any): Observable<Portfolio[]> {
    let searchLink: string = `${this.apiDjangoRestLink}?search=${word}`
    return this._httpClient.get<Portfolio[]>(searchLink)
  }

  //Atualizar Cotacoes
  atualizarCotacao() {
    let linkUpdatePrice:string = `${this.apiDjangoRestAtualizarCotacao}`
    return this._httpClient.get(linkUpdatePrice)
  }

  //UploadFileB3
  uploadFile(file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    return this._httpClient.post<any>(this.apiDjangoRestLinkFile,formData);

  }




}
