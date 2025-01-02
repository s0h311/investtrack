<template>
  <div class="flex flex-wrap gap-10">
    <section>
      <h2 class="mb-2">Assets</h2>

      <AssetList
        v-if="!error"
        :assets="assets ?? []"
      />
    </section>

    <section>
      <h2 class="mb-2">Add Asset</h2>

      <AssetForm />
    </section>
  </div>
</template>

<script setup lang="ts">
  import AssetList from '~/pages/dashboard/components/AssetList.vue'
  import AssetForm from '~/pages/dashboard/components/AssetForm.vue'

  const { data: assets, error } = useAssets()
</script>
