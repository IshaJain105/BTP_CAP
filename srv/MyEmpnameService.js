module.exports = (srv) =>{
    srv.on("empname",req=>`Hello ${req.data.name}`);
}