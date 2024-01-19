import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from 'src/modules/driver/controller/driver.controller';
import { DriverService } from 'src/modules/driver/services/driver.service';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { CreateDriverDto } from 'src/modules/driver/dto/create.driver.dto';
import { UpdateDriverDto } from 'src/modules/driver/dto/update-driver.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IDatabaseCreateOptions } from 'src/common/database/interfaces/database.interface';


jest.mock('../services/driver.service');
jest.mock('src/common/debugger/services/debugger.service');

describe('DriverController', () => {
  let controller: DriverController;
  let driverService: DriverService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [DriverController],
        providers: [DriverService, DebuggerService],
      }).compile();
  
      controller = module.get<DriverController>(DriverController);
      driverService = module.get<DriverService>(DriverService);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    describe('create', () => {
      it('should create a driver', async () => {
        const createDriverDto: CreateDriverDto ={
            "experience": "three",
            "userId": "######-4a97-451a-ba5e-648d9ccceb4b",
            "availability": "free",
            "adharNumber": "62812488139205",
            "licenseNumber": "62812857998756",
            "vehicleType": "18",
            "drivingLicence": "https://agitated-prey.com",
            description: ''
        }

        const mockedOptions: IDatabaseCreateOptions = /* provide valid options */;
        const mockedDriver = { 
        experience: "5yesr",
        userId: "######-4a97-451a-ba5e-648d9ccceb4b",
        availability: "Available",
        adharNumber: "62812488139205",
        licenseNumber: "62812857998756",
        vehicleType: "18",
        drivingLicence: "https://agitated-prey.com",
        description: 'Experienced driver with a clean record'
    };
  

        jest.spyOn(driverService, 'createDriver').mockResolvedValueOnce(mockedDriver);
  
        const result = await controller.create(createDriverDto, mockedOptions);
  
        expect(result).toEqual({ data: mockedDriver.toObject() });
  
        expect(driverService.createDriver).toHaveBeenCalledWith(createDriverDto, mockedOptions);
      });
  
      it('should handle errors during driver creation', async () => {
        const createDriverDto: CreateDriverDto = {
         experience: "5yesr",
        userId: "######-4a97-451a-ba5e-648d9ccceb4b",
        availability: "Available",
        adharNumber: "62812488139205",
        licenseNumber: "62812857998756",
        vehicleType: "18",
        drivingLicence: "https://agitated-prey.com",
        description: 'Experienced driver with a clean record'};
        const mockedOptions: IDatabaseCreateOptions = /* provide valid options */;
  
    
        jest.spyOn(driverService, 'createDriver').mockRejectedValueOnce(new Error('Mocked driver creation error'));
  
        await expect(controller.create(createDriverDto, mockedOptions)).rejects.toThrowError(
          'driver creation failed Mocked driver creation error'
        );
  
        
        expect(driverService.createDriver).toHaveBeenCalledWith(createDriverDto, mockedOptions);
      });
    });


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [DriverController],
          providers: [DriverService, DebuggerService],
        }).compile();
    
        controller = module.get<DriverController>(DriverController);
        driverService = module.get<DriverService>(DriverService);
      });
    
      afterEach(() => {
        jest.restoreAllMocks();
      });
    
      describe('findAll', () => {
        it('should retrieve all drivers', async () => {

          const mockedDrivers = 
            {
                experience: "5yesr",
                userId: "######-4a97-451a-ba5e-648d9ccceb4b",
                availability: "Available",
                adharNumber: "62812488139205",
                licenseNumber: "62812857998756",
                vehicleType: "18",
                drivingLicence: "https://agitated-prey.com",
                description: 'Experienced driver with a clean record'
             
            },
            // {
            //     experience: "5yesr",
            //     userId: "######-4a97-451a-ba5e-648d9ccceb4b",
            //     availability: "Available",
            //     adharNumber: "62812488139205",
            //     licenseNumber: "62812857998756",
            //     vehicleType: "18",
            //     drivingLicence: "https://agitated-prey.com",
            //     description: 'Experienced driver with a clean record'
              
            // },
       
        [];
    
         
          jest.spyOn(driverService, 'findAll').mockReturnValueOnce(mockedDrivers);
    
          const result = await controller.findAll();
    
          
          expect(result).toEqual({ data: mockedDrivers });
    
          
          expect(driverService.findAll).toHaveBeenCalled();
        });
    
        it('should handle errors during retrieval', async () => {
         
          jest.spyOn(driverService, 'findAll').mockRejectedValueOnce(new Error('Mocked findAll error'));
    
         
          await expect(controller.findAll()).rejects.toThrowError('Mocked findAll error');
    
          expect(driverService.findAll).toHaveBeenCalled();
        });
      });



      describe('findOne', () => {
        it('should find a driver by ID', async () => {
          const mockedDriver = {

            experience: "5yesr",
            userId: "######-4a97-451a-ba5e-648d9ccceb4b",
            availability: "Available",
            adharNumber: "62812488139205",
            licenseNumber: "62812857998756",
            vehicleType: "18",
            drivingLicence: "https://agitated-prey.com",
            description: 'Experienced driver with a clean record'
       
          };
    
          jest.spyOn(driverService, 'findOne').mockResolvedValueOnce(mockedDriver);
    
          const result = await controller.findOne('driverId1', {});
    
          
          expect(result).toEqual({ data: mockedDriver });
    
          
          expect(driverService.findOne).toHaveBeenCalledWith('driverId1', {});
        });
    
        it('should handle not finding a driver', async () => {
          jest.spyOn(driverService, 'findOne').mockResolvedValueOnce(null);
    
         
          await expect(controller.findOne('nonExistentDriverId', {})).rejects.toThrowError('driver not found');
        });
      });
    
      describe('remove', () => {
        it('should remove a driver by ID', async () => {
          const mockedDriver = {
            experience: "5yesr",
            userId: "######-4a97-451a-ba5e-648d9ccceb4b",
            availability: "Available",
            adharNumber: "62812488139205",
            licenseNumber: "62812857998756",
            vehicleType: "18",
            drivingLicence: "https://agitated-prey.com",
            description: 'Experienced driver with a clean record'
        
          };
    
          jest.spyOn(driverService, 'remove').mockResolvedValueOnce(mockedDriver);
    
          const result = await controller.remove('driverId1');
    
          expect(result).toEqual({ data: mockedDriver });
    
          expect(driverService.remove).toHaveBeenCalledWith('driverId1');
        });
      });
    
      describe('updateDriver', () => {
        it('should update a driver by ID', async () => {
          const mockedDriver = {
            _id: 'driverId1',
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
        
          };
    
          jest.spyOn(driverService, 'updateDrivers').mockResolvedValueOnce(mockedDriver);
    
         
          const result = await controller.updateDriver('driverId1', { 
           experience: "5yesr",
          availability: "Available",
          adharNumber: "62812488139205",
          licenseNumber: "62812857998756",
          vehicleType: "18",
          drivingLicence: "https://agitated-prey.com",
          description: 'Experienced driver with a clean record' });
    
         
          expect(result).toEqual({ data: mockedDriver });
    
          expect(driverService.updateDrivers).toHaveBeenCalledWith('driverId1', {  experience: "5yesr",
          userId: "######-4a97-451a-ba5e-648d9ccceb4b",
          availability: "Available",
          adharNumber: "62812488139205",
          licenseNumber: "62812857998756",
          vehicleType: "18",
          drivingLicence: "https://agitated-prey.com",
          description: 'Experienced driver with a clean record' });
        });
    
        it('should handle not finding a driver during update', async () => {
          jest.spyOn(driverService, 'updateDrivers').mockResolvedValueOnce(null);
    
          await expect(controller.updateDriver('nonExistentDriverId', {  experience: "5yesr",
          
          availability: "Available",
          adharNumber: "62812488139205",
          licenseNumber: "62812857998756",
          vehicleType: "18",
          drivingLicence: "https://agitated-prey.com",
          description: 'Experienced driver with a clean record'}))
            .rejects.toThrowError('driver not found of this driverId');
        });
      });
    
      describe('findByIsApproved', () => {
        it('should find drivers by approval status', async () => {
          const mockedDrivers = [
            {
                experience: "5yesr",
                userId: "######-4a97-451a-ba5e-648d9ccceb4b",
                availability: "Available",
                adharNumber: "62812488139205",
                licenseNumber: "62812857998756",
                vehicleType: "18",
                drivingLicence: "https://agitated-prey.com",
                description: 'Experienced driver with a clean record'
            },
            {
                experience: "5yesr",
                userId: "######-4a97-451a-ba5e-648d9ccceb4b",
                availability: "Available",
                adharNumber: "62812488139205",
                licenseNumber: "62812857998756",
                vehicleType: "18",
                drivingLicence: "https://agitated-prey.com",
                description: 'Experienced driver with a clean record'
            },
          
          ];
    
          jest.spyOn(driverService, 'findByIsApproved').mockResolvedValueOnce(mockedDrivers);
    
       
          const result = await controller.findByIsApproved('approved', {});
    
         
          expect(result).toEqual({ data: mockedDrivers });
    
          
          expect(driverService.findByIsApproved).toHaveBeenCalledWith('approved', {});
        });
    
        it('should handle not finding drivers by approval status', async () => {
          jest.spyOn(driverService, 'findByIsApproved').mockResolvedValueOnce(null);
    
          await expect(controller.findByIsApproved('nonExistentStatus', {})).rejects.toThrowError('driver not found');
        });
      });
    
   
    
    });
    

  
