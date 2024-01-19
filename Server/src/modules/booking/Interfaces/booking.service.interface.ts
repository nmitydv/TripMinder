import { IDatabaseCreateOptions, IDatabaseFindAllOptions, IDatabaseFindOneOptions } from "src/common/database/interfaces/database.interface";
import { BookingDoc } from "../repositories/entities/booking.entity";
import { Bookingcreatedto } from "../dto/booking.create.dto";






export interface IbookingService {


    createBooking(
        createbookingDto: Bookingcreatedto,
        options?: IDatabaseCreateOptions
    ): Promise<BookingDoc>;


    findOne<T>(userId: string ,  options?: IDatabaseFindOneOptions): Promise<T>

    findBookingbystatus<bookingDoc>(status: string,options?: IDatabaseFindAllOptions ): Promise<bookingDoc[]>


    }