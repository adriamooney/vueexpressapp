<template>
  <div>
    <h1>Create An Item</h1>
    <router-link :to="{ name: 'DisplayItem' }" class="btn btn-primary">Display Items</router-link>
    <div v-show="errors.showError" :class="errors.errorColor">{{errors.errorMsg}}</div>
    <div v-show="success.showSuccess" :class="success.successColor">{{success.successMsg}}</div>
    <form>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Item Name:</label>
            <input type="text" class="form-control" v-model="item.name" @focus="clearError">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Item Price:</label>
              <input type="text" class="form-control col-md-6" v-model="item.price" @focus="clearError">
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary" @click.prevent="addItem">Add Item</button>
        </div>
    </form>
  </div>
</template>
<script>
import {HTTP} from '../http/http';
  export default {
    data(){
        return{
          item:{},
          errors: {
            showError: false,
            errorMsg: '',
            errorColor: 'alert alert-danger'
          },
          success: {
            showSuccess: false,
            successMsg: '',
            successColor: 'alert alert-success'
          }
          
          
        }
    },
    methods: {
      addItem(){
        
        HTTP.post('add', this.item).then((response) => {
          console.log(response.data);
          this.success.successMsg = 'Your item was received';
          this.success.showSuccess = true;
        }).catch(error => {
            if(error.response) {
                this.errors.showError = true;
                this.errors.errorMsg = error.response.data.message;
            }  
        });
      },
      clearError() {
        this.errors.showError = false;
        this.errors.errorMsg = '';
      } 
  }
}
</script>
