import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place!: Place;
  placeId!: string;

  constructor(
    private route: ActivatedRoute,
    private navctrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navctrl.navigateBack(['/places/tabs/offers']);
        return;
      }

      //     this.placeId = paramMap.get('placeId') ?? this.placeId;
      //     // console.log(this.placesService.getPlace(paramMap.get('placeId')));
      //     this.place = this.placesService.getPlace(this.placeId);
      //   });
      // }
      const placeId = paramMap.get('placeId');

      if (!placeId) {
        console.error('No placeId provided');
        return;
      }

      this.placesService.getPlace(placeId).subscribe((place) => {
        if (!place) {
          console.error(`Place with id ${placeId} not found`);
          return;
        }

        this.place = place;
      });
    });
  }
}
