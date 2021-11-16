import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {


  dateRangeForm = this.formBuilder.group({
    timeStart: '',
    timeEnd: '',
  });

  constructor(private activatedRoute: ActivatedRoute, 
              private authService: AuthService, 
              private apiService: ApiService, 
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  getData() {

  }

}
