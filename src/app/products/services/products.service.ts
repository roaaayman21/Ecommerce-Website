import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(environment.baseApi +'products');
  }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.baseApi +'products/categories');
}
getProductsByCategory(keyword:string) {
  return this.http.get(environment.baseApi +'products/category/'+keyword);
}

getProductById(id: number): Observable<any> {
  return this.http.get(environment.baseApi + 'products/' + id);
}
}
