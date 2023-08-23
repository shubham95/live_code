'use client'
 import { initializeApp } from "firebase/app";
 import { getDatabase, ref, push, set, onValue } from "firebase/database";
 import AceEditor from "react-ace";
 import "ace-builds/src-noconflict/mode-java";
 import "ace-builds/src-noconflict/theme-github";
 import "ace-builds/src-noconflict/ext-language_tools";
 import { useEffect, useState } from "react";
 
 export default function Home() {
   const[code, setCode]=useState("");
 
 const firebaseConfig = {
     apiKey: "AIzaSyDBK_DQQIbuMCo6YGd_8l4Cr2Cn2uRUFLg",
     authDomain: "zetone-bd7dc.firebaseapp.com",
     databaseURL: "https://zetone-bd7dc-default-rtdb.firebaseio.com/",
     projectId: "zetone-bd7dc",
     storageBucket: "zetone-bd7dc.appspot.com",
     messagingSenderId: "13708187855",
     appId: "1:13708187855:web:e989b75e4637cdc3e5bfba",
     measurementId: "G-TTKNCYBMDB"
 }
 
   // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 
 
 // Initialize Realtime Database and get a reference to the service
 const database = getDatabase(app);
 let isProcessingRead =false;
 let isProcessingWrite =false;
   useEffect(()=>{
     const starCountRef = ref(database, 'users/' + "negan/code");
 
     console.log("sadad");
     
     onValue(starCountRef, (snapshot) => {
       if(!isProcessingRead){
           isProcessingRead=true;
         console.log("her",snapshot);
         console.log("her",snapshot.val());
 
         const data = JSON.parse(snapshot.val());
         setCode(data);
         setTimeout(()=>{isProcessingRead=false}, 1000);
       }
     })
   },[]);
 
   function onChange(newValue:any) {
 
     if(!isProcessingWrite){
       console.log("change", newValue);
       set(ref(database, 'users/' + "negan"), {
         code:JSON.stringify(newValue)
       }).then((e)=>{console.log("here",e)})
       .catch((e)=>{console.log("there",e)});
       setTimeout(()=>{isProcessingWrite=false}, 1000);
     }
   }
 
   return (
     <div className="w-full h-full">
       <AceEditor
         className=''
         placeholder="Write your solution here!"
         fontSize={24}
         height="100vh"
         width="100vh"
         mode="java"
         theme="github"
         value={code}
         onChange={onChange}
         name="UNIQUE_ID_OF_DIV"
         editorProps={{ $blockScrolling: true }}
       />
     </div>
   )
 }