import { LightningElement, track } from 'lwc';
import fetchContacts from '@salesforce/apex/ContactController.fetchContacts';

export default class ContactsFetcher extends LightningElement {
    @track contacts = [];

    connectedCallback() {
        fetchContacts({ limitSize: 5 })
            .then(res => this.contacts = res)
            .catch(err => console.error(err));
    }
}
