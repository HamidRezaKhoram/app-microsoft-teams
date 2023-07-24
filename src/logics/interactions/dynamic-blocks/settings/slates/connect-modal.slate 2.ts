import { RawSlateDto } from '@tribeplatform/slate-kit/dtos'

import {
  SettingsBlockCallback,
} from '../constants'

export const getConnectModalSlate = (options?: {
    showEnvPicker?: boolean
    item?: object
    defaultConsumerKey?: string
    defaultConsumerSecret?: string
  } ): RawSlateDto => {
    const {
     
      item
  
    } = options || {}
    return {
      rootBlock: 'root',
      blocks: [
        {
          id: 'root',
          name: 'Form',
          props: {
            callbackId: SettingsBlockCallback.AuthRedirect,
            spacing: 'md',
          },
          children: ['auth'],
        },
        {
            id: 'auth',
            name: 'Container',
            props: { spacing: 'md' },
            children: [
              'auth.picker',
              'auth.consumerKey',
              'auth.consumerSecret',
              'auth.footer',
            ],
          },
          {
            id: 'auth.picker',
            name: 'Select',
            props: {
              name: 'teams',
              label: 'Teams',
              items: item,
              required: true,
            },
          },
        

        {
          id: 'auth.consumerKey',
          name: 'Input',
          props: {
            name: 'consumerKey',
            label: 'Consumer Key',
            required: true,
          },
        },
        {
          id: 'auth.consumerSecret',
          name: 'Input',
          props: {
            name: 'consumerSecret',
            label: 'Consumer Secret',
            required: true,
          },
        },
        {
          id: 'auth.footer',
          name: 'Container',
          props: { direction: 'horizontal-reverse' },
          children: ['auth.action'],
        },
        {
          id: 'auth.action',
          name: 'Button',
          props: {
            type: 'submit',
            variant: 'primary',
            text: 'Connect',
            // autoDisabled: !(defaultConsumerKey && defaultConsumerSecret),
          },
        },
      ],
    }
  }
  