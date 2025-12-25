public with sharing class CaseController {
    @AuraEnabled
    public static Id insertCase(String caseSubject, String caseDesc) {
        try {
            Case c = new Case(
                Status = 'New',
                Priority = 'Medium',
                Origin = 'Web',
                Subject = caseSubject,
                Description = caseDesc
            );
            insert c;
            return c.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating case: ' + e.getMessage());
        }
    }
}
