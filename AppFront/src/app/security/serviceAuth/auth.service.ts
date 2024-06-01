import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {AppUser} from "../bean/app-user.model";
import {isPlatformBrowser} from "@angular/common";
import {Client} from "../../sahred/model/communModel/client.model";
import {AgenceAppartement} from "../../sahred/model/appartemetModel/AgenceAppartement.model";
import {AgenceLocation} from "../../sahred/model/voitureModel/agence-location.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  notifications:any[]=[];

  logo:any;
  isAuthService : boolean =false;
  roles : any;
  username : any;
  accessToken! : any ;

  accessTokenEz! : any ;

  client:Client=new Client();

  propAppartement:AgenceAppartement=new AgenceAppartement();

  agenceLocation:AgenceLocation=new AgenceLocation();

  //soient user | prop | agence
  dataUtilisateur:any;

  isUser: boolean = true;
  isPropraitaire!: boolean;
  isAgenceLocation!: boolean;


  // refrechToken! :any;
  constructor(private http: HttpClient,private router:Router,@Inject(PLATFORM_ID) private platformId: Object) { }

  login(username: string, password: string): Observable<any> {
    const options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post('http://localhost:8085/login', params, options)
  }

  loadProfile(data: any) {
    this.isAuthService=true
    this.accessToken=data['accessToken'];
    this.accessTokenEz=this.accessToken

    // this.refrechToken=data['refreshToken'];

    // @ts-ignore
    let decodejwt = jwtDecode(this.accessToken) as { sub: string, authority: string };
    this.username=decodejwt.sub;
    this.roles=decodejwt.authority

    if(this.roles.includes("USER") && !this.roles.includes("ADMIN") && !this.roles.includes("MANAGER-VOI") && !this.roles.includes("MANAGER-APT")){
      this.isUser=true
      this.isAgenceLocation=false;
      this.isPropraitaire=true;
    }
    else if(this.roles.includes("USER") && !this.roles.includes("ADMIN") && this.roles.includes("MANAGER-VOI") && !this.roles.includes("MANAGER-APT")) {
      this.isUser=false
      this.isAgenceLocation=true;
      this.isPropraitaire=false;
    }
    else if(this.roles.includes("USER") && !this.roles.includes("ADMIN") && !this.roles.includes("MANAGER-VOI") && this.roles.includes("MANAGER-APT")) {
      this.isUser=false
      this.isAgenceLocation=false;
      this.isPropraitaire=true;
    }else {
      this.isUser=false;
      this.isAgenceLocation=false;
      this.isPropraitaire=false;
    }

    // @ts-ignore
    this.getByUsername(this.username).subscribe(
      {next:data=>{
          console.log(data)
          this.dataUtilisateur=data
          console.log("=========================================")
          console.log(this.dataUtilisateur)
          console.log("=========================================")
        },
        error:err => {console.log("error")}
      }
    )

    window.localStorage.setItem("jwt-token-access",this.accessToken);
    // window.localStorage.setItem("jwt-token-ref",this.refrechToken);
  }

  logout() {
    this.router.navigateByUrl("/home")
    this.isAuthService=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token-access")
    // this.router.navigateByUrl("/login")
    location.reload();

  }





  loadJwtTokenFromLocalStrage() {
    if (isPlatformBrowser(this.platformId)) {
      let tokenAccess=window.localStorage.getItem("jwt-token-access");
      // let tokenRefrech=window.localStorage.getItem("jwt-token-ref");
      if(tokenAccess ){
        this.loadProfile({"accessToken":tokenAccess});

          this.router.navigateByUrl("/home")
      }
    }
  }

  // loadJwtTokenFromLocalStrage() {
  //   let tokenAccess=window.localStorage.getItem("jwt-token-access");
  //   // let tokenRefrech=window.localStorage.getItem("jwt-token-ref");
  //   console.log("token localStorage")
  //   if(tokenAccess ){
  //     this.loadProfile({"accessToken":tokenAccess});
  //     this.router.navigateByUrl("/admin")
  //
  //   }
  // }

  creeCompte1(client:Client){
    return  this.http.post<number>("http://localhost:8085/api/client/",client)
  }

  creeCompte2(propAppartement:AgenceAppartement){
    return  this.http.post<number>("http://localhost:8085/api/agenceAppartement/",propAppartement)
  }

  creeCompte3(agenceLocation:AgenceLocation){
    return  this.http.post<number>("http://localhost:8085/api/agenceLocation/",agenceLocation)
  }

  public getByUsername(username:string):Observable<any> | null{
    if(this.isUser){
      return this.http.get<any>(`http://localhost:8085/api/client/username/${username}`);
    }
    else if(this.isPropraitaire){
      return this.http.get<any>(`http://localhost:8085/api/agenceAppartement/username/${username}`);
    }
    else if(this.isAgenceLocation){
      console.log("hello word")
      return this.http.get<any>(`http://localhost:8085/api/agenceLocation/username/${username}`);
    }
    else {
      return null;
    }
  }




  viderClient(){
    this.client.cin="";
    this.client.prenom="";
    this.client.nom="";
    this.client.numTeleClient="";
    this.client.username_Client="";
    this.client.password_Client="";
    this.client.email_Client="";
  }

  viderProp(){
    this.propAppartement.iceAgApp= 0,
      this.propAppartement.raisonSocialAg= "",
      this.propAppartement.numTele= "",
      this.propAppartement.email= "",
      this.propAppartement.adresse= "",
      this.propAppartement.numCompteBkAgApp= 0,
      this.propAppartement.ribAgenceApp= 0,
      this.propAppartement.RCAgApp= 0,
      this.propAppartement.username="",
      this.propAppartement.password=""
  }

  viderAgence(){
    this.agenceLocation.iceAgLoc=0;
    this.agenceLocation.raisonSocialAg="";
    this.agenceLocation.adresse="";
    this.agenceLocation.numTelephone="";
    this.agenceLocation.numCompteBkAgLoc=0;
    this.agenceLocation.ribAgenceLoc=0;
    this.agenceLocation.usernameAgenceLoc="";
    this.agenceLocation.password="";
    this.agenceLocation.RCAgLoc=0;
  }


  getNotification(iceAgApp:number):Observable<any>{
    return  this.http.get( `http://localhost:8085/api/notification/proprAppartement/${iceAgApp}`)
  }
}
