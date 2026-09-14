export interface Device {
  deviceID: number,
  description: string,
  address?: string,
  maxHourlyEnergyConsumption?: number,
  ownerID?: number,
}
