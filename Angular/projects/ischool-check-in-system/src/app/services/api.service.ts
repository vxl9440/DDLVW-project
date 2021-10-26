import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advisor } from '../models/advisor';
import { Student } from '../models/student';
import { Reason } from '../models/reason';
import { UserRole } from '../models/user-role';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // https://www.techiediaries.com/angular/angular-httpclient-9-8-service-api-calls-and-fetching-data/

  constructor(private httpClient: HttpClient) { }

  /* -------------------- AUTHORIZATION ENDPOINTS -------------------- */
  public login() {
    window.location.href = `${ environment.apiUrl }/login`;
  }

  public logout() {
    window.location.href = `${ environment.apiUrl }/logout`;
  }

  /* -------------------- REASON ENDPOINTS -------------------- */
  public getAllReasons() {
    return this.httpClient.get<Reason[]>(`${ environment.apiUrl }/reason`);
  }

  public createReason(reason: Reason) {
    return this.httpClient.post(`${ environment.apiUrl }/reason`, reason);
  }

  public updateReason(id: number, reason: Reason) {
    return this.httpClient.put(`${ environment.apiUrl }/reason/${id}`, reason);
  }

  public deleteReason(id: number) {
    return this.httpClient.delete(`${ environment.apiUrl }/reason/${id}`);
  }

  /* -------------------- ADVISOR ENDPOINTS -------------------- */
  public getAllAdvisors() {
    return this.httpClient.get<Advisor[]>(`${ environment.apiUrl }/meetingHost`);
    // This will return an Observable<Advisor[]> that we need to subscribe to, in components, 
    // in order to fetch the customers data from the server.
  }

  public getAdvisorById(id: number) {
    return this.httpClient.get<Advisor>(`${ environment.apiUrl }/meetingHost/${id}`);
  }

  public getAdvisorByUsername(username: string) {
    return this.httpClient.get<Advisor>(`${ environment.apiUrl }/meetingHost?user=${ username }`);
  }

  public createAdvisor(advisor: Advisor) {
    return this.httpClient.post(`${ environment.apiUrl }/meetingHost`, advisor);
  }

  public updateAdvisor(id: number, advisor: Advisor) {
    return this.httpClient.put(`${ environment.apiUrl }/meetingHost/${id}`, advisor);
  }

  public deleteAdvisor(id: number) {
    return this.httpClient.delete(`${ environment.apiUrl }/meetingHost/${id}`);
  }

  /* -------------------- WALK-IN HOURS ENDPOINTS -------------------- */
  public getAdvisorWalkInHours(id: number) {
    return this.httpClient.get<any[]>(`${ environment.apiUrl }/meetingHost/${id}/walkInHours`);
  }

  public createAdvisorWalkInHours(id: number, walkInHours: any) {
    return this.httpClient.post(`${ environment.apiUrl }/meetingHost/${id}/walkInHours`, walkInHours);
  }

  // works weirdly (maybe change server-side?)
  public updateAdvisorWalkInHoursDay(advisorId: number, walkInHoursId: number, walkInHours: any) {
    return this.httpClient.put(`${ environment.apiUrl }/meetingHost/${advisorId}/walkInHours/${walkInHoursId}`, walkInHours);
  }

  // works weirdly (maybe change server-side?)
  public deleteAdvisorWalkInHoursDay(advisorId: number, walkInHoursId: number) {
    return this.httpClient.delete(`${ environment.apiUrl }/meetingHost/${advisorId}/walkInHours/${walkInHoursId}`);
  }

  /* -------------------- STUDENT QUEUE ENDPOINTS -------------------- */
  public getAllStudentQueues() {
    return this.httpClient.get<any[]>(`${ environment.apiUrl }/meetingHost/queue`);
  }

  public addStudentToQueue(id: number, student: Student) {
    return this.httpClient.post(`${ environment.apiUrl }/meetingHost/${id}/queue`, student);
  }

  public moveStudentInQueue(id: number, studentMoveInfo: any) {
    return this.httpClient.put(`${ environment.apiUrl }/meetingHost/${id}/queue`, studentMoveInfo);
  }

  public deleteStudentFromQueue(id: number, studentUsername: any) {
    return this.httpClient.delete(`${ environment.apiUrl }/meetingHost/${id}/queue`, studentUsername);
  }

  /* -------------------- BANNER INFO ENDPOINTS -------------------- */
  public getBannerInfo() {
    return this.httpClient.get<any>(`${ environment.apiUrl }/bannerInfo`);
  }

  public createBannerInfo(bannerInfo: any) {
    return this.httpClient.post(`${ environment.apiUrl }/bannerInfo`, bannerInfo);
  }

  /* -------------------- ANALYTICS ENDPOINTS -------------------- */
  // not implemented yet server-side, likely will not work (10/25/2021)
  public getAnalytics() {
    return this.httpClient.get<any>(`${ environment.apiUrl }/analytics`);
  }
}