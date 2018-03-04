export class Shop {
    _id: string;
    picture: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    latitude: string;
    longitude: string;
    tags: object;

    constructor(options: any) {
        this._id = options._id;
        this.picture = options.picture;
        this.company = options.company;
        this.email = options.email;
        this.phone = options.phone;
        this.address = options.address;
        this.about = options.about;
        this.registered = options.registered;
        this.latitude = options.latitude;
        this.longitude = options.longitude;
        this.tags = options.tags;
    }
}
