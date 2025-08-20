<template>
  <section class="py-16">
    <UIAppear>
      <UContainer>
        <UBlogPosts :posts="posts">
          <UBlogPost
            v-for="(post, index) in posts"
            :key="index"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :date="post.date"
            :to="post.to"
            variant="subtle"
            target="_blank"
          />
        </UBlogPosts>
      </UContainer>
    </UIAppear>
  </section>
</template>

<script setup lang="ts">
const posts = ref([
  {
    title: 'Šta je POS sistem i kako radi? Vodič za vlasnike lokala',
    description: 'Osnove POS-a: fiskalizacija, kase, printeri, magacin i izvještaji — sve što treba da znaš prije prve naplate.',
    image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1600&auto=format&fit=crop',
    date: '2025-07-08',
    to: '#'
  },
  {
    title: '5 znakova da je vrijeme za zamjenu POS-a',
    description: 'Spor rad, greške na računima, ručni inventar, ograničene integracije i loši izvještaji — prepoznaj probleme na vrijeme.',
    image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1600&auto=format&fit=crop',
    date: '2025-06-12',
    to: '#'
  },
  {
    title: 'Kako povezati POS sa magacinom i ubrzati inventuru',
    description: 'Normativi, prijem/otprema robe i automatsko knjiženje — praktični koraci za tačne zalihe i manje rasipanje.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop',
    date: '2025-05-20',
    to: '#'
  }
])
</script>
