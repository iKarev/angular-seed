import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';  // for debugging
import { User, LatLng } from '../../users/user';

const fakeUrl = 'https://jsonplaceholder.typicode.com/users';
/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class UsersListService {

  public userMarker = new EventEmitter<number>(); // Используется для открытия нужного маркера на карте
  public deleteUser = new EventEmitter<number>(); // Отправка информации по пользователю
  public sendUser = new EventEmitter<User>(); // Отправка информации по пользователю
  public sendLatLng = new EventEmitter<LatLng>(); // Отправка информации по координатам
  public userAddingProgress = new EventEmitter<boolean>(); // Используется для определения, находимся ли мы в состоянии добавления нового пользователя
  public usersList: User[] = [];
  private requiredUserId: number;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<User[]> {
    return this.http.get(fakeUrl).map((res: Response) => {
      this.usersList = res.json();
      if (this.requiredUserId) // Если компонент пользователя ждет данные - отправляем
        this.sendUser.emit(this.findUser(this.requiredUserId));
      return this.usersList;
    }).catch(this.handleError);
  }

  getUsersLength(): number {
    if (this.usersList) return this.usersList.length;
    else return 0;
  }

  findUser(id: number) {
    return this.usersList.find(user => {return user.id == id});
  }
  setRequiredUser(id: number) {
    this.requiredUserId = id;
  }

  updateUser(user: User) {
    console.log(user);
    if (user.id) {
      return this.http.put(fakeUrl + '/' + user.id, user).map((res: Response) => res = res.json()).catch(this.handleError);
    } else {
      return this.http.post(fakeUrl, user).map((res: Response) => {
        let user = res.json();
        this.usersList.push(user);
        this.onSendUserToComponent(user)
      }).catch(this.handleError);
    }
  }
  onSendUserToComponent(user: User) {
    this.sendUser.emit(user);
  }
  onSendLatLng (latLng: LatLng) {
    this.sendLatLng.emit(latLng);
  }
  openUserMarker (id: number) {
    this.userMarker.emit(id);
  }

  onChangeUserAddingProgress (status: boolean) {
    this.userAddingProgress.emit(status);
  }

  onDeleteUser(id: number) {
    let that = this;
    // let user = this.findUser(id);
    return new Promise((resolve) => {
      if (id < 11) {
        this.http.delete(fakeUrl + '/' + id).subscribe(res => {
          if (res.status == 200) 
            deleteUser(res.ok);
        });
      } else 
        deleteUser(true);
      
      function deleteUser (status: boolean) {
        if (status === true) {
          let index = that.usersList.findIndex((user: User) => {return user.id == id});
          that.usersList.splice(index,1);
          that.deleteUser.emit(id);
        }
        resolve(status);
      }
      // function returnTarget (status: boolean) {
      //   resolve(status);
      // }
    })

  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

