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
  contactParams: string = '';
  constructor(private http: Http) { }

  
  async ngOnInit() {
    this.loadContacts();
  } 

  async loadContacts () {
    const savedContacts = this.getItemsFromLocalStorage('contacts');
    if(savedContacts && savedContacts.length > 0) {
      this.contacts = savedContacts;
    } else {
      this.contacts = await this.loadItemsFromFile();
  }
    this.sortbyID(this.contacts);
  }

  async loadItemsFromFile() {
    const data = await this.http.get('assets/contacts.json').toPromise();
    return data.json();
  }

  addContact() {
    this.contacts.unshift(new Contact({}));

  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveItemstoLocalStorage(this.contacts);
  }

  searchContact(params: string) {
    this.contacts = this.contacts.filter((item: Contact) => {
      const fullName = item.firstName + ' ' + item.lastName;
      if(params === fullName || params === item.firstName || params === item.lastName) {
        return true;
      } else {
        return false;
      }
    });
  }

  sortbyID (contacts: Array<Contact>) {
    contacts.sort((prevContact:Contact, presContact: Contact) => {
      return prevContact.id > presContact.id ? 1 : -1;
    });
    return contacts;
  }

  saveContact (contact: any) {
    contact.editing = false;
    this.saveItemstoLocalStorage(this.contacts);
  }

  saveItemstoLocalStorage (contacts: Array<Contact>) {
    contacts = this.sortbyID(contacts);
    const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
  } 

  getItemsFromLocalStorage (key: string) {
    const savedContacts = JSON.parse(localStorage.getItem(key));
    return savedContacts
  }

}
