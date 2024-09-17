<template>
  <el-dialog
      v-model="dialogVisible"
      title="Validated Invoice"
      width="90%"
      :before-close="handleClose"
  >
    <iframe
        :src="downloadUrl"
        width="100%"
        height="600px"
        style="border: none;">
    </iframe>
  </el-dialog>

</template>

<script>
export default {
  data() {
    return {
      kraResponse: null,
      pdfUrl: 'https://advatech.up.railway.app/media/verified_invoices/verified_invoice_id_187.pdf',
      dialogVisible:true
    };
  },
  props : {
    downloadUrl: {
      type: String,
      default:'https://advatech.up.railway.app/media/verified_invoices/verified_invoice_id_187.pdf',
      required:true
    }
  },
  methods :{
    handleClose(done) {
      this.$emit('close-dialog');
      done();
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
h2 {
  margin-top: 20px;
}

p {
  font-size: 16px;
  margin: 5px 0;
}
</style>
