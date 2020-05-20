import { Component, OnInit } from '@angular/core';
import { ContactDataService } from 'src/app/services/contact-data.service';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css']
})
export class ContactBookComponent implements OnInit {

  toggle: boolean = true;

  public userData = [];
  public userList = [];

  constructor(private dataService: ContactDataService) { }

  ngOnInit() {
    this.dataService.getContactData().subscribe((data) => {
      this.userData = data["data"];
      this.userList = Object.assign([], data["data"]);
    }, (error) => {
      console.log(error);
    })
  }

  toggleView(event) {
    this.toggle = !this.toggle
  }

  searchUser(event) {
    let searchText = event.target.value.toLowerCase();
    this.userData = this.userList.filter((user) => {
      return (user.first_name.toLowerCase().includes(searchText) || user.last_name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText));
    });
  }

  sortData(event?) {
    let value = event.target.value;
    if (value === "name") {
      this.userData.sort((a, b) => {
        if (a.first_name.toLowerCase() < b.first_name.toLowerCase())
          return -1;
        if (a.first_name.toLowerCase() < b.first_name.toLowerCase())
          return 1
      });
    } else if (value === "email") {
      this.userData.sort((a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase())
          return -1;
        if (a.email.toLowerCase() < b.email.toLowerCase())
          return 1
      });
    } else {
      this.dataService.getContactData().subscribe((data) => {
        this.userData = data;
      }, (error) => {
        console.log(error);
      })
    }
  }
}

