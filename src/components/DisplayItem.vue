<template>
    <div>
        <alert-msg :success="success" :errors="errors"></alert-msg>
        <h1>Items</h1>

        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4">
            <router-link :to="{ name: 'CreateItem' }" class="btn btn-primary">Create Item</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items">
                    <td>{{ item._id }}</td>
                    <td>{{ item.name }} </td>
                    <td>{{ item.price }}</td>
                    <td><router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary btn-xs">Edit</router-link>
                        <button class="btn btn-danger btn-xs" @click="deleteItem(item._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {HTTP} from '../http/http';
    import AlertMsg from './AlertMsg.vue';
    export default {
        data(){
            return{
                items: [],
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

        created: function()
        {
            this.fetchItems();
        },
        components: {
            AlertMsg
        },
        methods: {
            fetchItems() {
              HTTP.get('items').then((response) => {
                    console.log(response.data);
                  this.items = response.data;
              });
            },
            deleteItem(id) {
              // let uri = 'http://localhost:4000/items/delete/'+id;
               this.items.splice(id, 1);
              // this.axios.get(uri);

                let uri = `items/delete/${id}`;
                HTTP.delete(uri).then((response) => {
                    this.success.successMsg = 'Your item was deleted';
                    this.success.showSuccess = true;

                    
                }).catch(error => {
                    if(error.response) {
                        this.errors.showError = true;
                        this.errors.errorMsg = error.response.data.message;
                    }  
                });
            }
        }
    }
</script>