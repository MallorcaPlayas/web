import { computed } from "vue";

export function getLinksList(t) {
  return computed(() => [
    {
      title: t('linksList.home.title'),
      caption: t('linksList.home.caption'),
      icon: 'home',
      link: '/'
    },
    {
      title: t('linksList.user.title'),
      caption: t('linksList.user.caption'),
      icon: 'group',
      link: '/user'
    },
    {
      title: t('linksList.roles.title'),
      caption: t('linksList.roles.caption'),
      icon: 'manage_accounts',
      link: '/roles'
    },
    {
      title: t('linksList.beaches.title'),
      caption: t('linksList.beaches.caption'),
      icon: 'beach_access',
      link: '/beaches'
    },
    {
      title: t('linksList.routes.title'),
      caption: t('linksList.routes.caption'),
      icon: 'route',
      link: '/routes'
    },
    {
      title: t('linksList.roleRequests.title'),
      caption: t('linksList.roleRequests.caption'),
      icon: 'approval',
      link: '/role-requests'
    },
    {
      title: t('linksList.complaints.title'),
      caption: t('linksList.complaints.caption'),
      icon: 'report',
      link: '/complaints'
    },
    {
      title: t('linksList.events.title'),
      caption: t('linksList.events.caption'),
      icon: 'event',
      link: '/excursions'
    },
    {
      title: t('linksList.pointsOfInterest.title'),
      caption: t('linksList.pointsOfInterest.caption'),
      icon: 'signpost',
      link: '/points-of-interest'
    },
    {
      title: t('linksList.translateQuasarPage.title'),
      caption: t('linksList.translateQuasarPage.caption'),
      icon: 'translate',
      link: '/translator'
    }
  ]);
}
