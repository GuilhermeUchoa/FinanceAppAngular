import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceYahooServiceService {

  private readonly apiLinkGetGrumb:string = `https://query2.finance.yahoo.com/v1/test/getcrumb`
  private readonly apiLink:string = `https://query2.finance.yahoo.com/v7/finance/quote?crumb=4q.aOuvGy7b&symbols=`
  private teste:string = "https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA?metrics=high?&interval=1d&range=1d"


  constructor(
    private _HttpClient:HttpClient, 
  ) { }

  getYahooFinanceCotacao(ativo:string):Observable<any>{
    let linkGet:string = `${this.apiLink}${ativo}`
    return this._HttpClient.get<any>(this.teste);
  }

}
