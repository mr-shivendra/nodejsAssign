const express=require('express')
const port=3004
const server=express()
const fs=require('fs')

server.use(express.json())


let data=[]
function loadData(){
    try {
        const fileData=fs.readFileSync('./day2.json','utf-8')
        data=JSON.parse(fileData)
    } catch (error) {
        console.log('data is not found at DataBase')
    }
}
function saveData(){
    fs.writeFileSync('./day2.json',JSON.stringify(data))
}

function writeIndex(){
    return data.length==0 ? 1 : ++data.length
}

function findIndex(ind){
    loadData()
    let dataEle=data.find(item=>item.id===ind)
    return [dataEle]
}
function findIndexof(ind){
    let dataEle=data.find(item=>item.id===ind)
    let indexto=data.findIndexof(dataEle)
    return indexto
}

function deleteIndex(ind){
    loadData()
    let deletedArray=data.filter(item=>item.id!==ind)
    return deletedArray
}

server.get('/home',(req,res)=>{    // for fetching the whole data 
    //const parsedData=JSON.parse(data)
    loadData()
    const stringData=JSON.stringify(data)
    console.log( `your data is here ${stringData}`)
    res.send(`You have successffully landed at home page ${stringData}`)
})

server.get('/home/:id',(req,res)=>{ // fetch data through this method 
    loadData()
    let ind=parseInt(req.params.id)
    const newValue=findIndex(ind)
    const stringData=JSON.stringify(newValue)
    console.log( `your data is here ${stringData}`)
    res.send(`You have successffully landed at home page ${stringData}`)
})
server.delete('/home/:id',(req,res)=>{ //for deleting ele of data through thier particular id 
    loadData()
    let ind=parseInt(req.params.id)
    const newArr=deleteIndex(ind)
    const newData=JSON.stringify(newArr)
    fs.writeFileSync('./day2.json',JSON.stringify(newArr))
    console.log( `your data is here ${newData}`)
    res.send(`You have successffully landed at home page ${newData}`)
})

server.delete('/home/delete/true',(req,res)=>{ //for deleting ele of data through thier particular id 
    loadData()
   // let ind=parseInt(req.params.id)
    // const newArr=deleteIndex(ind)
    // const newData=JSON.stringify(newArr)
    const newData=data.filter(ele=>ele.status!==true)
    fs.writeFileSync('./day2.json',JSON.stringify(newData))
    console.log( `your data is here ${newData}`)
    loadData()
    res.send(`You have successffully landed at home page ${JSON.stringify(newData)}`)
})
server.patch('/home/:id',(req,res)=>{  //for repair ele through thier particular id if any
    loadData()
    let indx=req.params.id*1
    let dataToUpDate=data.find(el=>el.id===indx)
    let indxOfData=data.indexOf(dataToUpDate)
    Object.assign(dataToUpDate,req.body)
    data[indxOfData]=dataToUpDate
    fs.writeFileSync('./day2.json',JSON.stringify(data))
    res.send(`your server is patched at id no. ${indx} respected Data ${JSON.stringify(req.body)}`)
})

server.patch('/home/even/true',(req,res)=>{  //for repair ele through thier particular id if any
    loadData()
   // let indx=req.params.even
    for(i=0;i<data.length;i++){
        if(data[i].id%2===0){
            data[i].status=true
        }
    }
    // let dataToUpDate=data.find(el=>el.id===indx)
    // let indxOfData=data.indexOf(dataToUpDate)
    // Object.assign(dataToUpDate,req.body)
    // data[indxOfData]=dataToUpDate
    fs.writeFileSync('./day2.json',JSON.stringify(data))
    res.send(`your server is updated at id no. even  ${JSON.stringify(req.body)}`)
})

server.put('/home/:id',(req,res)=>{ // for Update the whole ele of data if any through thier particular id
    loadData()
    let indx=req.params.id*1
    let dataToUpDate=data.find(el=>el.id===indx)
    let indxofData=data.indexOf(dataToUpDate)
    data[indxofData]=req.body
    fs.writeFileSync('./day2.json',JSON.stringify(data))
    res.send(`there is a data to updated at id=${indx}`)
})

server.post('/home',(req,res)=>{ //for post new data
    loadData()
    const inComingData=req.body
    let index= writeIndex()
    inComingData.id=index
    data.push(inComingData)
    let addData=data.filter(ele=>ele!==null)
    fs.writeFileSync('./day2.json',JSON.stringify(addData))

    console.log(data)
    res.send('You have successffully loaded data at home page')
})
// server.get('/home',(req,res)=>{
//     res.send('You have successffully landed at home page')
// })
// server.get('/home',(req,res)=>{
//     res.send('You have successffully landed at home page')
// })

server.listen(port,()=>{
    console.log(`Your server is running now at ${port} port no.`)
})