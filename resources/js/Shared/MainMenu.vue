<template>
  <div
    :class="`menu-bg-color leftsidebar sticky top-0 min-h-screen overflow-hidden ${openSidebar ? 'sidebarshow mobsidebarhide' : 'sidebarhide mobsidebarshow'}`">
    <div class="mx-auto px-3 ">
      <inertia-link href="/">
        <logo width="115" height="28" class="mb-8 mt-3" />
      </inertia-link>
      <div class="gap-x-12 navlinks px-2">
        <div v-for="(link, i) in links" v-if="link.visible" :key="'deskfirst' + i"
          class="md:flex md:flex-wrap relative group pb-7">
          <inertia-link class="text-menu-font-color font-light text-md transition-all flex items-center gap-x-2 w-full"
            :class="[(link.name === currentRoute ? 'active' : '')]" v-if="link.to" :href="link.to"
            @click="toggleActiveSingleLink(link.title)">
            <!-- <img :src="link.icon_image" style="width:20px"> -->
            <MenuIcon :name="link.icon_image" style="width:20px" />
            {{ link.title }} <i
              :class="`text-menu-font-color fa fa-angle-${link.openMenu ? 'down' : 'right'} ml-auto ${link.sub_links.length <= 0 ? 'hidden' : 'block'}`"></i>
          </inertia-link>
          <a href="#" @click="toggleSubmenu(link.title)"
            class="text-menu-font-color font-light text-md transition-all flex items-center gap-x-2 router-link-exact-active router-link-active w-full"
            :class="[(!link.openMenu && !link.sub_links.some((sl) => sl.name == currentRoute) ? '' : 'active')]" v-else>
            <!-- <img :src="link.icon_image" style="width:20px">  -->
            <MenuIcon :name="link.icon_image" style="width:20px" />
            {{ link.title }}
            <i
              :class="`text-menu-font-color fa fa-angle-${link.openMenu ? 'down' : 'right'} ml-auto ${link.sub_links.length <= 0 ? 'hidden' : 'block'}`"></i>
          </a>

          <div v-if="link.sub_links.length > 0" :class="[(!link.openMenu ? 'hidden' : 'block')]" tabindex="-1"
            class="rounded-sm mt-3 top-full px-2 py-2 min-w-10 transform transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 submenus">
            <inertia-link
              class="text-menu-font-color font-normal text-blackish block px-6 pb-1.5 rounded  whitespace-nowrap text-xs transition-all w-full "
              v-for="(small_link, j) in link.sub_links" v-if="small_link.visible" :key="'desktwo' + j"
              :class="small_link.name == currentRoute ? 'active' : ''" :data="small_link.query ? small_link.query : {}"
              :as="small_link.to ? 'a' : 'span'" :href="small_link.to ? small_link.to : '#'">
              {{ small_link.title }}
            </inertia-link>
          </div>

        </div>
        <div class="flex gap-x-2 w-full items-center">
          <!-- <img src="/images/SignOut.svg" style="width:20px"> -->
          <MenuIcon name="logouticon" style="width:20px" />
          <a title="Logout" :href="route('home')" class="text-menu-font-color px-0 py-0 px-1 rounded-md w-full transition-all text-left">Logout</a>
          <!-- <Link class="text-menu-font-color px-0 py-0 px-1 rounded-md w-full transition-all text-left"
            :defaultClass="false" :link="route('home')" :method="'post'" :asType="'button'" :text="'Logout'" /> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Logo from "@/Shared/Logo";
import Link from "@/Shared/Link";
import { Inertia } from '@inertiajs/inertia'
import MenuIcon from '@/Shared/MenuIcon'

export default {
  components: {
    Logo,
    Link,
    MenuIcon,
  },
  data() {
    return {
      fullName: this.$page.props.auth.user.first_name + ' ' + this.$page.props.auth.user.last_name,
      links: [
        {
          title: "Dashboard",
          to: route('dashboard'),
          name: 'dashboard',
          visible: true,
          sub_links: [],
          icon_image: 'dashboardicon',
          active_single_link: false,
        },
        {
          title: "Clients",
          to: route('users.index'),
          visible: true,
          sub_links: [],
          icon_image: 'clienticon',
        },
        {
          title: "Challenges",
          to: route('challenges.index'),
          visible: true,
          sub_links: [],
          icon_image: 'billingicon',
        },
        {
          title: "Educational Providers",
          to: route('educational-providers.index'),
          visible: true,
          sub_links: [],
          icon_image: 'adminicon',
        },
        {
          title: "Countries",
          to: route('locations.index'),
          visible: true,
          sub_links: [],
          icon_image: 'location',
        },
        {
          title: "Settings",
          to: route('settings'),
          visible: true,
          sub_links: [],
          icon_image: 'settingsicon',
          active_single_link: false,
          name: 'settings',
        },
      ],
      open_mobile_links_dropdown: false,
      open_admin_popup: false,
      page_change: false,
    };
  },
  props: {
    openSidebar: {
      type: Boolean,
      default: true,
    },
    currentRoute: {
      type: String,
      default: 'dashboard',
    },
  },
  mounted() {

    // this.$inertia.on('navigate', (event) => {
    //   console.log(`navigate The route changed to ${event.detail.visit.url}`)
    // });

    // console.log(route().current())
  },
  watch: {
    '$page.url': function (newUrl, oldUrl) {
      console.log(newUrl)
    }
  },
  computed: {
    nameInitials() {
      let nameArr = this.fullName.split(" ");
      return nameArr[0].slice(0, 1) + nameArr[1].slice(0, 1);
    }
  },

  methods: {
    toggleSubmenu(linkTitle) {
      this.links.map((link) => {
        if (link.title === linkTitle) {
          link.openMenu = !link.openMenu
        } else {
          link.openMenu = false;
          link.active_single_link = false;
        }
      });
    },
    closeSubmenu(link, event) {
      if (link.openMenu && !event.currentTarget.contains(event.relatedTarget)) {
        link.openMenu = false
      }
    },
    toggleLinks() {
      //toggle all links on
      this.open_mobile_links_dropdown = !this.open_mobile_links_dropdown;
    },
    openPopup() {
      this.open_admin_popup = true;
    },
    closePopup(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.open_admin_popup = false;
      }
    },
    toggleActiveSingleLink(linkTitle) {
      this.links.map((link) => {
        if (link.title === linkTitle) {
          link.active_single_link = !link.active_single_link;
        } else {
          link.active_single_link = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
