import { PickType } from '@nestjs/swagger';
import { VehicleEntity } from 'src/modules/vehicle/repository/entities/vehicle.entity';

export class vehicleUpdateisApproveDto extends PickType(VehicleEntity, [
    'isApprove',
] as const) {}