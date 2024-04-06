using { isha.db.master, isha.db.transaction } from '../db/data-model';

//to keep the name of service same we use @(path:'name') 
service CatalogService @(path:'CatalogService') {
    @Capabilitie:{Deletable}
    entity BusinessPartnerSet as projection on master.businesspartner;
    entity AddressSet as projection on master.address;
    entity EmployeeSet as projection on master.employees;
    entity ProductSet as projection on master.product;
    entity POs as projection on transaction.purchaseorder
    actions{
        action boost() returns POs;
        function largestOrder() returns POs;
    };
    entity POItems as projection on transaction.poitems;

}
