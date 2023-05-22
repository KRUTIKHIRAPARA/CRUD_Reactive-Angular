import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudReactiveService {

  url = "http://localhost:3000/details";

  constructor(private _http: HttpClient) { }

  getData() {
    return this._http.get<Array<Datas>>(this.url);
  }

  addData(body: Datas) {
    return this._http.post(this.url, body);
  }

  editData(body: Datas) {
    return this._http.put(`${this.url}/${body.id}`, body);
  }

  deleteData(body: Datas) {
    return this._http.delete(`${this.url}/${body.id}`);
  }

}

export class Datas {
  id: number;
  cName: string;
  fName: string;
  lName: string;
  email: string;
  mobileNo: string;
  address: Addressing[];
  salary: string;
  personalDetails: PersonalData[];
}

export class Addressing {
  city: string;
  blockNo: string;
  address: string;
}

export class PersonalData {
  adharNo: string;
  panNo: string;
  passbookNo: string;
}
