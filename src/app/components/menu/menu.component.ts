import { Component, OnInit } from '@angular/core';
import {AppUserService} from "../../services/app-user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private appUserService : AppUserService) { }

  ngOnInit(): void {
  }

  getLoggedUser(){
    return this.appUserService.getCurrentUser();
  }

}
