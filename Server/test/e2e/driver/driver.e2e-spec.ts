import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { DriverModule } from "src/modules/driver/driver.module";

describe("DriverController E2E Test", () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DriverModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should create a driver", async () => {
        const createDriverDto = {
            "experience": "three",
            "userId": "######-4a97-451a-ba5e-648d9ccceb4b",
            "availability": "free",
            "adharNumber": "62812663319453",
            "licenseNumber": "62812056652856",
            "vehicleType": "22",
            "description": {},
            "drivingLicence": "http://muffled-fourths.net"
        };

        const response = await request(app.getHttpServer())
            .post("/api/driver/create/Driver")
            .send(createDriverDto)
            .expect(201);
    });

    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DriverModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get all drivers", async () => {
        const response = await request(app.getHttpServer())
            .get("/api/driver/")
            .expect(200);

    });

    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DriverModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get a driver by ID", async () => {
        const driverId = "";

        const response = await request(app.getHttpServer())
            .get(`/api/driver/${driverId}`)
            .expect(200);
    });

    it("should return 404 for non-existing driver ID", async () => {
        const nonExistingDriverId = "";

        await request(app.getHttpServer())
            .get(`/api/driver/${nonExistingDriverId}`)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toBe(`Driver with ID ${nonExistingDriverId} not found`);
            });
    });

    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DriverModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should delete a driver by ID", async () => {
        const driverId = "";
        const response = await request(app.getHttpServer())
            .delete(`/api/driver/${driverId}`)
            .expect(200);
    });

    //*********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DriverModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should update a driver by ID", async () => {
        const driverId = "abc123";
        const updateDriverDto = {
            "experience": "three",
            "availability": "free",
            "adharNumber": "62812425800724",
            "licenseNumber": "62812499230071",
            "vehicleType": "12",
            "description": {},
            "drivingLicence": "https://aromatic-fang.org"
        };

        const response = await request(app.getHttpServer())
            .put(`/api/driver/Driver/Update/${driverId}`)
            .send(updateDriverDto)
            .expect(200);
    });

    //*********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [DriverModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should get drivers by status", async () => {
        const status = "";

        const response = await request(app.getHttpServer())
            .get(`/api/driver/driverStatus/${status}`)
            .expect(200);
    });

    it("should return 400 for invalid status", async () => {
        const invalidStatus = "";

        await request(app.getHttpServer())
            .get(`/api/driver/driverStatus/${invalidStatus}`)
            .expect(400)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("driver not found");
            });
    });
});