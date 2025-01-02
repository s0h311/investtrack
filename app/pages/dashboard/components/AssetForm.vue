<template>
  <Form @form-submit="addAsset">
    <input
      name="name"
      type="text"
      placeholder="Amundi MSCI World SRI Climate Net Zero Ambition PAB (Acc)"
      required
    />

    <input
      name="isin"
      type="text"
      placeholder="ISIN"
      required
    />

    <select
      name="type"
      required
    >
      <option value="etf">ETF</option>

      <option value="share">Share</option>
    </select>

    <Cta
      is-primary
      :isLoading
      type="submit"
    >
      Add
    </Cta>
  </Form>
</template>

<script setup lang="ts">
  import type { AssetInsert } from '~~/server/data/types'

  const { refresh } = await useAssets()

  const isLoading = ref<boolean>(false)

  async function addAsset(asset: AssetInsert): Promise<void> {
    isLoading.value = true

    // TODO handle error case here
    await $fetch('/api/asset', {
      method: 'POST',
      body: asset,
    })

    isLoading.value = false
    await refresh()
  }
</script>
