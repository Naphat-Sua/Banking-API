<template>
  <tabs>
    <tab-pane title="Get Credential Key">
      <GetCredentialKey/>
    </tab-pane>
    <tab-pane title="Protocol Format">

    </tab-pane>
    <tab-pane title="Signature Guide">

    </tab-pane>
    <tab-pane title="API Endpoint">

    </tab-pane>
    <tab-pane title="Bank Code">

    </tab-pane>
    <tab-pane title="Webhook Callback">

    </tab-pane>
  </tabs>
</template>

<script>
import GetCredentialKey from './pageapi/Get-Credential-Key'

export default {
  name: "APIDocsIndex",
  components: {
    GetCredentialKey
  }
}
</script>

<style scoped>

</style>
