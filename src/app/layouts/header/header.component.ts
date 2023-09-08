import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {IAuth} from "../../interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: IAuth

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getAuthUser().subscribe(value => this.user = value)
  }
}
