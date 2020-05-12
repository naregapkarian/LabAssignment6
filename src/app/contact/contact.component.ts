import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http'

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = []
  constructor(private http: Http) { }

  async ngOnInit() {
    this.contacts = await this.loadItemsFromFile();

  }

  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    console.log('from loadItemsFromFile data: ', data.json());
    return data.json();
  }

  addContact() {
    this.contacts.unshift(new Contact({}));
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
  }

  loadContact () {

  }

  saveContact (contact: any) {
    contact.editing = false;
  }
}
