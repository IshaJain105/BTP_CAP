module.exports = cds.service.impl(async function () {
    // this.on("boost",async(req)=>{
    //     console.log("AA gya");
    //     return{
    //         "NODE_KEY":"Dummy"
    //     };
    // });
    const {POs}= this.entities;

    this.on("boost",async(req)=>{
        console.log("Icrease by 20000");
        
        try {
            const ID= req.params[0];
            //start a db transaction 
            const tx= cds.tx(req);
            await tx.update(POs).with({
                GROSS_AMOUNT: {'+=' : 20000}
            }).where(ID);
        } catch (error) {
            return "ERROR : "+ error.toString();
        }
    });

    this.on("largestOrder",async(req)=>{
        console.log("Largest order");
        
        // try {
        //     return{
        //         "NODE_KEY": "Largest",
        //         "GROSS_AMOUNT" : 78728
        //     }
        // } catch (error) {
        //     return "ERROR : "+ error.toString();
        // }

        try {
            //start db transaction
            const tx = cds.tx(req);
            const recordData= tx.read(POs).orderBy({
                GROSS_AMOUNT : 'desc'
            }).limit(1);
            return recordData;
        } catch (error) {
            return "ERROR : "+ error.toString();
        }
    })
});