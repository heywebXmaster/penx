import { DeployFunctionOptions, createDeployFunction } from '../../utils/deploy'

export const options: DeployFunctionOptions = {
  contractName: 'DaoVault',
  libraryNames: ['TransferUtils'],
}

export default createDeployFunction(options)
