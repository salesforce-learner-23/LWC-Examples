import { LightningElement, track } from 'lwc';
import insertCase from '@salesforce/apex/CaseController.insertCase';

export default class CaseCreator extends LightningElement {
    @track caseSubject = '';
    @track caseDesc = '';

    handleSubjectChange(event) {
        this.caseSubject = event.target.value;
    }

    handleDescChange(event) {
        this.caseDesc = event.target.value;
    }

    createCaseNow() {
        insertCase({ caseSubject: this.caseSubject, caseDesc: this.caseDesc })
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Case created with ID: ' + result,
                    variant: 'success'
                }));
                this.caseSubject = '';
                this.caseDesc = '';
            })
            .catch(error => {
                console.error('Error:', error);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body?.message || 'Failed to create case',
                    variant: 'error'
                }));
            });
    }
}
