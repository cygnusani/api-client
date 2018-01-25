import { Component, OnInit } from '@angular/core';
import {MessageService} from "../service/message/message.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
