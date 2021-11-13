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

  public createReason(reason: any) {
    return this.httpClient.post(`${ environment.apiUrl }/reason`, reason);
  }

  public updateReason(id: number, reason: any) {
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

  public createAdvisor(advisor: any) {
    return this.httpClient.post(`${ environment.apiUrl }/meetingHost`, advisor);
  }

  public updateAdvisor(id: number, advisor: any) {
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

  public updateAdvisorWalkInHours(advisorId: number, walkInHours: any) {
    return this.httpClient.put(`${ environment.apiUrl }/meetingHost/${advisorId}/walkInHours`, walkInHours);
  }

  public deleteAdvisorWalkInHours(advisorId: number) {
    return this.httpClient.delete(`${ environment.apiUrl }/meetingHost/${advisorId}/walkInHours`);
  }

  /* -------------------- STUDENT QUEUE ENDPOINTS -------------------- */
  public getAllStudentQueues() {
    return this.httpClient.get<any[]>(`${ environment.apiUrl }/meetingHost/queue`);
  }

  /*public addStudentToQueue(id: number, student: Student) {
    return this.httpClient.post(`${ environment.apiUrl }/meetingHost/${id}/queue`, student);
  }*/

  public moveStudentInQueue(id: number, studentMoveInfo: any) {
    return this.httpClient.put(`${ environment.apiUrl }/meetingHost/${id}/queue`, studentMoveInfo);
  }

  public deleteStudentFromQueue(id: number, studentUsername: any) {
    return this.httpClient.delete(`${ environment.apiUrl }/meetingHost/${id}/queue`, studentUsername);
  }

  /* -------------------- REGISTRATION ENDPOINTS -------------------- */
  public checkInStudent(student: any) {
    return this.httpClient.post(`${ environment.apiUrl }/registration/checkin`, student);
  }

  /* -------------------- BANNER INFO ENDPOINTS -------------------- */
  /*public getBannerInfo() {
    return this.httpClient.get<any>(`${ environment.apiUrl }/bannerInfo`);
  }*/

  /*public createBannerInfo(bannerInfo: any) {
    return this.httpClient.post(`${ environment.apiUrl }/bannerInfo`, bannerInfo);
  }*/

  public getAnnouncements() {
    return this.httpClient.get<any>(`${ environment.apiUrl }/announcements`);
  }

  public createAnnouncements(files: any) {
    return this.httpClient.post(`${ environment.apiUrl }/announcements`, files);
  }

  public deleteAnnouncements() {
    return this.httpClient.delete(`${ environment.apiUrl }/announcements/all`);
  }

  /* -------------------- ANALYTICS ENDPOINTS -------------------- */
  getAnalyticsDownload(timeReq) {
    return this.httpClient.get<any>(`${ environment.apiUrl }/analytics/download`, timeReq);
  }
  
  public getAnalyticsAvgWaitingTime(timeReq: any) {
    return this.httpClient.get<any>(`${ environment.apiUrl }/analytics/avgWaitingTime`, timeReq);
  }

  public getAnalyticsAvgStudentPerDay(timeReq: any) {
    return this.httpClient.get<any>(`${ environment.apiUrl }/analytics/avgStudentPerDay`, timeReq);
  }

  public getAnalyticsMostCommonReason(timeReq: any) {
    return this.httpClient.get<any>(`${ environment.apiUrl }/analytics/mostCommonReason`, timeReq);
  }
}