import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {

  @Input() country?: Country;
  @Output() onclick = new EventEmitter<Country>();

  show() {
    this.onclick.emit(this.country);
  }

}
