
import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { VehicleRepositoryModule } from "src/modules/vehicle/repository/vehicle.repository.module";
import request from "supertest";
import { VehicleModule } from "src/modules/vehicle/vehicle.module";

describe("BookingController E2E Test", () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should create a vehicle", async () => {
        const createVehicleDto = {
            "vehicleName": "insubstantial-siding.net",
            "vehicleNumber": "cyrxyz3a",
            "modelNumber": "2333",
            "vehiclePictures": "http://difficult-dessert.net",
            "numberPlatePic": "https://stale-mansard.name",
            "vehicleType": "four",
            "seaters": 78,
            "ownerId": "97j0jwv547n2bgbc9aws",
            "registrationNumber": "thsj3ipib7q2dvsv09mu",
            "features": "ppotysvqogczupnmgbsk",
            "kmPrice": 10.5
        };

        const response = await request(app.getHttpServer())
            .post("/api/vehicle/create/vehicle")
            .send(createVehicleDto)
            .expect(201);
    });

    //***************************************//

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should update a vehicle by ID", async () => {
        const vehicleId = "";
        const updateVehicleDto = {
            "vehicleName": "knowing-wax.org",
            "vehicleNumber": "2oy5pzly",
            "modelNumber": "7818",
            "vehiclePictures": "http://infinite-insight.net",
            "numberPlatePic": "https://vain-algorithm.info",
            "vehicleType": "four",
            "seaters": 31,
            "ownerId": "3wrtg721ytpzdicou66f",
            "registrationNumber": "vjewo2mfguhtueduk8n3",
            "features": "tzgwrakqpxjaouawxpeq",
            "kmPrice": 10.5
        };

        const response = await request(app.getHttpServer())
            .put(`/api/vehicle/Vehicle/Update/${vehicleId}`)
            .send(updateVehicleDto)
            .expect(200);
    });

    //***************************************//

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get vehicles by status", async () => {
        const status = ""; 

        const response = await request(app.getHttpServer())
            .get(`/api/vehicle/vehicleStatus/${status}`)
            .expect(200);
    });

     //***************************************//

     beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get a vehicle by ID", async () => {
        const vehicleId = "";

        const response = await request(app.getHttpServer())
            .get(`/api/vehicle/vehicle/${vehicleId}`)
            .expect(200);
        
        });

    it("should return 404 for non-existing vehicle ID", async () => {
        const nonExistingVehicleId = "";

        await request(app.getHttpServer())
            .get(`/api/vehicle/vehicle/${nonExistingVehicleId}`)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("vehicle not found");
            });
    });

    //***************************************//

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get vehicles by owner ID", async () => {
        const ownerId = "";

        const response = await request(app.getHttpServer())
            .get(`/api/vehicle/owner/${ownerId}`)
            .expect(200);
    });

    it("should return 404 for non-existing owner ID", async () => {
        const nonExistingOwnerId = "";

        await request(app.getHttpServer())
            .get(`/api/vehicle/owner/${nonExistingOwnerId}`)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("Vehicles not found for owner");
            });
    });

    //***************************************//

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should update vehicle availability", async () => {
        const vehicleId = "";
        const availability = true;

        const response = await request(app.getHttpServer())
            .patch(`/api/vehicle/update/availability/${vehicleId}/${availability}`)
            .expect(200);
    });

    it("should handle internal server error", async () => {
        const invalidVehicleId = "invalidVehicleId";
        const availability = true;

        await request(app.getHttpServer())
            .patch(`/api/vehicle/update/availability/${invalidVehicleId}/${availability}`)
            .expect(500)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("http.serverError.internalServerError");
            });
    });

    //***************************************//

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should update vehicle isActive status", async () => {
        const vehicleId = "";
        const isActive = "";

        const response = await request(app.getHttpServer())
            .patch(`/api/vehicle/update/Active/${vehicleId}/${isActive}`)
            .expect(200);
    });

    //***************************************//

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [VehicleModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get vehicles by activity status", async () => {
        const isActive = true;

        const response = await request(app.getHttpServer())
            .get(`/api/vehicle/vehicles/Activity/${isActive}`)
            .expect(200);
    });

    //***************************************//
});