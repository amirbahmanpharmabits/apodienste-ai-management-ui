export const resources = {
  en: {
    translation: {
      appName: 'Apodienste AI Management',
      nav: {
        profiles: 'Profiles',
        prompts: 'Prompts'
      },
      header: {
        searchPlaceholder: 'Search by profile name or prompt title...'
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
        empty: 'No profiles found',
        columns: {
          name: 'Name',
          status: 'Status',
          updatedAt: 'Updated'
        }
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
        logout: 'Logout',
        language: 'Language'
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
        searchPlaceholder: 'Nach Profilname oder Prompt-Titel suchen...'
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
        empty: 'Keine Profile gefunden',
        columns: {
          name: 'Name',
          status: 'Status',
          updatedAt: 'Aktualisiert'
        }
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
        logout: 'Abmelden',
        language: 'Sprache'
      }
    }
  }
} as const
