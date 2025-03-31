import {
  PROPERTY_TYPE_LIST,
  PROPERTY_REGULARIZATION_LIST,
  PROPERTY_TYPE_GAS_INSTALLATION
} from '../interfaces/properties.interface';

export const propertyTypeToString = (propertyType: number) => {
  const propertyTypeFound = PROPERTY_TYPE_LIST.find((item: any) => item.id === propertyType);
  return propertyTypeFound ? propertyTypeFound.name : '-';
};

export const propertyRegularizationToString = (propertyRegularization: number) => {
  const propertyRegularizationFound = PROPERTY_REGULARIZATION_LIST.find((item: any) => item.id === propertyRegularization);
  return propertyRegularizationFound ? propertyRegularizationFound.name : '-';
};

export const propertyGasInstallationToString = (propertyGasInstallation: number) => {
  const propertyGasInstallationFound = PROPERTY_TYPE_GAS_INSTALLATION.find((item: any) => item.id === propertyGasInstallation);
  return propertyGasInstallationFound ? propertyGasInstallationFound.name : '-';
};
