import React, { useEffect } from 'react';
import { register } from '@adobe/uix-guest';
import { extensionId } from './Constants';
import metadata from '../../../../app-metadata.json';

export default function ExtensionRegistration() {
  useEffect(() => {
    const init = async () => {
      const getSecondaryNavItems = () => {
        // Construct the full, absolute URL to the app route
        const targetUrl = new URL('/index.html#/app', window.location.href).href;
        return [
          {
            id: 'hello-world-tab',
            label: 'Hello World',
            url: targetUrl,
          },
        ];
      };

      await register({
        id: extensionId,
        metadata,
        methods: {
          secondaryNav: {
            PROJECT: { getItems: getSecondaryNavItems },
            project: { getItems: getSecondaryNavItems },
            OPTASK: { getItems: getSecondaryNavItems },
            optask: { getItems: getSecondaryNavItems },
            ISSUE: { getItems: getSecondaryNavItems },
            issue: { getItems: getSecondaryNavItems },
          },
        },
      });
    };

    init().catch(console.error);
  }, []);

  return <div>Registering extension with Workfront...</div>;
}