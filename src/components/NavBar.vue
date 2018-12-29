<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Demeter</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="link in links">
          <router-link :to="{name: link.name }" class="nav-link">{{ link.title }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        title: "Home",
        name: "Dashboard"
      },
      {
        title: "Books",
        name: "BookShelf"
      },
      {
        title: "Posts",
        name: "PostsCase"
      }
    ]
  })
}
</script>
