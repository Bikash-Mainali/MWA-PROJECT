import {HttpHeaders} from '@angular/common/http';

export class AppConstants {
  public static headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('xAuthToken')
  });
}
