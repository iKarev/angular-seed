import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { User } from './user';

import { UsersListService } from '../shared/users-list/users-list.service';

declare const google: any;

/**
 * This class represents the lazy loaded UsersComponent.
 */
@Component({
  selector: 'sd-users-map',
  template: `
    <div id="users-map" class="h_100">Google map</div>
    `
})
export class UsersMapComponent implements OnInit {

  @Input() users: User[];
  @Output() openUser = new EventEmitter<number>();

  private formSent: boolean;
  private userAddingProgress: boolean;
  public map: any;
  public newMarker: any;
  public markers: any[] = [];

  constructor(private usersListService: UsersListService) {}

  makeNewMarker (user: User) {
    let contentString = `<div id="content">${user.name}</div>`;
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    let latLng = {
      lat: parseInt(user.address.geo.lat),
      lng: parseInt(user.address.geo.lng)
    }
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: user.name,
      id: user.id
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.map,marker);
    });
    this.markers.push({marker, infowindow});
  }

  ngOnInit() {
    this.initSubscriptions();
    this.createMap();
  }

  initSubscriptions () {
    // Подписка на информацию о том, добавляется новый пользователь или нет
    this.usersListService.userAddingProgress.subscribe((status: boolean) => {
      this.userAddingProgress = status;
      if (status === false && this.newMarker) // Удаляем маркер
        this.newMarker.setMap(null);
    });
    // Подписка на добавление нового маркера пользователя
    this.usersListService.sendUser.subscribe((user: User) => {
      this.makeNewMarker(user);
    });
    // Подписка на открытие маркера пользователя и закрытие прочих
    this.usersListService.userMarker.subscribe((id: number) => {
      for (let markerObject of this.markers) { // Закрываем все маркеры
        markerObject.infowindow.close(this.map,markerObject.marker);
      }
      let markerObject = this.findMarker(id);
      markerObject.infowindow.open(this.map,markerObject.marker); // Открываем только маркер пользователя
    });
    this.usersListService.deleteUser.subscribe((id: number) => {
      let markerObject = this.findMarker(id);
      if (markerObject) // Удаляем маркер
        markerObject.marker.setMap(null);
    });
  }

  findMarker (id: number) {
    return this.markers.find(markerObject => markerObject.marker.id == id);
  }

  createMap () {let mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("users-map"), mapProp);

    for (let user of this.users) {
      this.makeNewMarker(user);
    }

    let that = this;
    google.maps.event.addListener(this.map, 'click', function(e: any) {
      // Если добавление пользователя не процессе, отменяем новый маркер
      if (!that.userAddingProgress) return;

      let contentString = `<div id="content">New User</div>`;
      let newInfowindow = new google.maps.InfoWindow({
      	content: contentString
      });
      
      if (that.newMarker) // Если маркер нового пользователя уже есть, убираем его
        that.newMarker.setMap(null);

      let lat = e.latLng.lat();
      let lng = e.latLng.lng();
      that.newMarker = new google.maps.Marker({
        position: {lat, lng},
      	map: that.map,
      	title: 'New User'
      });
      newInfowindow.open(this.map,that.newMarker);
      google.maps.event.addListener(that.newMarker, 'click', function() {
      	newInfowindow.open(this.map,that.newMarker);
      });

      that.usersListService.onSendLatLng({lat, lng})
    });
  }

}
