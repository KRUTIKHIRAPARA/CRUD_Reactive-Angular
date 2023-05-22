import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Addressing, CrudReactiveService, Datas, PersonalData } from '../services/crud-reactive.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['id', 'companyName', 'fName', 'lName', 'email', 'mobileNo', 'address', 'salary', 'adharNo', 'panNo', 'passbookNo', 'actions'];
  dataSource = new MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  btnUDToogle: boolean = true;

  myForm: FormGroup;

  allDatas?: Array<Datas> = new Array<Datas>();

  constructor(private _crud: CrudReactiveService, private modalService: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.getDetails();
    this.dataSource.paginator = this.paginator;
  }

  reactiveForm() {
    this.myForm = new FormGroup({
      id : new FormControl(null),
      cName: new FormControl(''),
      fName: new FormControl(''),
      lName: new FormControl(''),
      email: new FormControl(''),
      mobileNo: new FormControl(''),
      address: new FormGroup({
        blockNo: new FormControl(''),
        address: new FormControl(''),
        city: new FormControl('')
      }),
      salary: new FormControl(''),
      personalDetails: new FormGroup({
        adharNo: new FormControl(''),
        panNo: new FormControl(''),
        passbookNo: new FormControl('')
      })
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  getDetails() {
    this._crud.getData().subscribe({
      next: (res) => {
        this.allDatas = res;
        console.log(res);
        this.dataSource = new MatTableDataSource(this.allDatas);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addDetail() {
    this._crud.addData(this.myForm.value).subscribe({
      next:(res)=>{
        console.log('Data Added...');
        this.reactiveForm();
        this.getDetails();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  fillDetail(data,content){
    this.btnUDToogle = false;
    this.open(content);
    this.myForm.patchValue(data);
  }

  editDetail(){
    this._crud.editData(this.myForm.value).subscribe({
      next:(res)=>{
        console.log('Data Edited...');
        this.btnUDToogle = true;
        this.reactiveForm();
        this.getDetails();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  deleteDetail(element){
    this._crud.deleteData(element).subscribe({
      next:(res)=>{
        this.getDetails();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  dismissDetail(){

    if(this.btnUDToogle){
      this.btnUDToogle = false;
    }
    else{
      this.btnUDToogle = true;
    }
    this.reactiveForm();
    this.getDetails();
  }
}
