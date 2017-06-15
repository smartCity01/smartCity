import { SecureStorage } from 'ionic-native';
export class AccountService {
    secureStorage: SecureStorage;
    constructor() {
        this.secureStorage = new SecureStorage();
        this.secureStorage.create('my_store')
            .then(
            () => console.log('Storage is ready!'),
            error => console.log(error)
            );
    }

    isLoggedIn(): boolean {
        console.log(this.secureStorage);
        if (this.secureStorage == null) {
            return localStorage.getItem('user-token') != null;
        }
        this.secureStorage.get('user-token').then(
            data => {
                if (data == null) {
                    return false;
                }
                return true;
            },
            error => { return false; }
        );
    }
} 