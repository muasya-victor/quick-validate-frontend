import { createStore } from "vuex";
import api, {baseUrl} from "@/utility/api.js";
import {headers} from "@/utility/constants.js";
import {raiseServerError, showSuccess} from "@/utility/functions.js";
import JSZip from 'jszip';

export default createStore({
  state: {
    sideBarCollapse : false,
    lightMode : true,
    sideNavCollapse:false,
    ShowMobileMenu:false,
    refreshData:false,
  },
  actions:{
      /**
       * Get an array of objects :  `payload  = {url: ''}`
       * @param commit
       * @param state
       * @param {Object} payload `{url: ''}`
       * @return {Promise}
       */
      async fetchList({ commit, state }, payload) {
        return api
            .get(`${baseUrl}${payload.url}` ,{headers})
            .then((response) => {
              return response;
            })
            .catch((err) => {
              raiseServerError(err);
              throw err;
            });
      },

      /**
       * Get an object :  `payload  = {id :number , url: string}`
       * @param commit
       * @param state
       * @param payload
       * @return {Promise}
       */
      async fetchSingleItem({ commit, state }, payload) {
        return await api
            .get(`${baseUrl}${payload.url}/${payload.id}/`)
            .then((response) => {
              return response;
            })
            .catch((err) => {
              raiseServerError(err);
              throw err;
            });
      },
      /**
       * Make post request to backend. `payload = {url: string, data:object = payload.url , payload.data}`
       * @param state
       * @param commit
       * @param payload
       * @return {Promise,Object}
       */
      async postData({ state, commit }, payload) {
        try {
          const response = await api.post(
              `${baseUrl}${payload.url}/`,
              {
                ...payload.data,
                createdBy: JSON.parse(localStorage.getItem("authData"))?.id,
                lastModifiedBy: JSON.parse(localStorage.getItem("authData"))?.id,
              },
              { headers }
          );
          showSuccess("Successful");
          return response;
        } catch (err) {
          raiseServerError(err);
          throw err;
        }
      },
      /**
       * Amend an object in the database.Only Fields to amend are in the payload.data. Payload = {url:string, id:number, data:object}
       * @param state
       * @param commit
       * @param payload
       * @return {Promise}
       */
      async patchData({ state, commit }, payload) {
        try {
          const response = await api.patch(
              `${baseUrl}${payload.url}/${payload.id}/`,
              payload.data,
              { headers }
          );
          showSuccess("Successful");
          return response;
        } catch (err) {
          raiseServerError(err);
          throw err;
        }
      },
      /**
       * Amend an object in the database.All fields are required. Payload = {url:string, id:number,data:object}
       * function
       * @param state
       * @param commit
       * @param payload
       * @return {Promise}
       */
      async putData({ state, commit }, payload) {
        try {
          const response = await api.put(
              `${baseUrl}${payload.url}/${payload.id}/`,
              {
                ...payload.data,
                lastModifiedBy: JSON.parse(localStorage.getItem("authData"))?.data?.id,
              },
              { headers }
          );
          showSuccess("Successful");
          return response;
        } catch (err) {
          raiseServerError(err);
        }
      },
      async deleteData({ state, commit }, payload) {
        try {
          const response = await api.delete(
              `${baseUrl}${payload.url}/${payload.id}`,
              { headers }
          );
          showSuccess("Successful");
          return response;
        } catch (err) {
          raiseServerError(err);
        }
      },
      async downloadFirmData({ state, commit }, payload) {
          try {
              const response = await api.get(`${baseUrl}${payload.url}/${payload.id}`, {
                  responseType: 'blob',
              });

              // Create a new Blob object using the response data
              const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

              // Create a link element
              const link = document.createElement('a');

              // Set the download attribute with a filename
              link.href = URL.createObjectURL(blob);
              link.download = 'firm_data.xlsx';

              // Append the link to the body
              document.body.appendChild(link);

              // Programmatically click the link to trigger the download
              link.click();

              // Remove the link from the document
              document.body.removeChild(link);
          } catch (error) {
              console.error('Error downloading the file:', error);
          }
      },
      // import axios from 'axios';


      async downloadExcelByUrl({ state, commit }, payloads) {
          try {
              const zip = new JSZip();

              for (const payload of payloads) {
                  const response = await api.get(`${baseUrl}${payload.url}/firm/export/${payload.id}/excel`, {
                      responseType: 'blob',
                  });

                  const fileName = `${payload.url}_${payload.id}.xlsx`;
                  zip.file(fileName, response.data);
              }

              const zipBlob = await zip.generateAsync({ type: 'blob' });

              // Create a link element for the zipped file
              const link = document.createElement('a');
              link.href = URL.createObjectURL(zipBlob);
              link.download = `exported_files.zip`;

              // Append the link to the body
              document.body.appendChild(link);

              // Programmatically click the link to trigger the download
              link.click();

              // Remove the link from the document
              document.body.removeChild(link);
          } catch (error) {
              console.error('Error downloading the files:', error);
          }
      },


},
  mutations:{
    setSideBarCollapse(state) {
      state.sideBarCollapse = !state.sideBarCollapse
    },
    setLightMode(state) {
      state.lightMode = !state.lightMode
      console.log(state.lightMode)
    }
  },
  getters:{
    getSideBarCollapse(state){
      return state.sideBarCollapse
    },
    getLightMode(state,payload){
      return state.lightMode
    }
  },
  modules: {

  },
});