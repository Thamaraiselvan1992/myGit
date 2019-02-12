import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, userName: 'Thamaraiselvan', email: 'thamarai@gmail.com', password: '123456' },
      { id: 12, userName: 'selvan', email: 'selva@gamil.com', password: '123456' }
    ];
    const menu=[
      {id:1,title:'Home',link:'/home'},
      {id:2,title:'Features',link:'/features'},
      {id:3,title:'Course',link:'/course'},
      {id:4,title:'contacts',link:'/contact'},
      {id:5,title:'login',link:'/login'}

    ];
   const posts=[
      {id:'1',title:'frist Article',author:'lotus',image:'course01.jpg',
      publishdate:'2018-12-27T18:25:43.511Z',excert:'This summary of Article'},
      {id:'2',title:'frist Article',author:'lotus',image:'course02.jpg',
      publishdate:'2018-12-27T18:25:43.511Z',excert:'This summary of Article'},
      {id:'3',title:'frist Article',author:'lotus',image:'course03.jpg'
      ,publishdate:'2018-12-27T18:25:43.511Z',excert:'This summary of Article'},
      {id:'4',title:'frist Article',author:'lotus',image:'course04.jpg',
      publishdate:'2018-12-27T18:25:43.511Z',excert:'This summary of Article'},
      {id:'5',title:'frist Article',author:'lotus',image:'course05.jpg',
      publishdate:'2018-12-27T18:25:43.511Z',excert:'This summary of Article'},
      ];
      return {users, posts,menu};
    }
  
  getToken(user) {
    return 'this is a token';
  }
  
  get (reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'posts') {
      return this.getArticles(reqInfo);
    }
    return undefined;
  }
  
  getArticles(reqInfo: RequestInfo) {
  
    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const collection = reqInfo.collection;
      const id = reqInfo.id;
      const data = id === undefined ? collection : reqInfo.utils.findById(collection, id);
  
      console.log(data);
  
      const options: ResponseOptions = data ?
      {
        body: dataEncapsulation ? { data } : data,
        status: 200
      } :
      {
        body: { error: `Post not found` },
        status: 404
      };
  
      options.statusText = options.status === 200 ? 'ok' : 'Not Found' ;
      options.headers = reqInfo.headers;
      options.url = reqInfo.url;
      return options;
  
  
    });
  }
  post(reqInfo: RequestInfo) {
        if (reqInfo.id === 'login') {
          console.log('from login');
          return reqInfo.utils.createResponse$(() => {
            const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
            const users = reqInfo.collection.find(user => {
              return reqInfo.req['body'].email === user.email && reqInfo.req['body'].password === user.password ;
            });
    
            let responseBody = {};
    
            if (users) {
              responseBody = {
                id: users.id,
               userName: users.userName,
                email: users.email,
                token: this.getToken(users)
              };
            }
    
        const options: ResponseOptions = responseBody ?
          {
            body: dataEncapsulation ? { responseBody } : responseBody,
            status: 200
          } :
          {
            body: { error: `'User' with email='${reqInfo.req['body'].email}' not found` },
            status: 404
          };
        options.statusText = options.status === 200 ? 'ok' : 'Not Found';
        options.headers = reqInfo.headers;
        options.url = reqInfo.url;
        return options;
      });
    }
    else if (reqInfo.id === 'signup') {
      reqInfo.id = null;
      console.log('signup form');
    }
  }
}
