<template>
    <div>
        <h1>Edit Item</h1>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2"><router-link :to="{ name: 'DisplayItem' }" class="btn btn-success">Return to Items</router-link></div>
        </div>

        <form v-on:submit.prevent="updateItem">
            <div class="form-group">
                <label>Item Name</label>
                <input type="text" class="form-control" v-model="item.name">
            </div>

            <div class="form-group">
                <label name="product_price">Item Price</label>
                <input type="text" class="form-control" v-model="item.price">
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {HTTP} from '../http/http';
    export default{
        data(){
            return{
                item:{}
            }
        },
        created: function(){
            this.getItem();
        },

        methods: {
            getItem()
            {
              let uri = 'items/edit/' + this.$route.params.id;
                HTTP.get(uri).then((response) => {
                    
                    this.item = response.data;
                }).catch(error => {
                    if(error.response) {
             
                        this.$alert.danger({ duration: 5000, transition: 'none', message: error.response.data.message });
                    }  
                });
            },

            updateItem()
            {
              let uri = 'items/update/' + this.$route.params.id;
                HTTP.put(uri, this.item).then((response) => {

                    this.$alert.success({ duration: 5000, transition: 'none', message: 'Item was updated' });
                    setTimeout(() => {
                        this.$router.push({name: 'DisplayItem'});
                    }, 1000);
                    
                }).catch(error => {
                    if(error.response) {
                        this.$alert.danger({ duration: 5000, transition: 'none', message: error.response.data.message });
                    }  
                });
            }
        }
    }
</script>