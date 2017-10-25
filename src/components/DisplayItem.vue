<template>
    <div>
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
    export default {
        data(){
            return{
                items: []
            }
        },

        created: function(){
            this.fetchItems();
        },
        methods: {
            fetchItems() {
              HTTP.get('items').then((response) => {
                    console.log(response.data);
                  this.items = response.data;
              });
            },
            deleteItem(id) {
        
                let uri = `items/delete/${id}`;
                HTTP.delete(uri).then((response) => {
                    let name = response.data.name;
                    this.$alert.success({ duration: 5000, transition: 'none', message: `Item was deleted` });
                   

                    let arr = this.items;
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
                    //https://stackoverflow.com/questions/29997710/remove-object-from-array-of-objects
                    //es6 findIndex, then splice
                    const matchesEl = (obj) => obj._id === id;
                    arr.splice(arr.findIndex(matchesEl), 1);

                    
                }).catch(error => {
                    if(error.response) {
                        this.$alert.danger({ duration: 5000, transition: 'none', message: error.response.data.message });
                    }  
                });
            }
        }
    }
</script>