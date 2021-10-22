import { useEffect, useState  } from 'react';
import { api  } from '../../services/api';
import style from './style.module.scss';


import logoimg from '../../assets/logo.svg';

type Message = {
   id: strind;
   text: string;
   user: {
     name: string;
     avatar_url: string;
   }
}

export function MessageList(){
 const [messages, setMessages]= useState<Message[]>([]);      

  useEffect(()=>{
	api.get<Message[]>('last').then(response => {
      	  setMessages(response.data);				   
  	});	
  },[]);    
  return(
    <div className={style.messageListWrapper}>
    	 <img src={logoimg} alt="dowhile é a imagem da logo"/>
	 
	 <ul className={style.messaList}>
	     
	 {messages.map(message =>{
	    return(
	      	 <li  key={message.id} className={style.message}>
	     	 <p className={style.messageContent}>{message.text}</p>
		 <div className={style.messageUser}>
		      <div className={style.userImage}>
		      	   <img src={message.user.avatar_url} alt={message.user.name}/>
		      </div>	   
		      <span>{message.user.name}</span>
		 </div>
	     </li>
	    );
	 })}	       
	 </ul>
    </div>
  );
}