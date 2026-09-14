import {Injectable} from "@angular/core";
import {BackendService} from "../backend/backend.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../user/model/user.model";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLogged: boolean = false;
  private readonly BASE_URL = 'http://localhost:8081';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private backendService: BackendService, private router: Router) {
    // extracting user out of localStorage
    const user = localStorage.getItem('currentUser');
    if (user && user.length) {
      // tine current usersul
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject.getValue();
  }
  login(username: string, password: string) {
    return this.backendService.post(`${this.BASE_URL}/login`, { username, password})
      .pipe(map(user => {
        this.isLogged = true;
        this.currentUserSubject.next(user);
        // Save user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  logout(): Observable<void> {
    const user = this.currentUserValue;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Navigate to the login page
    return this.backendService.post(`${this.BASE_URL}/logout`, {username: user?.username})
      .pipe(map(() => {
        this.currentUserSubject.next(null);
        this.isLogged = false;
      }));
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

}
