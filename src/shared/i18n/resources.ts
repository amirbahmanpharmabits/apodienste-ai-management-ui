export const resources = {
  en: {
    translation: {
      appName: 'Apodienste AI Management',
      nav: {
        profiles: 'Profiles',
        prompts: 'Prompts'
      },
      header: {
        openProfile: 'Open profile',
        profileFields: {
          name: 'Name',
          landline: 'Landline',
          email: 'Email'
        }
      },
      auth: {
        loading: 'Redirecting to Microsoft login...',
        signedInAs: 'Signed in as',
        unauthorizedTitle: 'This account is not allowed',
        requiredAccount: 'Required account'
      },
      profiles: {
        title: 'Profiles',
        subtitle: 'Manage profile catalog and status',
        loading: 'Loading profiles...',
        empty: 'No profiles found'
      },
      prompts: {
        title: 'Prompts',
        subtitle: 'Create and manage reusable AI prompts',
        fields: {
          title: 'Title',
          content: 'Prompt content'
        },
        actions: {
          save: 'Save prompt'
        },
        success: 'Prompt saved locally (demo).',
        validation: {
          titleMin: 'Title must be at least 3 characters.',
          contentMin: 'Prompt content must be at least 10 characters.'
        }
      },
      common: {
        logout: 'Logout'
      }
    }
  },
  de: {
    translation: {
      appName: 'Apodienste AI Management',
      nav: {
        profiles: 'Profile',
        prompts: 'Prompts'
      },
      header: {
        openProfile: 'Profil öffnen',
        profileFields: {
          name: 'Name',
          landline: 'Festnetz',
          email: 'E-Mail'
        }
      },
      auth: {
        loading: 'Weiterleitung zum Microsoft-Login...',
        signedInAs: 'Angemeldet als',
        unauthorizedTitle: 'Dieses Konto ist nicht erlaubt',
        requiredAccount: 'Erforderliches Konto'
      },
      profiles: {
        title: 'Profile',
        subtitle: 'Profilkatalog und Status verwalten',
        loading: 'Profile werden geladen...',
        empty: 'Keine Profile gefunden'
      },
      prompts: {
        title: 'Prompts',
        subtitle: 'Wiederverwendbare AI-Prompts erstellen und verwalten',
        fields: {
          title: 'Titel',
          content: 'Prompt-Inhalt'
        },
        actions: {
          save: 'Prompt speichern'
        },
        success: 'Prompt lokal gespeichert (Demo).',
        validation: {
          titleMin: 'Titel muss mindestens 3 Zeichen lang sein.',
          contentMin: 'Prompt-Inhalt muss mindestens 10 Zeichen lang sein.'
        }
      },
      common: {
        logout: 'Abmelden'
      }
    }
  }
} as const
