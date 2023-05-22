import { Component, ViewChild } from '@angular/core';
import { CrudReactiveService, Datas } from '../services/crud-reactive.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {

  // Table Columns Name
  displayedColumns: string[] = ['id', 'companyName', 'fName', 'lName', 'email', 'mobileNo', 'address', 'salary', 'adharNo', 'panNo', 'passbookNo', 'actions'];

  // Data Source Connect Data
  dataSource = new MatTableDataSource<any>;

  // Paginations
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Update & Add Toggle Button
  btnUDToogle: boolean = true;

  // Search Value 
  searchVal = '';

  // Reactive Forms Group 
  myForm: FormGroup;

  // Store All Data In Array
  allDatas?: Array<Datas> = new Array<Datas>();

  constructor(private _crud: CrudReactiveService, private modalService: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {

    //Reactive Groups & FromControl Innitilation 
    this.reactiveForm();
    
    // Get All Data Method 
    this.getDetails();

  }

  // FormGroup & FormControler Define
  reactiveForm() {
    this.myForm = new FormGroup({
      id: new FormControl(null),
      cName: new FormControl('',[Validators.required,]),
      fName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(10),Validators.pattern("^[a-zA-Z]+$")]),
      lName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(10),Validators.pattern("^[a-zA-Z]+$")]),
      email: new FormControl('',[Validators.required, Validators.email]),
      mobileNo: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      address: new FormGroup({
        blockNo: new FormControl('',[Validators.required]),
        address: new FormControl('',[Validators.required]),
        city: new FormControl('',[Validators.required])
      }),
      salary: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(7)]),
      personalDetails: new FormGroup({
        adharNo: new FormControl('',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
        panNo: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
        passbookNo: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(16)])
      })
    });
  }

  // Add Model Open Method
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  // Get All Data Method
  getDetails() {
    this._crud.getData().subscribe({
      next: (res) => {
        this.allDatas = res;
        this.dataSource = new MatTableDataSource(this.allDatas);

        // Pagination Refernce
        this.pagination();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Add Data Method
  addDetail() {
    this._crud.addData(this.myForm.value).subscribe({
      next: (res) => {
        this.reactiveForm();
        this.getDetails();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Edit Time Fill Data Method
  fillDetail(data, content) {
    this.btnUDToogle = false;
    this.open(content);
    this.myForm.patchValue(data);
  }

  // Edit Data Method
  editDetail() {
    this._crud.editData(this.myForm.value).subscribe({
      next: (res) => {
        this.btnUDToogle = true;
        this.reactiveForm();
        this.getDetails();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Delete Data Method
  deleteDetail(element) {
    this._crud.deleteData(element).subscribe({
      next: (res) => {
        this.getDetails();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Close & Cancle Data Actions Method
  dismissDetail() {

    // Update & Add Toggle Button 
    if (this.btnUDToogle) {
      this.btnUDToogle = false;
    }
    else {
      this.btnUDToogle = true;
    }

    this.reactiveForm();
    this.getDetails();
  }

  // Search Data Method
  searchDetail(){
    if (this.searchVal) {
      let searchEmployee = new Array<Datas>();
      if (this.allDatas.length > 0) {
        for (let emp of this.allDatas) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchVal.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.dataSource = new MatTableDataSource(searchEmployee);
      }
    }
    else {
      this.getDetails();
    }
  }
  

  // Pagenation Method
  pagination(){
    this.dataSource.paginator = this.paginator;
  }
}
