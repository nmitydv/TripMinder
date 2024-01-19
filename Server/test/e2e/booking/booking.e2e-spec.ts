import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { BookingModule } from "src/modules/booking/booking.module";

describe("BookingController E2E Test", () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should create a booking ",() => {
        return request(app.getHttpServer())
            .post('V1/booking/create')
            .send({
                "userId": "826lu292pth1ho5",
                "vehicleDriverId": "smrewhylzoded9w",
                "pickupLocation": "Burlington",
                "dropLocation": "Urbana",
                "startDate": "2023-11-15T12:26:04.417Z",
                "endDate": "2023-12-09T10:46:09.393Z",
                "price": 377
            })
            .expect(201);
    })

    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("should get a booking by userId ID", async () => {
        const createBookingResponse = await request(app.getHttpServer())
            .get('/V1/booking/book/:id')
            .expect(201);

        const bookingId = createBookingResponse.body.id;
        const getBookingResponse = await request(app.getHttpServer())
            .get(`/V1/booking/${bookingId}`)
            .expect(200);
    });

    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("should get a booking by VehicleDriver ID", async () => {
        const createBookingResponse = await request(app.getHttpServer())
            .get('/V1/booking/bookings/:userId')
            .expect(201);

        const bookingId = createBookingResponse.body.id;
        const getBookingResponse = await request(app.getHttpServer())
            .get(`/V1/booking/${bookingId}`)
            .expect(200);

    });
    //********************************
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should create a update ",() => {
        return request(app.getHttpServer())
            .put('V1/booking/upadate')
            .send({
                "userId": "826lu292pth1ho5",
                "vehicleDriverId": "smrewhylzoded9w",
                "pickupLocation": "Burlington",
                "dropLocation": "Urbana",
                "startDate": "2023-11-15T12:26:04.417Z",
                "endDate": "2023-12-09T10:46:09.393Z",
                "price": 377
            })
            .expect(201);
    })
    //********************************   

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get bookings by booking status", async () => {
        const bookingStatus = "V1/booking/bookingStatus"; 

        const response = await request(app.getHttpServer())
            .get(`/api/bookingStatus/${bookingStatus}`)
            .expect(200);
    });
    it("should return 404 for non-existing booking status", async () => {
        const nonExistingBookingStatus = "nonExistingStatus";

        await request(app.getHttpServer())
            .get(`/api/bookingStatus/${nonExistingBookingStatus}`)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toBe(`bookings not found bookingStatus: ${nonExistingBookingStatus}`);
            });
    });

    it("should return 400 for bad request", async () => {
        const invalidBookingStatus = "invalidBookingStatus";

        await request(app.getHttpServer())
            .get(`/api/bookingStatus/${invalidBookingStatus}`)
            .expect(400)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("bookings not found");
            });
    });
    //********************************
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get bookings by booking request", async () => {
        const bookingRequest = "V1/booking/bookingRequest";

        const response = await request(app.getHttpServer())
            .get(`/api/bookingRequest/${bookingRequest}`)
            .expect(200);
    });

    it("should return 404 for non-existing booking request", async () => {
        const nonExistingBookingRequest = "nonExistingRequest";

        await request(app.getHttpServer())
            .get(`/api/bookingRequest/${nonExistingBookingRequest}`)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toBe(`bookings not found BookingRequest: ${nonExistingBookingRequest}`);
            });
    });

    it("should return 400 for bad request", async () => {
        const invalidBookingRequest = "invalidBookingRequest";

        await request(app.getHttpServer())
            .get(`/api/bookingRequest/${invalidBookingRequest}`)
            .expect(400)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("bookings not found");
            });
    });
    //********************************
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get bookings by booking status by user ID", async () => {
        const bookingStatus = ""; 
        const userId = "826lu292pth1ho5";

        const response = await request(app.getHttpServer())
            .get(`V1/booking/bookingStatusByUserId"${bookingStatus}/${userId}`)
            .expect(200);
    });

    it("should return 404 for non-existing booking status", async () => {
        const nonExistingBookingStatus = "";
        const userId = "826lu292pth1ho5"; 

        await request(app.getHttpServer())
            .get(`V1/booking/bookingStatusByUserId"${nonExistingBookingStatus}/${userId}`)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toBe(`bookings not found status: ${nonExistingBookingStatus}`);
            });
    });

    it("should return 400 for bad request", async () => {
        const invalidBookingStatus = "";
        const userId = "826lu292pth1ho5"; 

        await request(app.getHttpServer())
            .get(`V1/booking/bookingStatusByUserId"${invalidBookingStatus}/${userId}`)
            .expect(400)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("bookings not found");
            });
    
})
    //********************************
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [BookingModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get bookings by booking request by user ID", async () => {
        const bookingRequest = "";
        const userId = "826lu292pth1ho5";
        const response = await request(app.getHttpServer())
        .get(`V1/booking/bookingRequestByUserId"${bookingRequest}/${userId}`)
        .expect(200);
    })  
    it("should return 404 for non-existing booking request", async () => {
        const nonExistingBookingRequest = "";
        const userId = "826lu292pth1ho5";
        await request(app.getHttpServer())
        .get(`V1/booking/bookingRequestByUserId"${nonExistingBookingRequest}/${userId}`)
        .expect(404)
        .expect((response) => {
            const error = response.body.message;
            expect(error).toBe(`bookings not found request: ${nonExistingBookingRequest}`);
        });
    })
    it("should return 400 for bad request", async () => {
        const invalidBookingRequest = "";
        const userId = "826lu292pth1ho5";

        await request(app.getHttpServer())
            .get(`V1/booking/bookingRequestByUserId"${invalidBookingRequest}/${userId}`)
            .expect(400)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("bookings not found");
            });
        })  
        //******************************** 
        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [BookingModule], 
            }).compile();
            app = moduleFixture.createNestApplication();
            await app.init();
        });
    
        it("should get bookings by booking status by vehicle driver ID", async () => {
            const bookingStatus = "";
            const vehicleDriverId = "";
    
            const response = await request(app.getHttpServer())
                .get(`/api/bookingStatusByvehicleDriverId/${bookingStatus}/${vehicleDriverId}`)
                .expect(200);
    
        });
    
        it("should return 404 for non-existing booking status by vehicle driver ID", async () => {
            const nonExistingBookingStatus = "";
            const nonExistingVehicleDriverId = "";
    
            await request(app.getHttpServer())
                .get(`/api/bookingStatusByvehicleDriverId/${nonExistingBookingStatus}/${nonExistingVehicleDriverId}`)
                .expect(404)
                .expect((response) => {
                    const error = response.body.message;
                    expect(error).toBe(`bookings not found bookingStatus: ${nonExistingBookingStatus} and vehicleDriverId: ${nonExistingVehicleDriverId}`);
                });
        });
    
        it("should return 400 for bad request", async () => {
            const invalidBookingStatus = "";
            const invalidVehicleDriverId = "";
    
            await request(app.getHttpServer())
                .get(`/api/bookingStatusByvehicleDriverId/${invalidBookingStatus}/${invalidVehicleDriverId}`)
                .expect(400)
                .expect((response) => {
                    const error = response.body.message;
                    expect(error).toContain("bookings not found");
                });
        });
        //********************************
        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [BookingModule], 
            }).compile();
            app = moduleFixture.createNestApplication();
            await app.init();
        });
        it("should get bookings by booking request and vehicle driver ID", async () => {
            const bookingRequest = ""; 
            const vehicleDriverId = "your-vehicle-driver-id";
    
            const response = await request(app.getHttpServer())
                .get(`/api/bookingRequestByvehicleDriverId/${bookingRequest}/${vehicleDriverId}`)
                .expect(200);
    
        });
    
        it("should return 404 for non-existing booking request or vehicle driver ID", async () => {
            const nonExistingBookingRequest = "";
            const nonExistingVehicleDriverId = "";
    
            await request(app.getHttpServer())
                .get(`/api/bookingRequestByvehicleDriverId/${nonExistingBookingRequest}/${nonExistingVehicleDriverId}`)
                .expect(404)
                .expect((response) => {
                    const error = response.body.message;
                    expect(error).toBe(`bookings not found bookingRequest: ${nonExistingBookingRequest} and vehicleDriverId: ${nonExistingVehicleDriverId}`);
                });
        });
    
        it("should return 400 for bad request", async () => {
            const invalidBookingRequest = "";
            const invalidVehicleDriverId = "";
    
            await request(app.getHttpServer())
                .get(`/api/bookingRequestByvehicleDriverId/${invalidBookingRequest}/${invalidVehicleDriverId}`)
                .expect(400)
                .expect((response) => {
                    const error = response.body.message;
                    expect(error).toContain("bookings not found");
                });
        });
        //********************************
        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [BookingModule], 
            }).compile();
            app = moduleFixture.createNestApplication();
            await app.init();
        });
        it("should get bookings by status", async () => {
            const status = ""; 
            const response = await request(app.getHttpServer())
                .get(`/api/Booking/get/${status}`)
                .expect(200);
        });
    
        it("should return 404 for non-existing status", async () => {
            const nonExistingStatus = "";
    
            await request(app.getHttpServer())
                .get(`/api/Booking/get/${nonExistingStatus}`)
                .expect(404)
                .expect((response) => {
                    const error = response.body.message;
                    expect(error).toBe(`bookings not found for ${nonExistingStatus}`);
                });
        });

        //********************************
        beforeAll(async () => {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [BookingModule], 
            }).compile();
            app = moduleFixture.createNestApplication();
            await app.init();
        });
        it("should delete a booking by ID", async () => {
            const bookingId = "";
    
            const response = await request(app.getHttpServer())
                .delete(`/api/Booking/delete/${bookingId}`)
                .expect(200);
        });
    
        it("should return 404 for non-existing booking ID", async () => {
            const nonExistingBookingId = "nonExistingId";
    
            await request(app.getHttpServer())
                .delete(`/api/Booking/delete/${nonExistingBookingId}`)
                .expect(404)
                .expect((response) => {
                    const error = response.body.message;
                    expect(error).toBe(`Booking with ID ${nonExistingBookingId} not found`);
                });
        });
})