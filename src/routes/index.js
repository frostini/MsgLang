import {
  Compose,
  Conduct,
  Configure,
  Intro,
  NotFound,
} from '../scenes'

import { 
  Configure as SetupIcon,
  ChatOption,
  Announce,
 } from 'grommet-icons';

const routes = [{
    navbar: true,
    label: 'configure',
    Icon: SetupIcon,
    path: "/configure",
    link: "/configure",
    exact: true,
    component: Configure
  }, {
    navbar: true,
    label: 'compose',
    Icon: ChatOption,
    path: "/compose/:slug",
    link: "/compose/messages",
    component: Compose,
    exact: true
  }, {
    navbar: true,
    label: 'conduct',
    Icon: Announce,
    path: "/conduct",
    link: "/conduct",
    component: Conduct
  }, {
    navbar: false,
    path: "/",
    exact: true,
    component: Intro
}, {
  navbar: false,
  component: NotFound
}];
// NotFound route should always be at the bottom to be last
// and catch unresolved routes

const userSession = {
  user: {
    name: "Alan Souza",
    thumbnail: "//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80"
  },
  items: [
    {
      label: "Logout",
      href: "#"
    }
  ]
};

export { routes, userSession };