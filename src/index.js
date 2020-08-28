
const app = require('./app')
const {cliente} = require('./db/cassandra-db')

const port = process.env.PORT || 3000

// const fxEjecutar = async () =>{

//     try{
//         await cliente.connect();
    
//         // Execute a query
//         const rs =  await cliente.execute('SELECT * FROM system.local');
//         console.log(`Hello from cluster: ${rs.first()['cluster_name']}`);    
//     }
//     catch(error){
//         console.log(error);
//     }
    
// }

// fxEjecutar();

app.listen(port, ()=>{
    console.log('Server is up and running...at ' + port)
})

