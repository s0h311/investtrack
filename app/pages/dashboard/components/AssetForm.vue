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
      placeholder="IE000Y77LGG9"
      required
    />

    <select
      name="type"
      required
    >
      <option value="etf">ETF</option>

      <option value="share">Share</option>
    </select>

    <button type="submit">Add</button>
  </Form>
</template>

<script setup lang="ts">
  import type { AssetInsert } from '~~/server/data/types'

  const { refresh } = await useAssets()

  async function addAsset(asset: AssetInsert): Promise<void> {
    // TODO handle error case here
    await $fetch('/api/asset', {
      method: 'POST',
      body: asset,
    })

    await refresh()
  }
</script>
