import ContentstackLivePreview from "@contentstack/live-preview-utils";
import Contentstack from "contentstack";
Contentstack.Utils.addEditableTags();

const Stack = Contentstack.Stack({
    "api_key": "blt4737ddf5d5e207de",
    "delivery_token": "cs06527de810a34236fb83b982",
    "environment": "preview",
    live_preview: {
      management_token: 'csede81b1429167bd82f01b653',
      enable: true,
      host: 'api.contentstack.io',
    }
  });

  
  ContentstackLivePreview.init({
    stackSdk: Stack,
    clientUrlParams: {
        protocol: "https",
        host: "app.contentstack.com",
        port: 443,
    },
  });
  
  export default {
    getElement(id, type) {
      return new Promise((resolve, reject) => {
        const Query = Stack.ContentType(type)
          .Entry(id)
          .toJSON()
          .fetch()
          .then(
            function success(entry) {
              //console.log('entry', entry);
              Contentstack.Utils.addEditableTags(entry, type, true);
              resolve(entry);
            },
            function error(err) {
              console.log('error id', id);
              reject(err);
            }
          );
      });
    },
    
    getElementWithRefs(id, type, references) {
      return new Promise((resolve, reject) => {
        const Query = Stack.ContentType(type)
          .Entry(id)
          .includeReference(...references)
          .toJSON()
          .fetch()
          .then(
            function success(entry) {
              //console.log('entry', entry);
              Contentstack.Utils.addEditableTags(entry, type, true);
              resolve(entry);
            },
            function error(err) {
              console.log('error id', id);
              reject(err);
            }
          );
      });
    },
    // get nav call
    getStack(){
      return Stack;
    }
  };
  
  export const onEntryChange = ContentstackLivePreview.onEntryChange;