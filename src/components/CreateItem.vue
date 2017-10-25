<template>
  <div>
    <h1>Create An Item</h1>
    <router-link :to="{ name: 'DisplayItem' }" class="btn btn-primary">Display Items</router-link>
    <router-link :to="{ name: 'Test' }" class="btn btn-primary">Test</router-link>
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
          item:{}   
        }
    },
    methods: {
      addItem(){
        
        HTTP.post('add', this.item).then((response) => {
          console.log(response.data);
          this.$alert.success({ duration: 5000, transition: 'none', message: 'Your item was entered' });
        }).catch(error => {
            if(error.response) {
                this.$alert.danger({ duration: 5000, transition: 'none', message: error.response.data.message });

            }  
        });
      },
      clearError() {
        this.$alert.hide();
      } 
  }
}
</script>
