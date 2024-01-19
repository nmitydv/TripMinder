import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { UserModule } from "src/modules/user/user.module";

describe("UserController E2E Test", () => {
    let app: INestApplication;
    //user public controller testing
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should create a new user", async () => {
        const createUserDto = {
            "name": "Tevin.Hessel",
            "email": "Pauline_OKon96@hotmail.com",
            "location": "Arlington",
            "gender": "male",
            "mobileNumber": "62812903586809",
            "role": "User",
            "age": 87,
            "profilePicture": "http://flaky-aftershave.org"
        };

        const response = await request(app.getHttpServer())
            .post("/api/user/create/User")
            .send(createUserDto)
            .expect(200);
    });

    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should delete the authenticated user", async () => {
        const authToken = "";

        const response = await request(app.getHttpServer())
            .delete("/api/user/delete")
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);
    });


    //********************************

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should sign in a user by email", async () => {
        const userEmail = "test@example.com";

        const response = await request(app.getHttpServer())
            .get(`/api/user/User/email/${userEmail}`)
            .expect(200);
    });
    //********************************
    // user controller testings
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it("should update a user by userId", async () => {
        const userId = "";
        const updatePayload = {
            "name": "Alicia_Green",
            "email": "Keenan.Schuster49@yahoo.com",
            "location": "East Helene",
            "gender": "male",
            "mobileNumber": "62812084470553",
            "age": 31,
            "profilePicture": "https://scratchy-epic.info"
        };

        const response = await request(app.getHttpServer())
            .put(`/api/user/User/Update/${userId}`)
            .send(updatePayload)
            .expect(200);
    });

    it("should handle user not found", async () => {
        const nonExistentUserId = "nonexistent_userId";
        const updatePayload = {
            "name": "Alicia_Green",
            "email": "Keenan.Schuster49@yahoo.com",
            "location": "East Helene",
            "gender": "male",
            "mobileNumber": "62812084470553",
            "age": 31,
            "profilePicture": "https://scratchy-epic.info"
        };

        await request(app.getHttpServer())
            .put(`/api/user/User/Update/${nonExistentUserId}`)
            .send(updatePayload)
            .expect(404)
            .expect((response) => {
                const error = response.body.message;
                expect(error).toContain("User not found");
            });
    });

    //********************************
    // user admin controller testings
    
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('/should get all user/:id', async () => {
        const userId = '';

        const response = await request(app.getHttpServer())
          .get(`/user/${userId}`)
          .expect(200);  
    
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('userId', userId); 
      });

      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    it('/PATCH update/:vehicleId/:isApproved', async () => {
        const mockVehicleId = '';
        const mockIsApproved = '';
    
        const response = await request(app.getHttpServer())
          .patch(`/update/${mockVehicleId}/${mockIsApproved}`)
          .expect(200);

        expect(response.body).toEqual
      });

    //********************************
      // admin controller testing
    
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
      it('/GET get/Admin/:adminId', async () => {
        const mockAdminId = '';

        const response = await request(app.getHttpServer())
          .get(`/admin/get/Admin/${mockAdminId}`)
          .set('Authorization', 'Bearer YOUR_JWT_TOKEN')  

        expect(response.body).toHaveProperty('data');
      });
    });

});