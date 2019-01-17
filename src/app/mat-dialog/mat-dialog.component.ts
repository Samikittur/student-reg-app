import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Services } from '../services'
@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css'],
  providers:[Services]
})
export class MatDialogComponent implements OnInit {
  editmode = true;
  regdate: any;
  disableDatesFrom:any;
  constructor(private Service:Services, public thisDialogRef: MatDialogRef<MatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    const today = new Date();
    this.regdate = new Date(this.data.regdate);
    this.disableDatesFrom = this.regdate;
    if(this.regdate < today){
      this.disableDatesFrom = today;
    }
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  onEditMode(data){
    data.title = "Edit Request Details"
    this.editmode = false;
  }

  onFormCloseConfirm(data,id) {
    const updateDate = {
      _id:id,
      examDate: data.value.examDate, 
      examstatus: data.value.examstatus, 
      totalScore:data.value.totalScore
    }
    this.Service.updateRequest(updateDate).subscribe(result => {
      this.thisDialogRef.close('Confirm');
    });
  }

  updateReg(form:NgForm){
    console.log(form);
  }
}
