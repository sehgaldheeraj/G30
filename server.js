// const express = require('express');
// const cluster = require('cluster');
// const os = require('os');
// const app = express();
// console.log(process.pid);
// const noOfCores = os.availableParallelism();
// console.log(noOfCores);
// // cluster.isPrimary
// // returns true if main thread is working
// if(cluster.isPrimary){
//     for(let i=0; i<noOfCores; i++){
//         cluster.fork();
//         //const worker = cluster.fork();
//         // worker.on('exit', (code, signal)=>{
//         //     if(signal){
//         //         console.log('worker was killed by signal:', signal);
//         //     } else if(code !== 0){
//         //         console.log('worker exited with error code:', code);
//         //     } else {
//         //         console.log('worker built successful');
//         //     }
//         // })
//         //console.log(process.pid);
//     }
// }
// else{
//     app.get('/slow-api', (req, res)=>{
//         for(let i=0; i<20_000_000_000; i++){

//         }
//         res.json({message: `This is a blocking api: ${process.pid}`});
//     });
//     app.get('/normal-api', (req, res)=>{
//         res.json({message: `This is a non-blocking api: ${process.pid}`});
//     });
//     app.listen(3000);
// }
const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();

const noOfCores = os.cpus().length; // Get number of CPU cores

if(cluster.isPrimary){
    console.log(`Master process ${process.pid} is running`);

    // Fork workers
    for(let i = 0; i < noOfCores; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
}
else {
    console.log(`Worker process ${process.pid} is running`);

    app.get('/slow-api', (req, res) => {
        // Simulate a long blocking operation
        for(let i = 0; i < 20_000_000_000; i++) { }
        res.json({message: `This is a blocking api: ${process.pid}`});
    });

    app.get('/normal-api', (req, res) => {
        res.json({message: `This is a non-blocking api: ${process.pid}`});
    });

    app.listen(3000, () => {
        console.log(`Server listening on port 3000 in process ${process.pid}`);
    });
}
