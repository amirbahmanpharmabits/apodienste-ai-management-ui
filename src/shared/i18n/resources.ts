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
        title: 'AI Prompts Management',
        subtitle: 'Create and manage reusable AI prompts',
        loading: 'Loading prompts...',
        empty: 'No prompts found',
        deleteText: 'Are you sure you want to delete this prompt?',
        columns: {
          name: 'Name',
          content: 'Content',
          createdAt: 'Created At',
          actions: 'Actions'
        },
        fields: {
          name: 'Name',
          content: 'Prompt content'
        },
        actions: {
          create: 'Create New Prompt',
          edit: 'Edit Prompt',
          delete: 'Delete Prompt',
          save: 'Save',
          cancel: 'Cancel',
          confirmDelete: 'Confirm'
        },
        success: 'Prompt saved successfully.',
        validation: {
          nameMin: 'Name must be at least 3 characters.',
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
        title: 'AI Prompts Management',
        subtitle: 'Wiederverwendbare AI-Prompts erstellen und verwalten',
        loading: 'Prompts werden geladen...',
        empty: 'Keine Prompts gefunden',
        deleteText: 'Möchten Sie diesen Prompt wirklich löschen?',
        columns: {
          name: 'Name',
          content: 'Inhalt',
          createdAt: 'Erstellt am',
          actions: 'Aktionen'
        },
        fields: {
          name: 'Name',
          content: 'Prompt-Inhalt'
        },
        actions: {
          create: 'Create New Prompt',
          edit: 'Prompt bearbeiten',
          delete: 'Prompt löschen',
          save: 'Speichern',
          cancel: 'Abbrechen',
          confirmDelete: 'Bestätigen'
        },
        success: 'Prompt erfolgreich gespeichert.',
        validation: {
          nameMin: 'Name muss mindestens 3 Zeichen lang sein.',
          contentMin: 'Prompt-Inhalt muss mindestens 10 Zeichen lang sein.'
        }
      },
      common: {
        logout: 'Abmelden'
      }
    }
  }
} as const
