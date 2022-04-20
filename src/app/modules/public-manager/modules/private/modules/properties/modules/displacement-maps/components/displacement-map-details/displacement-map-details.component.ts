import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { HttpService } from './../../../../../../../../../../utils/services/http/http.service';

@Component({
  selector: 'app-displacement-map-details',
  templateUrl: './displacement-map-details.component.html',
  styleUrls: ['./displacement-map-details.component.css'],
})
export class DisplacementMapDetailsComponent implements OnInit {
  family!: any;
  noDisplacementMap = false;
  adresses: marker[] = [];

  lat = -23.5557714;
  lng = -46.6395571;
  zoom = 12;

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
      ({ data }) => {
        this.family = data;
        this.lat = data.destinationLatitude;
        this.lng = data.destinationLongitude;
        const oldAddress: marker = {
          lat: data.originLatitude,
          lng: data.originLongitude,
          description: 'Endereço antigo',
          icon: {
            url: 'assets/icons/old-home.svg',
            scaledSize: { width: 25, height: 25 },
          },
          draggable: false,
        };
        const newAddress: marker = {
          lat: data.destinationLatitude,
          lng: data.destinationLongitude,
          description: 'Endereço novo',
          icon: {
            url: 'assets/icons/new-home.svg',
            scaledSize: { width: 25, height: 25 },
          },
          draggable: false,
        };
        this.adresses.push(oldAddress);
        this.adresses.push(newAddress);
      },
      ({ message }) => {
        this.noDisplacementMap = true;
        Swal.fire(message);
      }
    );
  }
}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
  description: string;
  icon: any;
}
