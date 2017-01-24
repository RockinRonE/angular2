import { Injectable } from '@angular/core'; 

@Injectable()
export class JwtService {

   saveToken(token: String) {
       window.localStorage['jwtToken'] = token
   }

   getToken(): String {
       return window.localStorage['jwtToken'];
   }

   destroyToken() {
       window.localStorage.removeItem('jwtToken'); 
   }


}