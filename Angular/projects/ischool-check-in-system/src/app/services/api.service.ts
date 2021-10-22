import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advisor } from '../models/advisor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // https://www.techiediaries.com/angular/angular-httpclient-9-8-service-api-calls-and-fetching-data/

  apiUrl: string = 'http://raspberrypi/api';

  constructor(private httpClient: HttpClient) { }

  public login() {
    window.location.href = `${ this.apiUrl }/login`;
  }

  public createAdvisor(advisor: Advisor) {}

  public getAdvisorById(id: number) {}

  public getAdvisorByUsername(username: string) {
    return this.httpClient.get<Advisor>(`${ this.apiUrl }/meetingHost?user=${ username }`);
  }

  public getAllAdvisors() {
    return this.httpClient.get<Advisor[]>(`${ this.apiUrl }/meetingHost`);
    // This will return an Observable<Advisor[]> that we need to subscribe to, in components, 
    // in order to fetch the customers data from the server.
  }

  public deleteAdvisor(advisor: Advisor) {}

  public updateAdvisor(advisor: Advisor) {}
}
