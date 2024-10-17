<template>
  <div class="flex flex-wrap">
    <v-style>
      :root{
      --primary-color:
      {{
        "#4D658F"
      }};
      --secondary-color:
      {{
        "#dc661f"
      }};
      --menu-font-color:
      {{
        "#fff"
      }};
      --menu-font-hover-color:
      {{
        "#fff"
      }};
      --body-color:
      {{
        "#fff"
      }};
      --button-font-color:
      {{
        "#FFFFFF"
      }};
      --button-color:
      {{
        "#4D658F"
      }};
      --button-hover-color:
      {{
        "#c3702b"
      }};
      }
    </v-style>
    <portal-target name="dropdown" slim />
    <main-menu :url="url()" :current-route="route().current()" :openSidebar="openSidebar" />
    <div :class="`px-4 maincontent_sec ${openSidebar ? 'contentwithsidebar' : 'mobcontentsidebar w-full'}`">
      <div class="righthdr bg-white px-6 py-4 flex flex-wrap justify-between items-center">
        <!-- <div class="leftside_hdr flex flex-wrap justify-between" @click.prevent="toggleSidebar">
          <img src="/images/BurgarIcon.svg" class="cursor-pointer">
        </div> -->
        <div class="rightside_hdr">
          <ul class="flex flex-wrap ml-auto justify-end">
            <li class="username text-xs font-medium	">
              <!-- <a href="#"><span>PS</span></a> -->
              <div class="flex items-center gap-x-2 cursor-pointer">
                <div class="relative group" @click="openPopup()" @focusout="closePopup($event)">
                  <inertia-link title="My account" as="button"
                    class="text-menu-font-color h-7 hidden w-7 rounded-full overflow-hidden menu-bg-color lightbggreen md:flex items-center justify-center"
                    :href="route('')">
                    <span class="text-menu-font-color text-xs font-normal"> {{ nameInitials }}</span>
                  </inertia-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <flash-messages />
      <slot />
    </div>
  </div>
</template>
<script>
import FlashMessages from "@/Shared/FlashMessages";
import MainMenu from "@/Shared/MainMenu";
//import MainFooter from "@/Shared/MainFooter";

export default {
  components: {
    FlashMessages,
    MainMenu,
    //MainFooter,
  },
  data() {
    return {
      openSidebar: true,
      fullName: this.$page.props.auth.user.first_name + ' ' + this.$page.props.auth.user.last_name,
      open_admin_popup: false,
    };
  },
  watch: {
  },
  computed: {
    nameInitials() {
      let nameArr = this.fullName.split(" ");
      return nameArr[0].slice(0, 1) + nameArr[1].slice(0, 1);
    },
  },
  mounted: function () {
  },

  methods: {
    url() {
      return location.pathname.substr(1);
    },
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
      console.log(this.openSidebar)
    },

    openPopup() {
      this.open_admin_popup = true;
    },
    closePopup(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.open_admin_popup = false;
      }
    },

  },
  beforeRouteLeave(to, from, next) {
    console.log(to);
  },

};
</script>
