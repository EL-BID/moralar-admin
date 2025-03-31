import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from './../../../../../../../../../../utils/services/http/http.service';
import { RoutesFunction } from 'src/app/utils/functions/routes-function';
import { UserService } from 'src/app/utils/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-displacement-map-details',
  templateUrl: './displacement-map-details.component.html',
  styleUrls: ['./displacement-map-details.component.css'],
})
export class DisplacementMapDetailsComponent implements OnInit {
  family!: any;
  noDisplacementMap = false;
  addresses: marker[] = [];

  lat = -23.5557714;
  lng = -46.6395571;
  zoom = 12;

  loggedUser!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private _router: Router,
    private userService: UserService,
  ) {
    this.userService.user.subscribe( ( user ) => ( this.loggedUser = user ) );
  }

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
        this.addresses.push(oldAddress);
        this.addresses.push(newAddress);
      },
      ({ message }) => {
        this.noDisplacementMap = true;
        Swal.fire('Lembre-se de que o imóvel deve primeiro ser vendido e programado para uma mudança de família.')
      }
    );
  }

  printScreen(): void {
    window.print();
  }
}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
  description: string;
  icon: any;
}
