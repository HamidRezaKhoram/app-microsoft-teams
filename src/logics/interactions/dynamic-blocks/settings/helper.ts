import { InteractionType, WebhookStatus, WebhookType } from '@enums'
import { InteractionWebhookResponse, MicrosoftAuthProfile } from '@interfaces'
import { Network, NetworkSettings } from '@prisma/client'
import { rawSlateToDto } from '@tribeplatform/slate-kit/utils'

import { getNotConnectedSettingsSlate } from './slates/not-connected.slate'
import { getConnectModalSlate } from './slates/connect-modal.slate'
import { getConnectedSettingsSlate } from './slates/connected.slate'
// import { getConnectedSettingsSlate } from './slates/connected-settings.slate'

export const getConnectedSettingsResponse = async (options: {
  interactionId: string
  
  // sClient?: SalesforceClient
  // communities?: SalesforceCommunity[]
}, user: Network): Promise<InteractionWebhookResponse> => {
  const {
    interactionId,
    
    // sClient: givenSClient,
    // communities: givenCommunities,
  } = options
  // const sClient = givenSClient || (await getSalesforceClient(community))
  // const [connectedUser, communities] = await Promise.all([
  //   sClient.retrieveRecord<SalesforceUser>(SObject.User, community.connectedUserId),
  //   givenCommunities || sClient.getCommunities(),
  // ])
  const slate = getConnectedSettingsSlate({
    user,
  
    
  })
  return {
    type: WebhookType.Interaction,
    status: WebhookStatus.Succeeded,
    data: {
      interactions: [
        {
          id: interactionId,
          type: InteractionType.Show,
          slate: rawSlateToDto(slate),
        },
      ],
    },
  }
}

export const getDisconnectedSettingsResponse = async (options: {
  interactionId: string
}): Promise<InteractionWebhookResponse> => {
  const { interactionId } = options
  const slate = getNotConnectedSettingsSlate()
  return {
    type: WebhookType.Interaction,
    status: WebhookStatus.Succeeded,
    data: {
      interactions: [
        {
          id: interactionId,
          type: InteractionType.Show,
          slate: rawSlateToDto(slate),
        },
      ],
    },
  }
}

export const getConnectModalResponse = async (options: {
  user: Network
  item: object
}): Promise<InteractionWebhookResponse> => {
  const {
    item
    // community: { connectedUserId, sandbox, consumerKey, consumerSecret },
  } = options
 

  const slate = getConnectModalSlate({
    item
    
    // defaultConsumerKey: consumerKey,
    // defaultConsumerSecret: consumerSecret,
  })
  return {
    type: WebhookType.Interaction,
    status: WebhookStatus.Succeeded,
    data: {
      interactions: [
        {
          id: 'connect-salesforce-modal',
          type: InteractionType.OpenModal,
          props: {
            size: 'md',
            title: 'Connect to Microsoft Teams Channels',
          },
          slate: rawSlateToDto(slate),
        },
      ],
    },
  }
}
