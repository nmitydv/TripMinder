import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from 'src/modules/vehicle/controllers/vehicle.controller';
import { VehicleService } from 'src/modules/vehicle/services/vehicle.service';
import { CreateVehicleDto } from 'src/modules/vehicle/dto/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/modules/vehicle/dto/update-vehicle.dto';
import { VehicleRepository } from 'src/modules/vehicle/repository/repositories/vehicle.repository';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { VehicleByIdDoc } from 'src/modules/vehicle/docs/vehicle.docs';
import { option } from 'yargs';
import { any } from 'joi';



const mockVehicleService = {
 
  findVehicleById: jest.fn(),
  findVehiclesByOwnerId: jest.fn(),
  updateAvailability: jest.fn(),
  updateActive: jest.fn(),
  
};


describe('VehicleController', () => {
  let controller: VehicleController;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        VehicleService,
        VehicleRepository,
        PaginationService,
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);
  });

  describe('updateUser', () => {
    it('should update a vehicle and return the updated vehicle', async () => {
      const mockVehicleId = '123';
      const mockUpdateDto: UpdateVehicleDto = {
        "vehicleName": "noteworthy-cope.name",
        "vehicleNumber": "bbg8lhk2",
        "modelNumber": "6920",
        // "vehiclePictures": "https://stained-surge.com",
        "numberPlatePic": "http://total-whisker.org",
        "vehicleType": "four",
        "seaters": 90,
        "ownerId": "ch6s6ah29mu2c3z9cw9f",
        "registrationNumber": "my5m93m2i173lww3ipf8",
        "features": "mribyjqwurbvbidfefjm",
        "kmPrice": 10.5
      };
      const mockUpdatedVehicle = { /* your mock updated vehicle here */ };

      jest.spyOn(vehicleService, 'updateVehicle').mockResolvedValue(mockUpdatedVehicle);

      const result = await controller.updateUser(mockVehicleId, mockUpdateDto);

      expect(result).toEqual(mockUpdatedVehicle);
    });

    it('should throw NotFoundException if the vehicle is not found', async () => {
      const mockVehicleId = '456';
      const mockUpdateDto: UpdateVehicleDto = {
        "vehicleName": "noteworthy-cope.name",
        "vehicleNumber": "bbg8lhk2",
        "modelNumber": "6920",
        "numberPlatePic": "http://total-whisker.org",
        "vehicleType": "four",
        "seaters": 90,
        "ownerId": "ch6s6ah29mu2c3z9cw9f",
        "registrationNumber": "my5m93m2i173lww3ipf8",
        "features": "mribyjqwurbvbidfefjm",
        "kmPrice": 10.5
      };

      jest.spyOn(vehicleService, 'updateVehicle').mockResolvedValue(null);

      await expect(controller.updateUser(mockVehicleId, mockUpdateDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createVehicle', () => {
    it('should create a new vehicle and return the created vehicle', async () => {

      const mockCreatedVehicle = {
        "vehicleName": "nice-dissonance.name",
        "vehicleNumber": "lgncanx1",
        "modelNumber": "1742",
        "vehiclePictures": "http://joint-newsletter.name",
        "numberPlatePic": "http://required-poll.org",
        "vehicleType": "four",
        "seaters": 98,
        "ownerId": "2l4lj4i70xq416o9c1j1",
        "registrationNumber": "zn7ny5elr9qnchkagdr9",
        "features": "vgzgshsrsdqwmcmhwzfq",
        "kmPrice": 10.5  };

      const mockCreateVehicleDto: CreateVehicleDto = {
        "vehicleName": "nice-dissonance.name",
        "vehicleNumber": "lgncanx1",
        "modelNumber": "1742",
        "numberPlatePic": "http://required-poll.org",
        "vehicleType": "four",
        "seaters": 98,
        "ownerId": "2l4lj4i70xq416o9c1j1",
        "registrationNumber": "zn7ny5elr9qnchkagdr9",
        "features": "vgzgshsrsdqwmcmhwzfq",
        "kmPrice": 10.5
      }; 
     

      jest.spyOn(vehicleService, 'createVehicle').mockResolvedValue(mockCreatedVehicle);

      const result = await controller.createVehicle(mockCreateVehicleDto, {});

      expect(result).toEqual(mockCreatedVehicle);
    });

    it('should throw BadRequestException if vehicle creation fails', async () => {
      const mockCreateVehicleDto: CreateVehicleDto = {
          vehicleName: '',
          vehicleType: '',
          seaters: 0
      };

      jest.spyOn(vehicleService, 'createVehicle').mockRejectedValue(new Error('Vehicle creation failed'));

      await expect(controller.createVehicle(mockCreateVehicleDto, {})).rejects.toThrowError(BadRequestException);
    });
  });


  describe('findOne', () => {
    it('should find a vehicle by ID', async () => {
    
      mockVehicleService.findVehicleById.mockResolvedValueOnce(
      //  mockedVehicleData
      {
      "_id": "43993bac-baed-49b5-8153-1045eb062427",
       "vehicleName": "terrific-sausage.com",
       "vehicleNumber": "ej424m8b",
        "modelNumber": "2211",
       "vehicleType": "four",
       "seaters": 41,
       "ownerId": "v12h5lc1g5upaaknl8ng",
       "registrationNumber": "17dpm9602ngxr4rb32wp",
       "features": "qcahfthjleguwewvlkni",
       "availability": true,
       "kmPrice": "10.5",
       "isActive": true,
       "joiningDate": "2023-11-11T10:16:21.156Z",
       "isApprove": "pending",
        "createdAt": "2023-11-11T10:16:21.178Z",
         "updatedAt": "2023-11-14T03:48:01.166Z"
      }
        );

      const result = await controller.findOne('mockedVehicleId' , 'mockedOptions');

      expect(result).toEqual({ data: 
        "_id" : "43993bac-baed-49b5-8153-1045eb062427",
      "vehicleName": "terrific-sausage.com",
      "vehicleNumber": "ej424m8b",
       "modelNumber": "2211",
      "vehicleType": "four",
      "seaters": 41,
      "ownerId": "v12h5lc1g5upaaknl8ng",
      "registrationNumber": "17dpm9602ngxr4rb32wp",
      "features": "qcahfthjleguwewvlkni",
      "availability": true,
      "kmPrice": "10.5",
      "isActive": true,
      "joiningDate": "2023-11-11T10:16:21.156Z",
      "isApprove": "pending",
       "createdAt": "2023-11-11T10:16:21.178Z",
        "updatedAt": "2023-11-14T03:48:01.166Z" });

      expect(mockVehicleService.findVehicleById).toHaveBeenCalledWith('mockedVehicleId');
    });

    it('should handle not finding a vehicle', async () => {

      mockVehicleService.findVehicleById.mockResolvedValueOnce(null);

      await expect(controller.findOne('mockedVehicleId' , 'mockedOptions')).rejects.toThrowError('vehicle not found');

      expect(mockVehicleService.findVehicleById).toHaveBeenCalledWith('mockedVehicleId');
    });

});




describe('findAllByOwnerId', () => {
  it('should find vehicles by owner ID', async () => {
    const mockedOwnerId = 'mockedOwnerId';
    const mockedVehicles = [
      {
        _id: 'mockedVehicleId1',
        vehiclename: 'Toyota',
        vehicleName: "terrific-sausage.com",
        vehicleNumber: "ej424m8b",
        modelNumber: "2211",
        vehicleType: "four" ,   
        seaters: 41,
        ownerId: "v12h5lc1g5upaaknl8ng",
        registrationNum: "17dpm9602ngxr4rb32wp",
        features: "qcahfthjleguwewvlkni",
        availability: true,
        kmPric : "10.5",
        isActive: true,
        joiningDate: "2023-11-11T10:16:21.156Z",
        isApprove: "pending",
        createdAt: "2023-11-11T10:16:21.178Z",
        updatedAt: "2023-11-14T03:48:01.166Z"
      },
      {
        _id: 'mockedVehicleId1',
        vehiclename: 'Toyota',
        vehicleName: "terrific-sausage.com",
        vehicleNumber: "ej424m8b",
        modelNumber: "2211",
        vehicleType: "four" ,   
        seaters: 41,
        ownerId: "v12h5lc1g5upaaknl8ng",
        registrationNum: "17dpm9602ngxr4rb32wp",
        features: "qcahfthjleguwewvlkni",
        availability: true,
        kmPric : "10.5",
        isActive: true,
        joiningDate: "2023-11-11T10:16:21.156Z",
        isApprove: "pending",
        createdAt: "2023-11-11T10:16:21.178Z",
        updatedAt: "2023-11-14T03:48:01.166Z"
      },
    ];

    mockVehicleService.findVehiclesByOwnerId.mockResolvedValueOnce(mockedVehicles);


    const result = await controller.findAllByOwnerId(mockedOwnerId);

    expect(result).toEqual({ data: mockedVehicles });

    expect(mockVehicleService.findVehiclesByOwnerId).toHaveBeenCalledWith(mockedOwnerId);
  });

  it('should handle not finding vehicles for owner', async () => {
    const mockedOwnerId = 'mockedOwnerId';
    mockVehicleService.findVehiclesByOwnerId.mockResolvedValueOnce([]);

    await expect(controller.findAllByOwnerId(mockedOwnerId)).rejects.toThrowError('Vehicles not found for owner mockedOwnerId');

    expect(mockVehicleService.findVehiclesByOwnerId).toHaveBeenCalledWith(mockedOwnerId);
  });

});


describe('updateAvailability', () => {
  it('should update availability of a vehicle', async () => {
    const mockedVehicleId = 'mockedVehicleId';
    const mockedAvailability = true;

    const mockedUpdatedVehicle = {
      _id: 'mockedVehicleId1',
      vehiclename: 'Toyota',
      vehicleName: "terrific-sausage.com",
      vehicleNumber: "ej424m8b",
      modelNumber: "2211",
      vehicleType: "four" ,   
      seaters: 41,
      ownerId: "v12h5lc1g5upaaknl8ng",
      registrationNum: "17dpm9602ngxr4rb32wp",
      features: "qcahfthjleguwewvlkni",
      availability: true,
      kmPric : "10.5",
      isActive: true,
      joiningDate: "2023-11-11T10:16:21.156Z",
      isApprove: "pending",
      createdAt: "2023-11-11T10:16:21.178Z",
      updatedAt: "2023-11-14T03:48:01.166Z"
     
    };

    mockVehicleService.updateAvailability.mockResolvedValueOnce(mockedUpdatedVehicle);

    const result = await controller.updateAvailability(mockedVehicleId, mockedAvailability);

    expect(result).toEqual({ data: mockedUpdatedVehicle });

    expect(mockVehicleService.updateAvailability).toHaveBeenCalledWith(mockedVehicleId, { Available: mockedAvailability });
  });

  it('should handle errors during availability update', async () => {

    const mockedVehicleId = 'mockedVehicleId';
    const mockedAvailability = true;

    mockVehicleService.updateAvailability.mockRejectedValueOnce(new Error('Mocked updateAvailability error'));

    await expect(controller.updateAvailability(mockedVehicleId, mockedAvailability)).rejects.toThrowError(
      'http.serverError.internalServerError'
    );

    expect(mockVehicleService.updateAvailability).toHaveBeenCalledWith(mockedVehicleId, { Available: mockedAvailability });
  });


});


describe('updateIsActive', () => {
  it('should update the "isActive" status of a vehicle', async () => {
    
    const mockedVehicleId = 'mockedVehicleId';
    const mockedIsActive = true;

    const mockedUpdatedVehicle = {
      _id: 'mockedVehicleId1',
      vehiclename: 'Toyota',
      vehicleName: "terrific-sausage.com",
      vehicleNumber: "ej424m8b",
      modelNumber: "2211",
      vehicleType: "four" ,   
      seaters: 41,
      ownerId: "v12h5lc1g5upaaknl8ng",
      registrationNum: "17dpm9602ngxr4rb32wp",
      features: "qcahfthjleguwewvlkni",
      availability: true,
      kmPric : "10.5",
      isActive: true,
      joiningDate: "2023-11-11T10:16:21.156Z",
      isApprove: "pending",
      createdAt: "2023-11-11T10:16:21.178Z",
      updatedAt: "2023-11-14T03:48:01.166Z"
     
     
    };

    mockVehicleService.updateActive.mockResolvedValueOnce(mockedUpdatedVehicle);

    const result = await controller.updateIsActive(mockedVehicleId, mockedIsActive);

    expect(result).toEqual({ data: mockedUpdatedVehicle });

    expect(mockVehicleService.updateActive).toHaveBeenCalledWith(mockedVehicleId, { isActive: mockedIsActive });
  });

  it('should handle errors during "isActive" update', async () => {
 
    const mockedVehicleId = 'mockedVehicleId';
    const mockedIsActive = true;

    mockVehicleService.updateActive.mockRejectedValueOnce(new Error('Mocked updateIsActive error'));

    await expect(controller.updateIsActive(mockedVehicleId, mockedIsActive)).rejects.toThrowError(
      'http.serverError.internalServerError'
    );

    expect(mockVehicleService.updateActive).toHaveBeenCalledWith(mockedVehicleId, { isActive: mockedIsActive });
  });

  
});



describe('findAllVehicles', () => {
  it('should retrieve all vehicles within a date range', async () => {
    // Mock the repository method and expected data
    const mockedStartDate = new Date('2023-01-01');
    const mockedEndDate = new Date('2023-12-31');
    const mockedVehicles = [
      {
        _id: 'mockedVehicleId1',
      vehiclename: 'Toyota',
      vehicleName: "terrific-sausage.com",
      vehicleNumber: "ej424m8b",
      modelNumber: "2211",
      vehicleType: "four" ,   
      seaters: 41,
      ownerId: "v12h5lc1g5upaaknl8ng",
      registrationNum: "17dpm9602ngxr4rb32wp",
      features: "qcahfthjleguwewvlkni",
      availability: true,
      kmPric : "10.5",
      isActive: true,
      joiningDate: "2023-11-11T10:16:21.156Z",
      isApprove: "pending",
      createdAt: "2023-11-11T10:16:21.178Z",
      updatedAt: "2023-11-14T03:48:01.166Z"
     
     
      },
      {
        _id: 'mockedVehicleId1',
        vehiclename: 'Toyota',
        vehicleName: "terrific-sausage.com",
        vehicleNumber: "ej424m8b",
        modelNumber: "2211",
        vehicleType: "four" ,   
        seaters: 41,
        ownerId: "v12h5lc1g5upaaknl8ng",
        registrationNum: "17dpm9602ngxr4rb32wp",
        features: "qcahfthjleguwewvlkni",
        availability: true,
        kmPric : "10.5",
        isActive: true,
        joiningDate: "2023-11-11T10:16:21.156Z",
        isApprove: "pending",
        createdAt: "2023-11-11T10:16:21.178Z",
        updatedAt: "2023-11-14T03:48:01.166Z"
       
       
      },
      // Add other mocked vehicles as needed
    ];

    // Mock the raw method of the repository
    VehicleRepository.raw.mockResolvedValueOnce(mockedVehicles);

    // Call the controller method
    const result = await controller.findAllVehicles(mockedStartDate, mockedEndDate);

    // Assert the expected result
    expect(result).toEqual(mockedVehicles);

    // Verify that the repository method was called with the correct parameters
    expect(VehicleRepository.raw).toHaveBeenCalledWith([
      {
        $lookup: {
          from: 'booking',
          localField: '_id',
          foreignField: 'vehicleDriverId',
          as: 'bookings',
        },
      },
    ]);
  });

  it('should handle errors during retrieval', async () => {

    const mockedStartDate = new Date('2023-01-01');
    const mockedEndDate = new Date('2023-12-31');

    VehicleRepository.raw.mockRejectedValueOnce(new Error('Mocked findAllVehicles error'));

  
    await expect(controller.findAllVehicles(mockedStartDate, mockedEndDate)).rejects.toThrowError(
      'http.serverError.internalServerError'
    );
    expect(VehicleRepository.raw).toHaveBeenCalledWith([
      {
        $lookup: {
          from: 'booking',
          localField: '_id',
          foreignField: 'vehicleDriverId',
          as: 'bookings',
        },
      },
    ]);
  });

  
});



describe('getActivity', () => {
  it('should retrieve vehicles activity status', async () => {
    const mockedIsActive = true;
    const mockedVehicles = [
      {
        _id: 'mockedVehicleId1',
        vehiclename: 'Toyota',
        vehicleName: "terrific-sausage.com",
        vehicleNumber: "ej424m8b",
        modelNumber: "2211",
        vehicleType: "four" ,   
        seaters: 41,
        ownerId: "v12h5lc1g5upaaknl8ng",
        registrationNum: "17dpm9602ngxr4rb32wp",
        features: "qcahfthjleguwewvlkni",
        availability: true,
        kmPric : "10.5",
        isActive: true,
        joiningDate: "2023-11-11T10:16:21.156Z",
        isApprove: "pending",
        createdAt: "2023-11-11T10:16:21.178Z",
        updatedAt: "2023-11-14T03:48:01.166Z"
       
       
      },
      {
        _id: 'mockedVehicleId1',
      vehiclename: 'Toyota',
      vehicleName: "terrific-sausage.com",
      vehicleNumber: "ej424m8b",
      modelNumber: "2211",
      vehicleType: "four" ,   
      seaters: 41,
      ownerId: "v12h5lc1g5upaaknl8ng",
      registrationNum: "17dpm9602ngxr4rb32wp",
      features: "qcahfthjleguwewvlkni",
      availability: true,
      kmPric : "10.5",
      isActive: true,
      joiningDate: "2023-11-11T10:16:21.156Z",
      isApprove: "pending",
      createdAt: "2023-11-11T10:16:21.178Z",
      updatedAt: "2023-11-14T03:48:01.166Z"
     
     
      },
    
    ];

    mockVehicleService.vehicleActivity.mockResolvedValueOnce(mockedVehicles);

    const result = await controller.getActivity(mockedIsActive);

    expect(result).toEqual({ data: mockedVehicles });

    expect(mockVehicleService.vehicleActivity).toHaveBeenCalledWith(mockedIsActive);
  });

  it('should handle errors during activity retrieval', async () => {

    const mockedIsActive = true;

    mockVehicleService.vehicleActivity.mockRejectedValueOnce(new Error('Mocked getActivity error'));

    await expect(controller.getActivity(mockedIsActive)).rejects.toThrowError(
      'http.serverError.internalServerError'
    );

    expect(mockVehicleService.vehicleActivity).toHaveBeenCalledWith(mockedIsActive);
  });

});




})
