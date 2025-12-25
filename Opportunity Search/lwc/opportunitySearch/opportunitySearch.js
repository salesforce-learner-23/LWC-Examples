import { LightningElement, track, wire } from 'lwc';
import searchOpps from '@salesforce/apex/OpportunityController.searchOpps';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunitySearch extends LightningElement {
    @track stage = 'Prospecting';
    @track opps = [];
    @track error;

    // Pre-populate with common stages
    get stageOptions() {
        return [
            { label: 'Prospecting', value: 'Prospecting' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Negotiation', value: 'Negotiation' },
            { label: 'Closed Won', value: 'Closed Won' }
        ];
    }

    // Use @wire for cacheable Apex
    @wire(searchOpps, { stage: '$stage' })
    wiredOpps({ error, data }) {
        if (data) {
            this.opps = data;
            this.error = undefined;
        } else if (error) {
            this.opps = [];
            this.error = error;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error loading Opportunities',
                message: error.body.message,
                variant: 'error'
            }));
        }
    }

    handleStageChange(event) {
        this.stage = event.detail.value;
    }
}
