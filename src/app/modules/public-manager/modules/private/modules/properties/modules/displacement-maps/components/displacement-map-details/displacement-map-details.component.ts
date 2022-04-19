import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { HttpService } from './../../../../../../../../../../utils/services/http/http.service';

@Component({
  selector: 'app-displacement-map-details',
  templateUrl: './displacement-map-details.component.html',
  styleUrls: ['./displacement-map-details.component.sass'],
})
export class DisplacementMapDetailsComponent implements OnInit {
  family!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getFamily();
  }

  getFamily(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.httpService.get(`Family/DisplacementMap/${id}`).subscribe(
      ({ data }) => (this.family = data),
      ({ message }) => {
        Swal.fire(message);
      }
    );
  }
}
