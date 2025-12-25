public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchContacts(Integer limitSize) {
        return [SELECT Id, Name, Email, Phone FROM Contact ORDER BY CreatedDate DESC LIMIT :limitSize];
    }
}
