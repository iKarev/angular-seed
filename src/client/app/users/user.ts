export class User {
    constructor (
        public name: string,
        public email: string,
        public address?: UserAddress, 
        public company?: UserCompany,
        public id?: number,
        public phone?: string,
        public username?: string,
        public website?: string,

    ) {}
}
class UserAddress {
    constructor (
        public geo: LatLng,
        public city?: string, 
        public street?: string,
        public suite?: string,
        public zipcode?: string,
    ) {}
}
export class LatLng {
    constructor (
        public lat: string,
        public lng: string
    ) {}
}
class UserCompany {
    constructor (
        public name: string,
        public bs?: string, 
        public catchPhrase?: string,
    ) {}
}