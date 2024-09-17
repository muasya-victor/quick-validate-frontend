<template>
  <div>
    <h2>KRA Response Details</h2>
    <div v-if="kraResponse">
      <p><strong>Result Code:</strong> {{ kraResponse.resultCd }}</p>
      <p><strong>Result Message:</strong> {{ kraResponse.resultMsg }}</p>
      <p><strong>Result Date:</strong> {{ kraResponse.resultDt }}</p>

      <div v-if="kraResponse.data">
        <p><strong>Current Receipt Number:</strong> {{ kraResponse.data.curRcptNo }}</p>
        <p><strong>Total Receipt Number:</strong> {{ kraResponse.data.totRcptNo }}</p>
        <p><strong>Internal Data:</strong> {{ kraResponse.data.intrlData }}</p>
        <p><strong>Receipt Signature:</strong> {{ kraResponse.data.rcptSign }}</p>
        <p><strong>SDC DateTime:</strong> {{ kraResponse.data.sdcDateTime }}</p>
      </div>
    </div>

    <h2>Verified Invoice PDF</h2>
    <div v-if="pdfUrl">
      <!-- Embedding the PDF file -->
      <iframe
          :src="pdfUrl"
          width="100%"
          height="600px"
          style="border: none;">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kraResponse: null,
      pdfUrl: ''
    };
  },
  mounted() {
    // Simulate API response here
    const apiResponse = {
      download_url: "https://advatech.up.railway.app/media/verified_invoices/verified_invoice_number_186.pdf",
      kra_response: {
        resultCd: "000",
        resultMsg: "Successful",
        resultDt: "20240917171636",
        data: {
          curRcptNo: 3435,
          totRcptNo: 3435,
          intrlData: "NDIAGJR2HOECOHR77ZYBEIWW7I",
          rcptSign: "GJXCQMLJVINQ4UN6",
          sdcDateTime: "20240917171636"
        }
      }
    };

    // Assigning values to the component state
    this.kraResponse = apiResponse.kra_response;
    this.pdfUrl = apiResponse.download_url;
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
