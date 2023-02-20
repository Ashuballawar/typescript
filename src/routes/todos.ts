import {Router} from 'express'

import {Todo} from '../models/todos'
const todos:Todo[]=[]
type RequestBody={text:String
id:string}
type RequestParams={todoId:string}
const router=Router();
router.get('/',(req,res,next)=>{
    console.log('send success')
   res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{
    
    const body=req.body as RequestBody
    console.log('request');
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
   }
   todos.push(newTodo)
   res.status(201).json({msg:'success'})
})

router.post('/edit',(req,res,next)=>{
    const body=req.body as RequestBody
    const tid=body.id;
     for(let i=0;i<todos.length;i++){
        if(todos[i].id===tid){
            todos[i].text=req.body.text
            return res.status(201).json({msg:'success'})

        }}
        return res.status(400).json({msg:'not found'})

     
})

router.delete('/delete/:todoId',(req,res,next)=>{
  const params=req.params as RequestParams
    const tid=params.todoId;

    try{
    for(let i=0;i<todos.length;i++){
        if(todos[i].id===tid){
            delete todos[i];
            return res.status(200).json({msg:'deleted'})
           
        }
        return res.status(400).json({msg:'not found'})
    }}
    catch(err){
        console.log(err)
        res.status(500).json({msg:'something wrong'})
    }
})

export default router;