<template>
  <h3>
    {{ $t("Users") }}
    <small>
      <!--      {{ $t('(Total: :count)',[
            'count' => count($users)
            ]) }}-->
    </small>
  </h3>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>
          {{ $t("Name") }}
        </th>
        <th>
          {{ $t("Roles") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>
          {{ user.name }}
        </td>
        <td>
          {{ userRoles(user.roles) }}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="row">
    <div class="col-12 pagination-wrapper text-center">
      <pagination-component :url="adminUsersUrl" @onData="users = $event" />
    </div>
  </div>
</template>
<script>
import PaginationComponent from "@/components/layout/PaginationComponent";
import { URLS } from "@/consts";
import { updateAppMeta } from "@/utils/app";

export default {
  name: "UsersView",
  components: { PaginationComponent },
  created() {
    updateAppMeta({
      title: this.$t("Users Admin"),
    });
  },
  setup() {
    return {
      adminUsersUrl: URLS.ADMIN_USERS,
    };
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    userRoles(roles) {
      return roles.map((v) => v.name).join(", ");
    },
  },
};
</script>
