// import { SalesforceCommunity, SalesforceUser } from '@interfaces'
import { Network } from '@prisma/client'
import { RawSlateDto } from '@tribeplatform/slate-kit/dtos'
import moment from 'moment'

import { SettingsBlockCallback } from '../constants'

import { getAuthSettingsBlocks } from './auth.slate'
// import { getChanelIntegrationBlocks } from './chanel-integration.slate'


export const getConnectedSettingsSlate = (options: {
  user: Network

}): RawSlateDto => {
  const {
    user,
    

  } = options
  return {
    rootBlock: 'root',
    blocks: [
      {
        id: 'root',
        name: 'Container',
        props: { spacing: 'md' },
        children: ['chanels-integration', 'adding-teams', 'auth'],
      },
    //   ...getChanelsIntegrationBlocks({
    //     id: 'chanels-integration',
    //     community,
    //   }),
    //   {
    //     id: 'connecting-teams',
    //     name: 'Button',
    //     actionCallbackId: SettingsBlockCallback.OpenConnectModal,
    //     actionVariant: 'outline',
    //     props: { spacing: 'md' },
    //     description:"Add your Teams's channels"
    //   },
    //   ...getCaseIntegrationBlocks({
    //     id: 'case-integration',
    //     community,
    //   }),
    //   ...getSearchIntegrationBlocks({
    //     id: 'search-integration',
    //     community,
    //     communities,
    //   }),
    ...getAuthSettingsBlocks({
        id: 'adding-teams',
        action: 'Add Teams',
        title: 'Your Teams channels',
        actionCallbackId: SettingsBlockCallback.OpenConnectModal,
        actionVariant: 'primary',
        // secondaryActionCallbackId: SettingsBlockCallback.OpenConnectModal,
        description:"Add your Teams's channels"
      }),
      ...getAuthSettingsBlocks({
        id: 'auth',
        action: 'Revoke',
        actionCallbackId: SettingsBlockCallback.AuthVoke,
        actionVariant: 'danger',
        // secondaryActionCallbackId: SettingsBlockCallback.OpenConnectModal,
        description: `Connected by [${user.name}] on ${moment(user.createdAt).format(
          'MMMM Do YYYY, h:mm a',
        )}<br>By revoking access, you will lose your settings and no longer be able to use Microsoft Teams features on Bettermode.`,
      }),
    ],
  }
}
