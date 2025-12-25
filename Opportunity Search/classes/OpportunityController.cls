public with sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> searchOpps(String stage) {
        if (String.isBlank(stage)) return new List<Opportunity>();
        return [SELECT Id, Name, StageName, Amount, CloseDate, AccountId, Account.Name 
                FROM Opportunity 
                WHERE StageName = :stage 
                ORDER BY CloseDate ASC
                LIMIT 50];
    }
}
