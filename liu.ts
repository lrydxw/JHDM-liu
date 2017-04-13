import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage,SqlStorage} from '../../storage/storage';
//import {  TestListPage } from "../test-list/test-list";
import { QuotePage  } from "../quote/quote";
/*
  Generated class for the Liu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-liu',
  templateUrl: 'liu.html'
})
export class LiuPage {
 
 pet:string="test1";
 items=[];
 items1=[];
 items2=[];
 id:any;
 number:any;
  storage:Storage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    //默认加载
   this.storage=new Storage(SqlStorage,{name:'dbTest'});
   // alert( this.navParams.data.ALIAS);
   var sql;
    if(this.navParams.data.ALIAS=="农变未")
    {
      sql='select * from NYDGBWLYD '; //所有
      this.LoadData(sql,this.navParams.data.ALIAS,"test1",false);
    }
   else if(this.navParams.data.ALIAS=="监测图斑")
    {
       sql='select * from JCTB' ;//所有
      this.LoadData(sql,this.navParams.data.ALIAS,"test1",false);
    }
    else if(this.navParams.data.ALIAS=="影像数据")
    {
      // sql='select * from JCTB' ;//所有
    }
  
  }

  //搜索时触发
  getItems(ev: any) {
    let val = ev.target.value;
    //alert(this.pet);
    var sql;
   if(this.navParams.data.ALIAS=="农变未")
    {
      if(this.pet=="test1")
      { 
        if (val && val.trim() != '') //如果搜索的值不为空，就查数据库。反之就是默认的数据。
         {
        sql='select * from NYDGBWLYD where BSMID like  \''+val+'%\'' ;
         }
         else
         {  
          sql='select * from NYDGBWLYD' ; 
         }
      }
      else  if(this.pet=="test2")
       {
         if (val && val.trim() != '') {
          sql='select * from NYDGBWLYD where  BYZBL=1 and BSMID like  \''+val+'%\'' ;
          }
         else
          { 
             sql='select * from NYDGBWLYD where  BYZBL=1  ' ; 
          }
      }
       else  if(this.pet=="test3")
       {
          if (val && val.trim() != '') {
           sql='select * from NYDGBWLYD where  BYZBL=0 and BSMID like  \''+val+'%\'' ;
         }
       else
         {  
         sql='select * from NYDGBWLYD where  BYZBL=0  ' ;
         }
       }
    }
   else if(this.navParams.data.ALIAS=="监测图斑")
    {
        if(this.pet=="test1")
        { 
         if (val && val.trim() != '') 
         {     //如果搜索的值不为空，就查数据库。反之就是默认的数据。
         sql='select * from JCTB where JCBH like  \''+val+'%\'' ;
          }
       else
        {  
         sql='select * from JCTB' ;
        }
      }
      else  if(this.pet=="test2")
      {
        if (val && val.trim() != '') {
        sql='select * from JCTB where   JCBH=1 and JCBH  like  \''+val+'%\'' ;
      }
      else
       {   sql='select * from JCTB where  JCBH=1  ' ; }
       
       }
   else  if(this.pet=="test3")
    {
    if (val && val.trim() != '') {
      sql='select * from JCTB where  JCBH=2 and JCBH  like   \''+val+'%\'' ;
      }
      else
       {  
       sql='select * from JCTB where  JCBH=2  ' ;
       }
    }
    }
    
     this.LoadData(sql,this.navParams.data.ALIAS,this.pet,true);
 }


//点击 Selecttab时触发。
    Changed(ev: any) {
    let val = ev;
    alert(val);
    this.pet=val;
    var sql
    var sql1;
    var sql2;
    {
     if(this.navParams.data.ALIAS=="农变未")
    {
      if(val=="test1")
      {
       sql='select * from NYDGBWLYD '; //所有
      }
      else if(val=="test2")
      { 
       sql='select * from NYDGBWLYD  where BYZBL=1 '; //已举证
      }
      else  if(val=="test3")
      {
       sql='select * from NYDGBWLYD  where BYZBL=0 '; //未举证
      }
    }
   else if(this.navParams.data.ALIAS=="监测图斑")
    {
      if(val=="test1")
      {
        sql='select * from JCTB '; //所有
      }
      else if(val=="test2")
      { 
       sql='select * from JCTB  where JCBH=1 '; //已举证
      }
      else  if(val=="test3")
      {
       sql='select * from JCTB  where JCBH=2 '; //未举证
      }
     } 
    this.LoadData(sql,this.navParams.data.ALIAS,val,true); 
      
    }
    }

/// 获取不同类型数据
 public  LoadData(sql:string,typename:any,type:any,isClear:Boolean)
    {
      if(isClear)
      {
           this.items=[];
           this.items1=[];
           this.items2=[];
      }
      this.storage.query(sql, []).then(
      (data)=>{
        console.log("successSelect");
        console.log(data.res.rows.length);
        for(let i=0;i<data.res.rows.length;i++){
            console.log(data.res.rows.item(i).name);
               console.log(data.res.rows.item(i));
               if(typename=="农变未")
              { 
               if(type=="test1")
               { 
                this.items.push({
                id:data.res.rows.item(i).BSMID,
                number:data.res.rows.item(i).FID});
               }
               else if(type=="test2")
               { 
                  this.items1.push({
                  id:data.res.rows.item(i).BSMID,
                  number:data.res.rows.item(i).FID});
               }
               else if(type=="test3")
               { 
                  this.items2.push({
                  id:data.res.rows.item(i).BSMID,
                  number:data.res.rows.item(i).FID});
               }
           }
           else  if(typename=="监测图斑")
           {
               if(type=="test1")
               { 
                 this.items.push({
                 id:data.res.rows.item(i).JCBH,
                 number:data.res.rows.item(i).TBLX});
               }
               else if(type=="test2")
               { 
                 this.items1.push({
                 id:data.res.rows.item(i).JCBH,
                 number:data.res.rows.item(i).TBLX});
               }
               else if(type=="test3")
               { 
                  this.items2.push({
                  id:data.res.rows.item(i).JCBH,
                  number:data.res.rows.item(i).TBLX});
               }
           }
        
         
        }
      },(error)=>{
        console.log("errorSelect:"+JSON.stringify(error.err));
      }
    );
  
    }



  getData(item){
	 this.navCtrl.push(QuotePage,{id:item.id});
}

}
