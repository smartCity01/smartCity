import { SecureStorage } from 'ionic-native';
export class AccountService {
    constructor(private secureStorage: SecureStorage) { }

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