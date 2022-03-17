import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = 'HLvmSe306AZzwHYmUb0X9ZsEuQZDesVj';
  private servURL: string ='https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];

  public resultado : Gif[]=[];
  get historial(){
    
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ){ 
    
    this._historial =  JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('respImagenes')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial =  JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query:string){
    
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      

    }
   
    console.log(this._historial);

    const params = new HttpParams()
                   .set('api_key',this.apiKey)
                   .set('limit','10')
                   .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servURL}/search`,{params: params})
    .subscribe( resp  =>{
      
      console.log(resp.data);
      this.resultado = resp.data;
      localStorage.setItem('respImagenes', JSON.stringify(this.resultado));
    });
  }

 

}
