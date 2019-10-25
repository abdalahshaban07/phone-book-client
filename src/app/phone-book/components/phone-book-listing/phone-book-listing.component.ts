import { PhoneBookServiceService } from './../../services/phone-book-service.service';
import { Record } from './../../models/record';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-phone-book-listing',
  templateUrl: './phone-book-listing.component.html',
  styleUrls: ['./phone-book-listing.component.scss']
})
export class PhoneBookListingComponent implements OnInit {
  displayedColumns = ['name', 'phone number', 'action']
  dataSource: Record[] = []
  search: any


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phoneSer: PhoneBookServiceService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllPhones()
  }

  saveBtn() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  getAllPhones() {
    this.phoneSer.getPhones().subscribe(data => {
      this.dataSource = data
    }, err => {
      console.log(err)
    })
  }

  editBtn(id) {
    console.log(id)
    this.router.navigate([id], { relativeTo: this.route })
  }

  deleteBtn(id) {
    console.log(id);
    this.phoneSer.deletePhone(id).subscribe(data => {

      this.snackBar.open('Phone Deleted', 'Success', {
        duration: 2000
      })
      this.getAllPhones()

    }, err => {
      this.errorHandler(err, 'Failed TO Delete This Item')
    })
  }
  errorHandler(error, message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    })
  }

  // applyFilter(filterValue: any) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  findByName() {
    this.phoneSer.getPhoneByName(this.search).subscribe(data => {
      console.log(data['data'])
      if (data['data']) {
        this.dataSource = [data['data']]

      } else {
        this.dataSource = null
      }
      this.search = ''
      // this.dataSource = [data]
    })
    // let obj = this.dataSource.find(v => v.name === this.search);
    // console.log(obj);

    // if (obj.name) {
    //   this.dataSource = [obj]
    // } else {
    //   return
    // }
  }

  goToHome() {
    this.getAllPhones()
  }

}

